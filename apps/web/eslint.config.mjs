import { createNextjsESLintConfig } from "@repo/eslint-config/create-nextjs-eslint-config";

const eslintConfig = createNextjsESLintConfig(import.meta.dirname);

export default eslintConfig;
