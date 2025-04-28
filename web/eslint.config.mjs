import path from 'path';

import { includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslintJS from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import globals from 'globals';
import eslintTS from 'typescript-eslint';

const gitignorePath = path.resolve('.gitignore');

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { plugins: { 'no-relative-import-paths': noRelativeImportPaths } },
  {
    ignores: [
      'eslint.config.mjs',
      'node_modules/*',
      'src/**/*.d.ts',
      '**/*.min.js',
      'dist/**',
    ],
  },
  includeIgnoreFile(gitignorePath),
  eslintJS.configs.recommended,
  ...eslintTS.configs.recommended,
  ...compat.config({
    extends: ['next'],
    settings: {
      next: {
        rootDir: '.',
      },
    },
  }),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: true,
          rootDir: '.',
          prefix: '@',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
];
