import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    ignores: ['**/*.config.js', 'node_modules', 'build'],
    plugins: {
      unicorn: eslintPluginUnicorn,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 0,
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'react/destructuring-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/camelcase': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'import/named': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'no-restricted-exports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'linebreak-style': ['error', 'unix'],
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase',
        },
      ],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            e: {
              event: false,
            },
            res: false,
            props: false,
            params: false,
            str: false,
            args: false,
            ref: false,
          },
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true, allowHigherOrderFunctions: true },
      ],
      'prettier/prettier': ['error'],
    },
    settings: {
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
  },
  eslintPluginPrettierRecommended,
];
