@extends('layouts.master')
@section('pagetitle', 'New projects')
@section('pagename', 'page-new_projects')

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
    <div id="root-new-projects" class="card m-b-30" projects-data="{{ $projects }}"></div>

@endsection


@push('pagescripts')
    <script src="{{ mix('js/new-projects-page.js') }}"></script>
@endpush