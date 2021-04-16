const mix = require('laravel-mix');
const path = require('path');


//Import jquery lib locally
mix.webpackConfig({

    //To add custom modules
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },

    resolve:{
        extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"],
        alias:{
            'jquery': path.resolve(__dirname, 'resources/libs/jquery/jquery.min.js')
        }
    }

});


// Add @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation
// mix.babelConfig({
//     "presets": [
//         '@babel/preset-env',
//         "@babel/preset-react",
//         '@babel/preset-typescript'
//     ],
//     "plugins": [
//         [
//           "@babel/plugin-proposal-class-properties",
//           {
//             "loose": true
//           }
//         ]
//     ]
// });

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/react/pages/new-projects-page.js', 'public/js')
    .sass('resources/sass/cnspro.scss', 'public/css')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);

mix.js('resources/react/pages/*.tsx', 'public/js')

