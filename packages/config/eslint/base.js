import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

const baseConfig = tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/*.d.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);

export default baseConfig;
