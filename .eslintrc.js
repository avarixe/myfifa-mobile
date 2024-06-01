// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: [
    'simple-import-sort',
    'prettier',
    '@typescript-eslint',
    'unused-imports',
    'no-type-assertion'
  ],
  rules: {
    'import/order': 'off',
    'sort-imports': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    eqeqeq: 'error',
    'no-type-assertion/no-type-assertion': 'error'
  }
}
