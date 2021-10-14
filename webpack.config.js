const { join, resolve } = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nameByBEM = require('./webpack.bem');

const SOURCE = resolve(__dirname, './src');
const OUTPUT = resolve(__dirname, './dist');
const UPLOADS = join(SOURCE, 'assets', 'uploads');

const PORT = 3000;

module.exports = (_, argv) => {
    const prod = argv.mode === 'production';

    return {
        context: SOURCE,

        entry: {
            app: './index.js',
        },

        output: {
            path: OUTPUT,
            filename: '[name].bundle.js',
            chunkFilename: '[id].[contenthash].js',
        },

        devServer: {
            port: PORT,
            static: {
                directory: UPLOADS,
                publicPath: '/assets/uploads'
            },
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.scss$/,
                    exclude: /styles/,
                    use: [
                        prod ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    getLocalIdent: nameByBEM,
                                },
                                sourceMap: false,
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.scss$/,
                    include: /styles/,
                    use: [
                        prod ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|svg|webp|ttf|woff2?)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },

        optimization: {
            minimize: prod,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ],
        },

        resolve: {
            modules: [
                'node_modules',
                'src',
            ],
        },

        plugins: [
            new HtmlPlugin({
                template: join(SOURCE, 'index.html'),
            }),
            new MiniCssExtractPlugin(),
            prod && new CopyPlugin({
                patterns: [
                    { 
                        from: UPLOADS, 
                        to: join(OUTPUT, 'assets', 'uploads') 
                    }
                ]
            })
        ].filter(Boolean),
    };
};
