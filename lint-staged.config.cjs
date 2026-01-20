module.exports = {
  'apps/**/*.{js,jsx,ts,tsx}': ['eslint --fix --max-warnings=5', 'prettier --write'],
  'packages/**/*.{js,jsx,ts,tsx}': ['eslint --fix --max-warnings=5', 'prettier --write'],
};
