<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta content="CNSPRO CMS" name="description" />
        <meta content="FSTUDIO" name="author" />

        <title>Login - CNSPRO CMS</title>

       {{-- Laravel Mix - CSS File --}}
       <link rel="stylesheet" href="{{ mix('css/cnspro.css') }}">

    </head>
    <body class="bg-account-pages">

        <section>
            <div class="container">
                <div class="row">
                    <div class="col-12">

                        <div class="wrapper-page">
                            <div class="account-pages">
                                <div class="account-box">

                                    <!-- Logo box-->
                                    <div class="account-logo-box">
                                        <h2 class="text-uppercase text-center">
                                            CNSPRO CMS
                                        </h2>
                                    </div>
                                    
                                    <div class="account-content">

                                        {{-- @if(Session::has('fs-message'))
                                            <div class="alert alert-{{Session::get('fs-message')['status']}}">
                                                {{ Session::get('fs-message')['content'] }}            
                                            </div>
                                        @endif --}}

                                        <form action="{{ route('dologin') }}" method="POST">
                                            
                                            {{csrf_field()}}

                                            @error('message')
                                                <div class="alert alert-danger">
                                                    {{ $message }}            
                                                </div>
                                            @enderror

                                            <div class="form-group mb-3">
                                                <label for="emailaddress" class="font-weight-medium">Email address</label>
                                                <input class="form-control" 
                                                    type="email" 
                                                    name="Email" id="emailaddress" 
                                                    value="admin@cnspro.co.nz"
                                                    required="" 
                                                    placeholder="Enter your email">
                                            
                                                @if ($errors->has('Email'))
                                                    <ul class="parsley-errors-list filled">
                                                        <li class="parsley-required">Please enter email address</li>
                                                    </ul>
                                                @endif
                                            
                                            </div>

                                            <div class="form-group mb-3">
                                                {{-- <a href="auth-recoverpassword.html" class="text-muted float-right">
                                                    <small>Forgot your password?</small>
                                                </a> --}}
                                                <label for="password" class="font-weight-medium">Password</label>
                                                <input class="form-control" type="password" name="Password" required="" id="password" placeholder="Enter your password"
                                                    value="Test123456"
                                                >
                                                
                                                @if ($errors->has('Password'))
                                                    <ul class="parsley-errors-list filled">
                                                        <li class="parsley-required">Please enter password</li>
                                                    </ul>
                                                @endif
                                            
                                            </div>

                                            <div class="form-group mb-3">
                                                <div class="checkbox checkbox-info">
                                                    <input id="remember" type="checkbox">
                                                    <label for="remember">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="form-group row text-center">
                                                <div class="col-12">
                                                    <button class="btn btn-block btn-success waves-effect waves-light" type="submit">Sign In</button>
                                                </div>
                                            </div>
                                        </form> <!-- end form -->

                                        {{-- 
                                        <div class="row mt-3">
                                            <div class="col-12 text-center">
                                                <p class="text-muted">Don't have an account? <a href="auth-register.html" class="text-dark m-l-5"><b>Sign Up</b></a></p>
                                            </div>
                                        </div> <!-- end row-->
                                        --}}
                                    </div> <!-- end account-content -->

                                </div> <!-- end account-box -->
                            </div>
                            <!-- end account-page-->
                        </div>
                        <!-- end wrapper-page -->

                    </div> <!-- end col -->
                </div> <!-- end row -->
            </div> <!-- end container -->
        </section>
        <!-- END HOME -->    
    </body>
</html>