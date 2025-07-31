import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Use compat.config for TanStack Query plugin and Prettier
  ...compat.config({
    plugins: ['@tanstack/query'],
    rules: {
      // TanStack Query rules
      '@tanstack/query/exhaustive-deps': 'error',
      // Removed prefer-query-object-syntax due to compatibility issues
    },
  }),
  {
    rules: {
      // General React rules
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',

      // Import rules
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
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // General rules
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  // Prettier configuration - ДОЛЖЕН БЫТЬ ПОСЛЕДНИМ!
  ...compat.extends('prettier'),
];

export default eslintConfig;