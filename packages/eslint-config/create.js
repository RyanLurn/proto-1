import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintConfigTurbo from "eslint-config-turbo/flat";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginNext from "@next/eslint-plugin-next";
import { globalIgnores } from "eslint/config";
import globals from "globals";

/**
 * Creates a flexible and composable ESLint configuration array.
 *
 * @param {{
 *   tsconfigRootDir?: string;
 *   framework?: "base" | "react" | "nextjs";
 *   isStrict?: boolean;
 *   isTypeAware?: boolean;
 * }} options
 * @returns {import("typescript-eslint").ConfigArray}
 */
function createEslintConfig(options) {
  const {
    tsconfigRootDir = import.meta.dirname, // Default to the directory of the config file
    framework = "base", // Default to no framework
    isStrict = true, // Default to the strictest setting
    isTypeAware = true // Default to type-aware linting
  } = options;

  // --- Start with the core configuration array ---

  /** @type {import("typescript-eslint").ConfigArray} */
  const config = [
    // Global ignores should come first
    globalIgnores(["**/*.d.ts", "**/dist/"]),

    // Base ESLint recommended rules
    js.configs.recommended
  ];

  // --- Add TypeScript-specific configurations ---
  if (isTypeAware) {
    // This is the most powerful setup, requiring a tsconfig.json.
    config.push(
      ...(isStrict
        ? tseslint.configs.strictTypeChecked
        : tseslint.configs.recommendedTypeChecked)
    );
    config.push({
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir
        }
      }
    });
  } else {
    // A lighter setup for files not included in a tsconfig.json.
    config.push(
      ...(isStrict ? tseslint.configs.strict : tseslint.configs.recommended)
    );
  }

  // --- Add framework-specific configurations ---
  if (framework === "react" || framework === "nextjs") {
    config.push(eslintPluginReactHooks.configs["recommended-latest"]);
    config.push({
      languageOptions: {
        globals: { ...globals.browser }
      }
    });
  }

  if (framework === "nextjs") {
    config.push(
      {
        languageOptions: {
          globals: { ...globals.serviceworker }
        }
      },
      // Manually construct the Next.js plugin config due to CJS/ESM interop issues
      {
        plugins: {
          "@next/next": eslintPluginNext
        },
        /** @type {any} */
        rules: {
          ...eslintPluginNext.configs.recommended.rules,
          ...eslintPluginNext.configs["core-web-vitals"].rules
        }
        // Used type assertion because the Severity level specified in the plugin for nextjs
        // is not compatible with the one expected by typescript-eslint
        // typescript-eslint expects literal "error" | "warn" | "off"
        // @next/eslint-plugin-next uses the strings "error", "warn"
      }
    );
  }

  // --- Finalization: Add Turbo and Prettier ---
  // These should come last to override any conflicting rules.
  config.push(...eslintConfigTurbo, eslintConfigPrettier);

  // --- Return the final, composed configuration ---
  // We don't need to spread the config array
  // because tseslint.config() will flatten the array and handle everything.
  return tseslint.config(config);
}

export { createEslintConfig };
