// @ts-check
import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ['src/__generated__/*', 'src/proto-gen/*'],
  },
  {
    rules: {
      curly: ['error', 'all'],
      indent: ['error', 2],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // Allow marking unused variables as `_.*` to indicate that they are intentionally unused
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  prettierConfig,
);
