module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/product-slices/upstream'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  overrides: [{
    files: ['src/product-slices/compat/**/*.{js,jsx}', 'src/product-slices/screens/**/*.{js,jsx}', 'tests/browser/**/*.{js,jsx}'],
    // Generated adapters and browser fixtures are outside Vite's refresh boundary.
    rules: { 'react-refresh/only-export-components': 'off' },
  }],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
