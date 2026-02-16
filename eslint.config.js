import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import betterTailwind from "eslint-plugin-better-tailwindcss";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import prettierConfig from "eslint-config-prettier";
import {
  configs as airbnbConfigs,
  plugins as airbnbPlugins,
  rules as airbnbRules,
} from "eslint-config-airbnb-extended";

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  ...airbnbConfigs.react.recommended,
  reactHooks.configs.flat?.recommended || reactHooks.configs.recommended,
  reactRefresh.configs.vite || { plugins: { 'react-refresh': reactRefresh }, rules: { 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }] } },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'better-tailwindcss': betterTailwind,
      'import': importPlugin,
      'prettier': prettierPlugin,
      'unused-imports': unusedImports,
      ...airbnbPlugins,
    },
    rules: {
      ...airbnbRules,
      ...prettierConfig.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'unused-imports/no-unused-imports': 'error',
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
