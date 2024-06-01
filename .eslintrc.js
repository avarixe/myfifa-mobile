// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ['prettier', 'unused-imports', 'no-type-assertion'],
  rules: {
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
    'no-type-assertion/no-type-assertion': 'error'
  }
}
