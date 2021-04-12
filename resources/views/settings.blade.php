@extends('layouts.master')
@section('pagetitle', 'Settings')
@section('pagename', 'page-settings')

@section('content')
    <!-- Page title box -->
    <div class="page-title-box">
        <ol class="breadcrumb float-right">
            <li class="breadcrumb-item">CMS.CNSPRO</li>
        </ol>
        <h4 class="page-title">Settings</h4>
    </div>
    <!-- End page title box -->

    <div class="row">
        <div class="col-12">
            <form action="{{ route('page_settings.update') }}" method="POST" data-parsley-validate>

            {{csrf_field()}}

            @method('PUT')

            {{-- START basic info --}}
            <div class="card-box">
                <h4 class="header-title">Basic info</h4>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="email">Email address</label>
                        <input type="text" 
                            class="form-control" 
                            id="email"
                            name="email" 
                            value=""
                            placeholder="Enter email adress" 

                            required   
                            data-parsley-type="email" 
                            data-parsley-required-message="Please enter your email address"
                            data-parsley-type-message="Please enter valid email address"
                        />

                        @error('email')
                        <ul class="parsley-errors-list filled">
                            <li class="parsley-required">{{$message}}</li>
                        </ul>
                        @enderror

                        <small class="form-text text-muted">All email will be sent to this address</small>
                    </div>

                    <div class="form-group col-md-6">
                        <label for="phone">Phone</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="phone" 
                            name="phone"
                            placeholder="Enter phone number" 

                            required    
                            data-parsley-required-message="Please enter phone number"    
                        />

                        @error('phone')
                            <ul class="parsley-errors-list filled">
                                <li class="parsley-required">{{$message}}</li>
                            </ul>
                        @enderror
                    </div>

                </div>
                
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="address">Address</label>
                        <textarea 
                            name="address" 
                            id="address" 
                            class="form-control"
                            cols="30" 
                            rows="3"
                            placeholder="Enter compnay address"  
                            
                            required    
                            data-parsley-required-message="Please enter your address"
                        ></textarea>
                    </div>
                </div>
            </div>
            {{-- END basic info --}}

            {{-- START social links --}}
            <div class="card-box">
                <h4 class="header-title">Socail links</h4>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="address">facebook</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <i class="mdi mdi-facebook-box"></i>
                                </div>
                            </div>
                            <input type="text" class="form-control" name="facebook" placeholder="Enter facebook link"/>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="address">instagram</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <i class="mdi mdi-instagram"></i>
                                </div>
                            </div>
                            <input type="text" class="form-control" name="instagram" placeholder="Enter instagram link"/>
                        </div>
                    </div>
                </div>
            </div>
            {{-- END social links --}}

            {{-- START security --}}
            <div class="card-box m-b-0">
                <h4 class="header-title">Security</h4>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="new-password">New password</label>
                        <input type="password" 
                            
                            autocomplete="new-password"
                            class="form-control" 
                            id="new-password"
                            name="new_password" 
                            placeholder="Enter new password" />
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="repeat-new-password">Repeat new password</label>
                        <input type="password" 
                            class="form-control" 
                            id="repeat-new-password"
                            name="repeat_new_password" 
                            placeholder="Repeat new password" 
                        
                            data-parsley-validate-if-empty
                            data-parsley-equalto="#new-password"
                            data-parsley-equalto-message="Please confirm your new password again"
                        />
                    </div>
                </div>
            </div>
            {{-- END security --}}

            <div class="row">
                <div class="co-12" style="padding:20px;">
                    <button type="submit" class="btn btn-info">
                        <i class="mdi mdi-database-plus"></i>
                        <span>Submit</span>
                    </button>
                </div>
            </div>

            </form>
        </div>
    </div>
    

@endsection


@section('pagejs')
    {{-- <script src="{{ mix('js/new-projects-page.js') }}"></script> --}}
@endsection