const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');

module.exports = {
    mode: 'development',
    entry: { index: './source/index' },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/',
        filename: '[name].js?[hash]',
        chunkFilename: 'route.[name].js?[hash]',
        crossOriginLoading: 'anonymous',
    },

    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    { loader: './node_modules/mini-css-extract-plugin/dist/loader.js' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: { path: './postcss.config.js', ctx: { isMinify: false } }
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: { keepQuery: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.svg(\?.*)?$/,
                use: [{
                        loader: 'external-svg-sprite-loader',
                        options: {
                            name: 'sprite.svg',
                            iconName: 'i-[name]-[hash:5]',
                            svgoOptions: {
                                plugins: [
                                    { inlineStyles: true },
                                    { collapseGroups: true },
                                    { convertPathData: true },
                                    { convertStyleToAttrs: true },
                                    { convertTransform: true },
                                    { convertColors: { shorthex: false } },
                                    { cleanupNumericValues: { floatPrecision: 2 } },
                                    { minifyStyles: true },
                                    { removeDesc: true },
                                    { removeTitle: true },
                                    { removeViewBox: false },
                                    { removeDimensions: true },
                                    { sortAttrs: true }
                                ]
                            }
                        }
                    },
                    { loader: 'svg-transform-loader' }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new SvgStorePlugin(),
    ],
};
