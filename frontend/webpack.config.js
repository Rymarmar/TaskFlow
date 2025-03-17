// frontend/webpack.config.js

const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // For client-side routing if needed
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
    historyApiFallback: true, // For client-side routing
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,      // Transpile .js and .jsx files
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,          // Load CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,  // Load images
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // So you can import .js/.jsx files without specifying extensions
  },
};
