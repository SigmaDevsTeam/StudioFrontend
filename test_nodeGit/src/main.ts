import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import express, { Request, Response } from 'express';
import OpenAI from 'openai';

dotenv.config();

const GITHUB_API = 'https://api.github.com';
const OWNER = process.env.GITHUB_USERNAME as string;
const TOKEN = process.env.GITHUB_TOKEN as string;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

const headers = {
  Authorization: `token ${TOKEN}`,
  Accept: 'application/vnd.github.v3+json'
};

// Type definitions
interface GitHubRef {
  object: { sha: string };
}

interface GitHubBranch {
  commit: {
    sha: string;
    commit: { tree: { sha: string } };
  };
}

interface FileToCommit {
  path: string;
}

/**
 * Create a GitHub repository
 */
async function createRepo(
  repoName: string,
  isPrivate: boolean = false
): Promise<void> {
  try {
    const response = await axios.post(
      `${GITHUB_API}/user/repos`,
      { name: repoName, private: isPrivate, auto_init: true }, // Set to true for private repos
      { headers }
    );
    console.log(`Repository created: ${response.data.html_url}`);
  } catch (error: any) {
    console.error(
      'Error creating repository:',
      error.response?.data || error.message
    );
  }
}

/**
 * Delete a GitHub repository
 */
async function deleteRepo(repoName: string): Promise<void> {
  try {
    await axios.delete(`${GITHUB_API}/repos/${OWNER}/${repoName}`, { headers });
    console.log(`Repository deleted: ${repoName}`);
  } catch (error: any) {
    console.error(
      'Error deleting repository:',
      error.response?.data || error.message
    );
  }
}

/**
 * Create a branch from any other branch
 */
async function createBranch(
  repoName: string,
  fromBranchName: string,
  branchName: string
): Promise<void> {
  try {
    const { data: mainRef } = await axios.get<GitHubRef>(
      `${GITHUB_API}/repos/${OWNER}/${repoName}/git/ref/heads/${fromBranchName}`,
      { headers }
    );

    await axios.post(
      `${GITHUB_API}/repos/${OWNER}/${repoName}/git/refs`,
      { ref: `refs/heads/${branchName}`, sha: mainRef.object.sha },
      { headers }
    );

    console.log(`Branch ${branchName} created.`);
  } catch (error: any) {
    console.error(
      'Error creating branch:',
      error.response?.data || error.message
    );
  }
}

/**
 * Commit files to the repository
 */
async function commitFiles(
  repoName: string,
  branch: string,
  files: FileToCommit[]
): Promise<void> {
  try {
    // Get latest commit info
    const { data: latestCommit } = await axios.get<GitHubBranch>(
      `${GITHUB_API}/repos/${OWNER}/${repoName}/branches/${branch}`,
      { headers }
    );

    const baseTreeSha = latestCommit.commit.commit.tree.sha;
    const tree = [];

    for (const file of files) {
      const filePath = path
        .join(`${import.meta.dirname}/filesToCommit`, file.path)
        .replace('dist', 'src'); // Adjust the filename as needed

      const content = fs.readFileSync(filePath, 'utf8');
      const { data: blob } = await axios.post(
        `${GITHUB_API}/repos/${OWNER}/${repoName}/git/blobs`,
        { content, encoding: 'utf-8' },
        { headers }
      );

      tree.push({
        path: file.path,
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      });
    }

    // Create a new tree
    const { data: newTree } = await axios.post(
      `${GITHUB_API}/repos/${OWNER}/${repoName}/git/trees`,
      { base_tree: baseTreeSha, tree },
      { headers }
    );

    // Create a new commit
    const { data: newCommit } = await axios.post(
      `${GITHUB_API}/repos/${OWNER}/${repoName}/git/commits`,
      {
        message: 'Added files via API',
        tree: newTree.sha,
        parents: [latestCommit.commit.sha]
      },
      { headers }
    );

    // Update the branch reference
    await axios.patch(
      `${GITHUB_API}/repos/${OWNER}/${repoName}/git/refs/heads/${branch}`,
      { sha: newCommit.sha },
      { headers }
    );

    console.log('Files committed successfully.');
  } catch (error: any) {
    console.error(
      'Error committing files:',
      error.response?.data || error.message
    );
  }
}

// Function to interpret the prompt using AI
async function processPrompt(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    store: true,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5
  });

  return response.choices[0]?.message?.content?.trim() || '';
}

// Main API endpoint
app.post('/', async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt)
    return void res.status(400).json({ error: 'Prompt is required' });

  try {
    const aiResponse = await processPrompt(
      `Analyze this command: ${prompt}. Respond with only the function name and parameters.
      Possible functions are createRepo(repoName: string, isPrivate: boolean), deleteRepo(repoName: string)
      Your response should look like: {function name}: {param1value}, {param2value} etc`
    );

    console.log('AI Response:', aiResponse);

    // Parse AI response
    const [cmd, args] = aiResponse.split(':');
    const argValues = args.trim().split(', ');

    if (cmd === 'createRepo') {
      const result = await createRepo(argValues[0], Boolean(argValues[1]));
      return void res.json({ message: result });
    } else if (cmd === 'deleteRepo') {
      const result = await deleteRepo(argValues[0]);
      return void res.json({ message: result });
    }

    res.status(400).json({ error: 'Unknown command' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
