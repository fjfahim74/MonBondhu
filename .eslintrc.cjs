module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'prettier'],
  parserOptions: { ecmaVersion: 2022 },
  rules: { 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }] },
};
