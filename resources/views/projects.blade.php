@extends('layouts.master')
@section('pagetitle', 'Projects')
@section('pagename', 'page-projects')

@section('content')
    <!-- Page title box -->
    {{-- <div class="page-title-box">
        <ol class="breadcrumb float-right">
            <li class="breadcrumb-item">CMS.CNSPRO</li>
        </ol>
        <h4 class="page-title">Project</h4>
    </div> --}}
    <!-- End page title box -->

    {{-- START root for REACT --}}
    <div id="root-projects" projects-data="{{ $projects }}"></div>

@endsection


@push('pagescripts')
    <script src="{{ mix('js/projects-page.js') }}"></script>
@endpush