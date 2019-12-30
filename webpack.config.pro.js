const path = require('path');
// const webpack = require('webpack');
const htmlWebapckPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    index: './src/main/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name]_[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
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
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename:'assects/css/[name].css',
      chunkFilename: 'assects/css/[id]_[hash:8].css',
    })
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      // minSize: 100,
      // maxSize: 200,
      // cacheGroups: {
      //   styles: {
      //     name: 'styles',
      //     test: /\.(sa|sc|c)ss$/,
      //     chunks: 'all',
      //     enforce: true,
      //   },
      // },
    },
    // minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    
  },
  resolve :{
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js'  // 该注释为模板编译模式， 默认为运行时模式，更小更快
    }
  }
};