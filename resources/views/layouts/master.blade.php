<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta content="CMS for CNSPRO" name="description" />
        <meta content="FANG FROM FSTUDIO" name="author" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('pagetitle') - CNSPROP CMS</title>

       {{-- Laravel Mix - CSS File --}}
       <link rel="stylesheet" href="{{ mix('css/cnspro.css') }}">

    </head>
    <body class="@yield('pagename')">
        <div id="wrapper">

            @include('layouts.header')

            @include('layouts.leftbar')

            <!-- START Page Content -->
            <div class="content-page">
                <div class="content">
                    <div class="container-fluid">

                        @yield('content')

                    </div>
                </div>
            </div>
            <!-- End Page Content-->

            @include('layouts.footer')

        </div>

        <!-- START react PORTAL BOX -->
        <div id="portal-box"></div>

        {{-- Laravel Mix - JS File --}}
        <script src="{{ mix('js/app.js') }}"></script>
        @yield('pagejs')

    </body>
</html>
