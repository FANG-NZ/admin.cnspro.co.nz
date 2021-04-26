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
    <div id="root-dashboard" banner-sliders-data="{{ $banner_sliders }}"></div>

@endsection

@push('pagescripts')
    <script src="{{ mix('js/dashboard-page.js') }}"></script>
@endpush


