module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order', // プロパティの順番
    'stylelint-rscss/config', // RSCSS用
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-declaration-strict-value'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'max-nesting-depth': [
      1,
      {
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['include', 'media'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['mixin', 'if', 'for', 'include'] },
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'blockless-after-blockless'],
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'scale-unlimited/declaration-strict-value': [
      ['/color$/', 'background-color', 'border-color'],
      { expandShorthand: true, ignoreValues: 'transparent' },
    ],
    'declaration-property-unit-disallowed-list': [
      {
        'line-height': ['rem', 'px', '%'],
      },
    ],
  },
  ignoreFiles: ['**/*.vue', '**/_reset.scss'], // NOTE: vueのスタイルは一旦無視で
}
