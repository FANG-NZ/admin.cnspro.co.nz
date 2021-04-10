@if(Session::has('CNSPRO_MESSAGE'))
    <div id="toast-box" toast-data='{{ Session::get('CNSPRO_MESSAGE') }}'></div>
@endif