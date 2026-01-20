import nextConfig from '@repo/config/eslint/next';

export default [
  {
    ignores: ['eslint.config.mjs', 'postcss.config.js', 'tailwind.config.js'],
  },
  ...nextConfig,
];
