'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack4不支持extrack-text-webpack-plugin 用在css上
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : require('../config/prod.env')
console.log(path.resolve(__dirname,'../src/components'));

const webpackConfig = merge(baseWebpackConfig, {
  //新增
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // new webpack.DefinePlugin({
    //   'process.env': env
    // }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   },
    //   sourceMap: config.build.productionSourceMap,
    //   parallel: true
    // }),
    // extract css into its own file
    // webpack4不支持了
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css'),
    //   // Setting the following option to `false` will not extract CSS from codesplit chunks.
    //   // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
    //   // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
    //   // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
    //   allChunks: true,
    // }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    //css压缩 和 用来去除css中无用的数据和优化css
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'manual'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting 默认开启了这个
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks(module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    // // This instance extracts shared chunks from code splitted chunks and bundles them
    // // in a separate chunk, similar to the vendor chunk
    // // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   async: 'vendor-async',
    //   children: true,
    //   minChunks: 3
    // }),
    // copy custom static assets
    //为每一个chunk添加名字避免id递增每次以前打包的都变了失去了缓存
    //https://segmentfault.com/a/1190000015919928
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      }
      const modules = Array.from(chunk.modulesIterable)
      if (modules.length > 1) {
        const hash = require('hash-sum')
        const joinedHash = hash(modules.map(m => m.id).join('_'))
        let len = nameLength
        while (seen.has(joinedHash.substr(0, len))) len++
        seen.add(joinedHash.substr(0, len))
        return `chunk-${joinedHash.substr(0, len)}`
      } else {
        return modules[0].id
      }
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ],
  optimization: {
    /*压缩js代码入口，是否开启minimizer，
      例如TerserWebpackPlugin插件，性能比UglifyJSPlugin好
      默认引入生产模式为true,所以不用操作，可以手动开启和调节minimizer选项*/
    // minimize: false
    // 对于动态导入模块，默认使用 webpack v4+ 提供的全新的通用分块策略(common chunk strategy)。
    // 请在 SplitChunksPlugin 页面中查看配置其行为的可用选项。
    splitChunks: {
      chunks: 'all',
      cacheGroups:{
        //选择性使用
        // 'base-component': {
        //   name: 'base-component',
        //   test: path.resolve(__dirname,'../src/components'), // can customize your rules
        //   enforce: true //强制分包 对一些全局的公用组件可以进行强制分包
        // },
        //也可以通过minChunks,同时被三个chunk引用,才会单独打包
        // commons: {
        //   name: 'chunk-commons',
        //   test:  path.resolve(__dirname,'../src/components'), // can customize your rules
        //   minChunks: 3, //  minimum common number
        //   priority: 5,
        //   reuseExistingChunk: true
        // }
      }
    },
    runtimeChunk: 'single',
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       mangle: {
    //         safari10: true
    //       }
    //     },
    //     sourceMap: config.build.productionSourceMap,
    //     cache: true,
    //     parallel: true
    //   }),
    //   // Compress extracted CSS. We are using this plugin so that possible
    //   // duplicated CSS from different components can be deduped.
    //   new OptimizeCSSAssetsPlugin()
    // ]
  },
})
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
    threshold: 10240,
    minRatio: 0.8
  }))
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig