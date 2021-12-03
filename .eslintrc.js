module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 13,
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    settings: {
        react: {
            version: '17.0.2'
        }
    },
    rules: {
        indent: 'off',
        '@typescript-eslint/indent': ['error'],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        'quote-props': ['error', 'as-needed'],
        'eol-last': ['error', 'always']
    }
};
