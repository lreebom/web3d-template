const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BuildConfig = require("./build-config/build-config");

module.exports = {
    entry: {
        index: {
            import: BuildConfig.entry
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.jpg', '.png', '.exr', '.glb', '.vert', '.frag'],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader"]
            },
            {
                test: /\.(glsl|vert|frag)$/i,
                exclude: /node_modules/,
                type: 'asset/source'
            }
        ]
    }
};