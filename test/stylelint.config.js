module.exports = {
    extends: './node_modules/@henkel/hecore-scss-commons/styling.config.js',
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
      'at-rule-no-unknown': [true, {
        ignoreAtRules: ['use', 'function', 'if', 'each', 'else', 'for', 'include', 'mixin', 'return', 'warn']
      }],
      'plugin/no-unsupported-browser-features': [true, {
        ignore: [
          'intrinsic-width',
          'css3-cursors',
          'outline',
          'object-fit',
          'css-sticky',
          'css-appearance',
          'css-mixblendmode',
          'word-break',
          'user-select-none',
          'css-resize',
          'viewport-units',
          'multicolumn',
          'calc',
          'rem',
          'flexbox',
          'css-filters',
          'css-hyphens'
        ]
      }]
    }
  };
  