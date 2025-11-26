const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@shared": path.resolve(__dirname, "src/shared/"),
      "@features": path.resolve(__dirname, "src/features/"),
      "@app": path.resolve(__dirname, "src/app/"),
      // styles
      "@mixins": path.resolve(__dirname, "src/app/styles/mixins.scss"),
      "@animations": path.resolve(__dirname, "src/app/styles/animations.scss"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.module\.s[ac]ss$/,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "styleTag" }
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              esModule: false,
            },
          },
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: path.resolve(__dirname, "src/app/styles/variables.scss"),
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module\.s[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: path.resolve(__dirname, "src/app/styles/variables.scss"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, 'src/shared/assets/icons'),
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      // Остальные изображения
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        exclude: path.resolve(__dirname, 'src/shared/assets/icons'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: "./dist",
    port: 3000,
    hot: true,
    liveReload: true,
    client: {
      overlay: true,
    },
    watchFiles: [
      "src/shared/**.*"
    ],
  },
  mode: "development",
};

