module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2016,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    extends: [
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    globals: {},
    rules: {
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true,
            },
        ],
        eqeqeq: [
            'error',
            'always',
            {
                null: 'ignore',
            },
        ],
        'no-caller': 'error',
        'no-new': 'error',
        'no-with': 'error',

        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',

        'sort-imports': [
            'error',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
            },
        ],
        'import/newline-after-import': ['error'],
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                'newlines-between': 'never',
            },
        ],

        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/no-require-imports': 'error',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
