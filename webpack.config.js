const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: 'production', // 设置为生产模式
  entry: './src/main.js',
  resolve:  {
    alias: {
      '@': path.join(__dirname, './src/')
    }
  },
  devServer: {
    open: true, // 是否启动浏览器
    port: 4301, // 端口号
    hot: true // 热更新，文件发生变动时实时更新
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // webpack5，直接清理之前的打包（dist）文件夹
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,  // 提取 CSS 为单独文件
          'css-loader',
          'sass-loader'
        ],
        generator: {
          filename: 'css/[filename][hash:10][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),// 指定模板文件
      title: 'bootstrap5.cohen', // 设置 HTML 的 title
      filename: 'index.html', // //打包后输出的文件名
      inject: 'body', // 指定资源注入的位置
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
        removeAttributeQuotes: true //移除 HTML 属性值的引号
      }
    }),
    new MiniCssExtractPlugin({
      // filename: '[name].css', // 输出的 CSS 文件名
      filename: 'index.css' // 输出的 CSS 文件名
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin() // 压缩 CSS 文件
    ]
  }
}
