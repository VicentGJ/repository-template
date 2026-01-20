import { globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import globals from 'globals';
import baseConfig from './base.js';

export default [
  ...baseConfig,
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
