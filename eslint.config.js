import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    // https://github.com/eslint/eslint/discussions/18304#discussioncomment-9069706
    ignores: [
      '.greenwood/*',
      'node_modules/*',
      'public/*',
      'prisma/*',
      'sql/*',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];