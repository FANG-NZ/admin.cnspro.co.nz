const mix = require('laravel-mix');
const path = require('path');


//Import jquery lib locally
mix.webpackConfig({

    resolve:{
        alias:{
            'jquery': path.resolve(__dirname, 'resources/libs/jquery/jquery.min.js')
        }
    }

});

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
    .sass('resources/sass/cnspro.scss', 'public/css')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
