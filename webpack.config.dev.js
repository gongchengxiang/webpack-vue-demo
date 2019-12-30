const path = require('path');
const webpack = require('webpack');
const htmlWebapckPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: './src/main/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assects/images/',
            limit: 2048   // 单位是byte, 设置2kb以下转为base64
          }
        }
      },
      {
        test: /\.(woff2)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
            options: {
              outputPath: 'assects/css/',
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
              // publicPath: './',
            }
          },
          'css-loader',
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
            options: {
              outputPath: 'assects/css/',
              hmr: true,
              reloadAll: true,
              // publicPath: './',
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 versions', '>1%']
                })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        include: /src/, // exclude为不包括，include包括
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    // edge: '17',
                    // firefox: '60',
                    // chrome: '67',
                    // safari: '11.1',
                    browsers: ["chrome >= 67", "safari >= 11", "edge >= 17", "firefox >= 60"]
                  },
                  useBuiltIns: 'usage', // 按需注入，需要指定coreJs
                  corejs: 2
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.vue$/,
        use: [
         { loader:  'vue-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebapckPlugin({
      title: 'webpack学习',
      template: './src/template/index.html', // 模板文件
      inject: true, // 放到head里面
      chunks: ['vendors~index','index']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assects/css/[name].css',
      chunkFilename: 'assects/css/[id].css',
    })
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      // cacheGroups: {
      //   styles: {
      //     name: 'styles',
      //     test: /\.(sa|sc|c)ss$/,
      //     chunks: 'all',
      //     enforce: true,
      //   },
      // },
    }
  },
  resolve :{
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js'  // 该注释为模板编译模式， 默认为运行时模式，更小更快
    }
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/, // 忽略node-modules文件夹
    aggregateTimeout: 300, // 监听文件变化300ms后执行更新
    poll: 1000, // 1s轮询一次文件是否更新
  },
  devServer: {
    contentBase: './dist',
    port: '8888',
    open: true,
    hot: true,
    hotOnly: true,
    proxy: {} // TODO
  }
};