module.exports = {
    extends: ['polestar'],
    rules: {
        'react/no-deprecated': ['warn'], // componentWillReceiveProps 수정 완료 후 제거
        // 'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }], airbnb use
        'operator-linebreak': [
            'error',
            'before',
            {
                overrides: {
                    '=': 'ignore',
                    '+=': 'ignore',
                    '&&': 'ignore',
                    '||': 'ignore',
                },
            },
        ],
        // 'implicit-arrow-linebreak': ['error', 'beside'], airbnb use
        'object-curly-newline': 'off', // airbnb 3개 까지 허용
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        // 'react/jsx-wrap-multilines': [
        //     'error',
        //     {
        //         declaration: 'parens-new-line',
        //         assignment: 'parens-new-line',
        //         return: 'parens-new-line',
        //         arrow: 'parens-new-line',
        //         condition: 'parens-new-line',
        //         logical: 'parens-new-line',
        //         prop: 'parens-new-line',
        //     },
        // ],
    },
    overrides: [
        {
            files: ['**/*.test.js'],
            env: {
                jest: true, // now **/*.test.js files' env has both es6 *and* jest
            },
            // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
            // "extends": ["plugin:jest/recommended"]
            plugins: ['jest'],
            rules: {
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
                'jest/valid-expect': 'error',
            },
        },
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.config.js',
            },
        },
    },
};
