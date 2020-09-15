const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const createConfig = (name) => {
  return {
    entry: `./src/${name}.js`,
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `h5p-hub-${name}.js`,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: 'babel-loader'
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'node_modules/normalize.css'),
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ],
        },
        {
          test: /\.(svg)$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'url-loader?limit=1000000'
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `h5p-hub-${name}.css`
      })
    ]
  };
};

const sharingConfig = createConfig('sharing');
const registrationConfig = createConfig('registration');

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    sharingConfig.devtool = 'inline-source-map';
    registrationConfig.devtool = 'inline-source-map';
    // config.entry = "./src/entries/dev.js";
  }

  return [sharingConfig, registrationConfig];
};
