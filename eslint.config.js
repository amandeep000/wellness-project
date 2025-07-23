import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks"; // For React Hooks specific rules
import pluginTailwindcss from "eslint-plugin-tailwindcss"; // For Tailwind CSS v4
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base ESLint recommended rules
  js.configs.recommended,

  // Ignore build and cache directories
  {
    ignores: ["dist/", ".turbo/", ".cache/"],
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // Browser globals for frontend projects
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Also include Node.js globals for config files if needed
      },
      parser: tseslint.parser, // Specify TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
        ecmaVersion: "latest", // Use the latest ECMAScript version
        sourceType: "module", // Enable ES modules
        project: "./tsconfig.json", // Point to your tsconfig.json for type-aware linting
      },
    },
    plugins: {
      // Add plugins to the config
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      tailwindcss: pluginTailwindcss, // Add Tailwind CSS plugin
    },
    extends: [
      // TypeScript-specific recommended rules
      tseslint.configs.recommended,
      tseslint.configs.stylisticTypeChecked, // More stylistic TypeScript rules with type checking

      // React-specific recommended rules
      pluginReact.configs.recommended,
      pluginReactHooks.configs.recommended, // React Hooks rules

      // Tailwind CSS recommended rules
      pluginTailwindcss.configs.recommended,

      // Optional: If you use Prettier, add it as the last extend to disable conflicting rules
      // "prettier",
    ],
    rules: {
      // Custom rules or overrides
      "react/react-in-jsx-scope": "off", // Not needed with new React JSX transform
      "react/jsx-uses-react": "off", // Not needed with new React JSX transform
      "@typescript-eslint/no-explicit-any": "warn", // Warn about 'any' type usage
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // Warn about unused variables
      // Tailwind CSS v4 specific rules (example)
      "tailwindcss/no-custom-classname": "off", // If you have custom classnames not recognized by Tailwind
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
      // You might need to configure the Tailwind CSS plugin to find your config
      tailwindcss: {
        callees: ["tw"], // Example: if you use a 'tw' utility for applying classes
        config: "./tailwind.config.ts", // Point to your Tailwind CSS config file
      },
    },
  },
]);
