@extends('layouts.master')
@section('pagetitle', 'Dashboard')
@section('pagename', 'page-dashboard')

@section('content')
    <!-- Page title box -->
    <div class="page-title-box">
        <ol class="breadcrumb float-right">
            <li class="breadcrumb-item">CMS.CNSPRO</li>
        </ol>
        <h4 class="page-title">Dashboard</h4>
    </div>
    <!-- End page title box -->

    {{-- START root for REACT --}}
    <div id="root-dashboard">

        <div id="main-banner-slider" class="card">

            <div class="card-header ff-card-header">
                <div class="card-header-content">
                    <h4 class="header-title">Main banner images</h4>
                </div>
                <div class="card-header-tools">
                    <button class="btn btn-success">
                        <i class="mdi mdi-plus-circle"></i>
                        <span>New item</span>
                    </button>
                </div>
            </div>
            
            <div class="card-body">
            <div class="row">
            
                <div class="col-md-3">
                    <div class="card main-banner-slider-item">
                        <img src="https://freebw.com/templates/tatee/images/slide-01.jpg" alt="" class="card-img-top img-fluid" />
                        <div class="card-body">
                            <div class="card-title">
                                Canadian lake house features dark wood
                            </div>
                        </div>
                        <div class="card-body card-btns">
                            <button class="btn btn-success btn-sm">
                                <i class="mdi mdi-database-plus"></i>
                                <span>Edit</span>
                            </button>

                            <button class="btn btn-danger btn-sm">
                                <i class="mdi mdi-delete"></i>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card main-banner-slider-item">
                        <img src="https://freebw.com/templates/tatee/images/slide-02.jpg" alt="" class="card-img-top img-fluid" />
                        <div class="card-body">
                            <div class="card-title">
                                Future housein the Barvikha forest
                            </div>
                        </div>
                        <div class="card-body card-btns">
                            <button class="btn btn-success btn-sm">
                                <i class="mdi mdi-database-plus"></i>
                                <span>Edit</span>
                            </button>

                            <button class="btn btn-danger btn-sm">
                                <i class="mdi mdi-delete"></i>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
        </div>

    </div>

@endsection

@push('pagescripts')
    <script src="{{ mix('js/dashboard-page.js') }}"></script>
@endpush


