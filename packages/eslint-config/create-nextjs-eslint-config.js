import tseslint from "typescript-eslint";
import { createReactESLintConfig } from "@repo/eslint-config/create-react-eslint-config";
import eslintPluginNext from "@next/eslint-plugin-next";
import globals from "globals";

/**
 * @param {string} tsconfigRootDir
 */
function createNextjsESLintConfig(tsconfigRootDir) {
  const reactConfig = createReactESLintConfig(tsconfigRootDir);

  const nextjsConfig = tseslint.config(
    reactConfig,
    {
      languageOptions: {
        globals: {
          ...globals.serviceworker
        }
      }
    },
    {
      plugins: {
        "@next/next": eslintPluginNext
      },
      /** @type {any} */ rules: {
        ...eslintPluginNext.configs.recommended.rules,
        ...eslintPluginNext.configs["core-web-vitals"].rules
      }
    }
    // Used type assertion because the Severity level specified in the plugin
    // is not compatible with the one expected by typescript-eslint
    // typescript-eslint expects literal "error" | "warn" | "off"
    // @next/eslint-plugin-next uses the strings "error", "warn"
  );

  return nextjsConfig;
}

export { createNextjsESLintConfig };
