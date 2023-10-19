module.exports = {
    extends: ['stylelint-config-standard-scss'],
    ignoreFiles: [
      '**/*.css',
      '**/*.js',
      '**/node_modules/**'
    ],
    rules: {
      'selector-type-no-unknown': [true, {
        ignore: [
          'custom-elements',
          'default-namespace'
        ]
      }],
      'media-feature-range-notation': null,
      'at-rule-no-unknown': [true, {
        ignoreAtRules: ['use', 'function', 'if', 'each', 'else', 'for', 'include', 'mixin', 'return', 'warn']
      }]
    }
  };
  