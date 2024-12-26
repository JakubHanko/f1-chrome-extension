import js from "@eslint/js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "public"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"]
    ],
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic/ts": stylisticTs
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      eqeqeq: ["error", "always"],
      indent: ["error", 2, { SwitchCase: 1 }],
      quotes: ["error", "double"],
      "no-var": "error",
      "prefer-const": "error",
      "eol-last": ["error", "always"],
      "@stylistic/ts/semi": ["error", "always"],
      semi: "off",
      "no-extra-semi": ["error"],
      "no-trailing-spaces": [
        "error",
        {
          skipBlankLines: false,
          ignoreComments: false
        }
      ],
      "brace-style": "off",
      curly: ["error", "all"],
      "@typescript-eslint/no-unused-vars": "off", // checked by TSC
      "@typescript-eslint/explicit-function-return-type": "error",
      "space-before-blocks": ["error", "always"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "directive", next: "*" },
        { blankLine: "any", prev: "directive", next: "directive" },
        { blankLine: "any", prev: "directive", next: "directive" },
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "never", prev: "import", next: "import" }
      ],
      "object-curly-spacing": ["error", "always"],
      "@stylistic/ts/type-annotation-spacing": [
        "error",
        {
          before: false,
          after: false,
          overrides: {
            colon: { before: false, after: true },
            arrow: { before: true, after: true }
          }
        }
      ],
      "arrow-parens": ["error", "always"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "comma-spacing": ["error", { before: false, after: true }]
    },
    settings: {
      "import/resolver": {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true
      },
      react: {
        version: "detect"
      }
    }
  }
);
