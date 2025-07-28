import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintConfigTurbo from "eslint-config-turbo/flat";
import { globalIgnores } from "eslint/config";

/**
 * @param {string} tsconfigRootDir
 */
function createBaseESLintConfig(tsconfigRootDir) {
  const baseConfig = tseslint.config(
    globalIgnores(["**/*.d.ts", "**/dist/"]),
    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir
        }
      }
    },
    eslintConfigTurbo, // no need to spread because tseslint.config will flatten it
    eslintConfigPrettier
  );

  return baseConfig;
}

export { createBaseESLintConfig };
