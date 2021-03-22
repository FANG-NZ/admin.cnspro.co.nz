<!-- ========== Left Sidebar Start ========== -->
<div class="left-side-menu">

    <div class="slimscroll-menu">

        <!--- Sidemenu -->
        <div id="sidebar-menu">

            <ul class="metismenu" id="side-menu">

                <li class="menu-title">Navigation</li>

                <li class="{{ Request::is('dashboard') ? 'active' : '' }}">
                    <a href="{{ route('dashboard') }}">
                        <i class="mdi mdi-view-dashboard"></i> <span> Dashboard </span>
                    </a>
                </li>

                <li class="{{ Request::is('projects') ? 'active' : '' }}">
                    <a href="{{ route('projects') }}">
                        <i class="mdi mdi-atom"></i> <span> New Project(s) </span>
                    </a>

                    {{-- Create Menu Catalog --}}
                    {{-- @if (Request::is('cms/menus'))
                        <ul id="fem-catalog-nav" class="nav-second-level">
                            @foreach ($Catalogs as $catalog)
                                <li>
                                    <a href="#{{ $catalog->url_name() }}" fcms-catalog-id="{{ $catalog->id }}">
                                        {{ $catalog->name }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>

                        <ul id="fem-catalog-nav-btns-box" class="nav-second-level">
                            <li>
                                <button class="btn btn-sm btn-icon btn-success"
                                    data-toggle="modal" 
                                    data-target="#fem-catalog-modal"
                                    fcms-tag="add"
                                >
                                    <i class="mdi mdi-wrench"></i>
                                    Add New Menu
                                </button>
                            </li>
                        </ul>
                    @endif --}}
                    
                </li>

                <li class="menu-title">More</li>

                <li>
                    <a href="{{ route('dashboard')}}">
                        <i class="mdi mdi-map"></i> <span> Settings </span> 
                    </a>
                </li>

            </ul>

        </div>
        <!-- Sidebar -->

        <div class="clearfix"></div>

    </div>
    <!-- Sidebar -left -->

</div>
<!-- Left Sidebar End -->
