const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const PATHS = {
    src: './src',
    dist: './dist',
    jsDir: 'assets/js',
    cssDir: 'assets/css',
    imgDir: 'assets/img',
    fontDir: 'assets/fonts',
    scssDir: 'assets/scss'
}

const conf = {

    entry: { app: './src/index.js' },

    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: `${PATHS.jsDir}/[name].js`,
        clean: true,
        publicPath: '/',
    },

    // target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    devServer: {

        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        overlay: true,
        // hot:true,
        // watchOptions: {
        //     poll: true,
        //     ignored: '/node_modules/',
        //   },

    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            title: "Boilerplate",
            template: './src/index.html',
            // template:'', path.resolve(__dirname, `${PATHS.src}/index.html`),
            filename: 'index.html'

        }),
        new MiniCssExtractPlugin({

            filename: `${PATHS.cssDir}/[name].css`,

        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/js`, to: PATHS.jsDir, noErrorOnMissing: true },
                { from: `${PATHS.src}/img`, to: PATHS.imgDir, noErrorOnMissing: true },
                { from: `${PATHS.src}/fonts`, to: PATHS.fontDir, noErrorOnMissing: true },
                { from: `${PATHS.src}/scss`, to: PATHS.scssDir, noErrorOnMissing: true }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
            },

            {
                test: /\.css$/i,
                exclude: '/node_modules/',
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: { config: './src/js/postcss.config.js' }
                        }
                    },
                ],
            },

            {
                test: /\.s[ac]ss$/i,
                exclude: '/node_modules/',
                use: [

                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: { config: './src/js/postcss.config.js' }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ],
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                exclude: '/node_modules/',
                options: {
                    name: '[name].[ext]',
                    // publicPath:'./src/assets/img',
                    outputPath: PATHS.imgDir
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: 'file-loader',
                exclude: '/node_modules/',
                options: {
                    name: '[name].[ext]',
                    outputPath: PATHS.fontDir
                }
            },

        ]
    },

};

module.exports = conf;