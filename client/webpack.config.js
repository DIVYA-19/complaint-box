const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs"); 
const path = require("path"); 
const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3000;

const getClientEnv = () => {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + "/.env";
  const envPath = basePath  + "." + (process.env.ENV || 'production');
  console.log(envPath)
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  console.log(envKeys)

  return {
    envKeys
  };
};

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.ProvidePlugin({
      "React": "react",
   }),
   new webpack.DefinePlugin(getClientEnv()),
   new webpack.EnvironmentPlugin( { ...process.env } )
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    open: true,
  },
};
