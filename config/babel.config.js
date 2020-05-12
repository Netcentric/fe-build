module.exports = {
  enforce: 'post',
  test: /\.js$/,
  exclude: /node_modules\/(?!@nc|@henkel)/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: 'usage',
            corejs: '3'
          }
        ]
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-destructuring'
      ]
    }
  }
};
