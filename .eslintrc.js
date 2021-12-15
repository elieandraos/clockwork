/*
- How to configure eslint: https://eslint.org/docs/user-guide/configuring/
- In case of a prettier & eslint rules conflict, use: https://github.com/prettier/eslint-plugin-prettier
 */

module.exports = {
    // List of environments options: https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    // List of es-lint rules: https://eslint.org/docs/rules/
    rules: {
        'array-callback-return': 'warn',
        'no-duplicate-imports': 'warn',
        'no-template-curly-in-string': 'warn',
        'no-unreachable-loop': 'warn',
    },
}
