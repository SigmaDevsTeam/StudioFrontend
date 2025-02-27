import { Helmet } from "react-helmet-async";
type HelmetXProps = {
   title?: string;
   description?: string;
   robots?: boolean;
   cannonicalPath?: string;
};

const fallBack = {
   title: "Sabaody Studio",
   description: "Sabaody is a new way of creating web",
   robots: "index, follow",
   noRobots: "noindex, nofollow",
   cannonicalPath: ""
};

function HelmetX({ title, description, robots, cannonicalPath }: HelmetXProps) {
   return (
      <Helmet>
         <title>{title || fallBack.title}</title>
         <meta
            name="description"
            content={description || fallBack.description}
         />
         <meta
            name="robots"
            content={robots ? fallBack.robots : fallBack.noRobots}
         />
         <link
            rel="canonical"
            href={`${import.meta.env.SABAODY_STUDIO_URL}${cannonicalPath}`}
         />
      </Helmet>
   );
}

export { HelmetX };
