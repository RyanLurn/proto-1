import { createBaseESLintConfig } from "./create-base-eslint-config";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * @param {string} tsconfigRootDir
 */
function createReactESLintConfig(tsconfigRootDir) {
  const baseConfig = createBaseESLintConfig(tsconfigRootDir);

  const reactConfig = tseslint.config(
    baseConfig,
    reactHooks.configs["recommended-latest"],
    {
      languageOptions: {
        globals: {
          ...globals.browser
        }
      }
    }
  );

  return reactConfig;
}

export { createReactESLintConfig };
