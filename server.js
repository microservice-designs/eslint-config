import js from "@eslint/js";
import globals from "globals";
import tslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import vitest from "eslint-plugin-vitest";

export default defineConfig([
    // Base JavaScript
    {
        files: ["**/*.{js,mjs,cjs}"],
        ...js.configs.recommended,
        languageOptions: {
            globals: globals.node,
        },
    },

    // TypeScript
    {
        files: ["**/*.{ts,tsx,mts,cts}"],
        ...tslint.configs.recommendedTypeChecked[0], // base TS config
        languageOptions: {
            parser: tslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: process.cwd(),
            },
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
        plugins: {
            // 🔑 must register the plugin here!
            "@typescript-eslint": tslint.plugin,
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },

    // JSON
    {
        files: ["**/*.json"],
        ...json.configs.recommended,
    },

    // Test files
    {
        files: ["tests/**/*.{js,ts,tsx}", "**/*.test.{js,ts,tsx}", "**/*.spec.{js,ts,tsx}"],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest, // add Jest if you’re using it
            },
        },
        plugins:{
            "@typescript-eslint": tslint.plugin,
            prettier: prettierPlugin,
            vitest,
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off", // usually allowed in tests
            "@typescript-eslint/explicit-function-return-type": "off",
            "vitest/expect-expect": "off",
            "vitest/no-conditional-expect": "off",
            "vitest/no-conditional-in-test": "off",
            "vitest/no-disabled-tests": "off",
            "vitest/no-focused-tests": "off",
            "vitest/no-identical-title": "off",
            "vitest/no-interpolation-in-snapshots": "off",
            "vitest/no-mocks-import": "off",
            "vitest/no-standalone-expect": "off",
            "vitest/no-test-prefixes": "off",
        },
    },

    // Prettier (global last to override)
    prettier,
]);
