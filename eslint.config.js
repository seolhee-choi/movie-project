const eslint = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
    { ignores: ['node_modules/', 'dist/', '**/*.min.js', 'build/']}, // 무시할 파일 및 디렉토리 지정
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,  // 플러그인을 객체 형식으로 정의
        },
        rules: {
            'eqeqeq': ['error', 'always'],
            '@typescript-eslint/no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],
            'quotes': ['error', 'single'],
        },
    },
];
