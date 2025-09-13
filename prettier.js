/** @type {import("prettier").Config} */
export const config = {
    semi: true,                  // Add semicolons at the end of statements
    singleQuote: true,           // Use single quotes instead of double
    trailingComma: 'all',        // Print trailing commas wherever possible
    tabWidth: 2,                 // Indent with 2 spaces
    useTabs: false,              // Indent with spaces, not tabs
    bracketSpacing: true,        // Print spaces between brackets { like this }
    arrowParens: 'always',       // Always include parens in arrow functions (x) => x
    printWidth: 100,             // Wrap lines at 100 characters
    endOfLine: 'lf',             // Line endings: "lf", good for cross-platform
    plugins: [],                 // Can add Prettier plugins (e.g. for Tailwind, MDX, etc.)
};
