# INT20H SigmaDevs Front-End Conventions

## TypeScript

-  Only named exports: `export { function }`.
-  React functional components (FC) should use function declarations: `function Component() {}`.
-  Hooks, functions, and objects should be defined as arrow functions: `const useHook = () => {}`.
-  Entity types should be defined in the store API section: `type User = { id: string; displayName?: string }`.

## Styles

-  Use colors from the Radix 12-step color convention: `color: var(--accent-10)`.
-  Use Tailwind for margin, padding, layouts, and responsiveness.
-  Use `clsx` for dynamic classNames `cn({ specialCard:true, hidden:!isAuthenticated() })`.
-  Use predefined HTML typography tags for typography styles: `h1, h2, h3, b, em, u, small`.
