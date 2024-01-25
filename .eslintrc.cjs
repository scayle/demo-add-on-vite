module.exports = {
    root: false,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    plugins: ['unicorn'],
    extends: [
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
    ],
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: {
            ts: '@typescript-eslint/parser',
        },
        sourceType: 'module',
    },
    rules: {
        'vue/require-explicit-emits': [
            'error',
            {
                allowProps: false,
            },
        ],
        'vue/attributes-order': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'always',
                'normal': 'always',
                'component': 'always'
            },
            'svg': 'always',
            'math': 'always'
        }],
        'vue/html-closing-bracket-spacing': [
            'error',
            {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always',
            },
        ],
        // eslint-plugin-import
        'import/first': 'error',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
            },
        ],
        'import/no-mutable-exports': 'error',
        'import/no-unresolved': 'off',
        'no-unused-vars': ['off'],
    },
};
