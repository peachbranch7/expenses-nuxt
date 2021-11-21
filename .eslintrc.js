module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  // add your custom rules here
  rules: {
    // NOTE: console系はconsole.errorだけwarning出ないようにする
    'no-console': [1, { allow: ['error'] }],
  },
};
