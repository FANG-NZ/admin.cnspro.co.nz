@if(Session::has('RESPONSE_MESSAGE'))
    <div id="toast-box" toast-data='{{ Session::get('RESPONSE_MESSAGE') }}'></div>
@endif