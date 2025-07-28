import tseslint from "typescript-eslint";
import { createReactESLintConfig } from "./create-react-eslint-config";
import { flatConfig as eslintPluginNext } from "@next/eslint-plugin-next";
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
    /** @type {any} */ (eslintPluginNext.recommended),
    /** @type {any} */ (eslintPluginNext.coreWebVitals)
    // Used type assertion because the Severity level specified in the plugin
    // is not compatible with the one expected by typescript-eslint
    // typescript-eslint expects literal "error" | "warn" | "off"
    // @next/eslint-plugin-next uses the strings "error", "warn"
  );

  return nextjsConfig;
}

export { createNextjsESLintConfig };
