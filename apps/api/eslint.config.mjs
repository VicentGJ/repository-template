import nestConfig from '@repo/config/eslint/nest';

export default [
  {
    ignores: ['eslint.config.mjs'],
  },
  ...nestConfig,
];
