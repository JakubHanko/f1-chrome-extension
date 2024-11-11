import js from "@eslint/js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic/ts": stylisticTs,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "eqeqeq": ["error", "always"],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "quotes": ["error", "double"],
      "no-var": "error",
      "prefer-const": "error",
      "eol-last": ["error", "always"],
      "@stylistic/ts/semi": ["error", "always"],
      "semi": "off",
      "no-extra-semi": ["error"],
      "no-trailing-spaces": ["error", {
        "skipBlankLines": false,
        "ignoreComments": false
      }],
      "brace-style": "off",
      "curly": ["error", "all"],
      "@typescript-eslint/no-unused-vars": "off" // checked by TSC
    },
  },
);
