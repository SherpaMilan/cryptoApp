import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      "no-unused-vars": "error",
      "no-console": "error",
      "prefer-const": "error",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-extra-semi": "error",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
