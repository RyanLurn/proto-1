import { createEslintConfig } from "@repo/eslint-config/create";

const eslintConfig = createEslintConfig({
  tsconfigRootDir: import.meta.dirname,
  framework: "nextjs"
});

export default eslintConfig;
