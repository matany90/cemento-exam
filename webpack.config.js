/**
 * webpack.config will define the rules that
 * the server will compile by.
 * One of the main configurations goal is to compile ES6 code
 * to ES5 using Babel.
 */
 const nodeExternals = require("webpack-node-externals")
 const GenerateJsonPlugin = require("generate-json-webpack-plugin")
 const pkg = require("./package")
 
 // set externals that you don't want to build by webpack
 const externals = Object.keys(pkg.dependencies)
 
 // defines json of packages that will exclude in build process
 // the packeges will be built on dockerfile, therefore there is no
 // need to includes them on webpack build process
 const excludePackeges = externals.reduce(
   (acc, name) => Object.assign({}, acc, { [name]: true }),
   {}
 )
 
 /**
  * build package.json file
  */
 const genPackage = () => ({
   name: pkg.name,
   private: true,
   main: "index.js",
   dependencies: externals.reduce(
     (acc, name) =>
       Object.assign({}, acc, {
         [name]:
           pkg.dependencies[name] ||
           pkg.devDependencies[name]
       }),
     {}
   )
 })
 
  /**
   * expend webpack config according to prod env
   */
  const webpackProdConfigs = () => {
   return {
     mode: "production",
     module: {
       rules: [
         {
           test: /\.js$/,
           use: "babel-loader",
           exclude: /node_modules/
         }
       ]
     },
     externals: excludePackeges,
     plugins: [
       new GenerateJsonPlugin("package.json", genPackage())
     ]
   }
  }
 
  /**
   * expend webpack config according to dev env
   */
  const webpackDevConfigs = () => {
    return {
      mode: "development",
      watch: true,
      externals: [nodeExternals()],
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ["babel-loader", "eslint-loader"],
            exclude: /node_modules/
          }
        ]
      }
    }
  }
 
  // base webpack confgurations
  // should be extended by production or dev
  let baseConfig = {
    // entry point
    entry: [`${__dirname}/src/index.js`],
 
    // output compiled file
    output: {
      path: `${__dirname}/dist`,
      filename: "index.js",
      libraryTarget: "commonjs2"
    },
 
    // target Build
    target: "node"
  }
 
  // expend base config according to runtime env
  baseConfig = {
    ...baseConfig,
    ...(process.env.NODE_ENV === "production" ? webpackProdConfigs() : webpackDevConfigs())
  }
 
  // exports webpack condigs
  module.exports = baseConfig