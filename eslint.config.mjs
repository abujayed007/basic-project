import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.ts"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules", "dist"],
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-require-imports": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
    },
    globals: {
      myGlobalVar: "readonly",
    },
  },
];
