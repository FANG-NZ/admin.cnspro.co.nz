@extends('layouts.master')
@section('pagetitle', 'New project')
@section('pagename', 'page-new-project')

@section('content')
    <!-- Page title box -->
    <div class="page-title-box">
        <ol class="breadcrumb float-right">
            <li class="breadcrumb-item">CMS.CNSPRO</li>
        </ol>
        <h4 class="page-title">New project</h4>
    </div>
    <!-- End page title box -->

    {{-- START root for REACT --}}
    <div id="root-new-projects" class="card-box" projects-data="{{ $projects }}"></div>

@endsection


@section('pagejs')
    <script src="{{ mix('js/new-projects-page.js') }}"></script>
@endsection