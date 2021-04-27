<!-- ========== Left Sidebar Start ========== -->
<div class="left-side-menu">

    <div class="slimscroll-menu">

        <!--- Sidemenu -->
        <div id="sidebar-menu">

            <ul class="metismenu" id="side-menu">

                <li class="menu-title">Navigation</li>

                <li class="{{ Request::is('dashboard') ? 'active' : '' }}">
                    <a href="{{ route('page_dashboard') }}">
                        <i class="mdi mdi-view-dashboard"></i> <span>Dashboard</span>
                    </a>
                </li>

                <li class="{{ Request::is('projects') ? 'active' : '' }}">
                    <a href="{{ route('page_projects') }}">
                        <i class="mdi mdi-atom"></i> <span>Project(s)</span>
                    </a>

                    @if (Request::is('projects'))
                        <ul id='projects-page-sub-nav' class="nav-second-level">
                            {{-- Insert sub nav here --}}
                        </ul>
                    @endif     
                </li>

                <li class="menu-title">More</li>

                <li class="{{ Request::is('settings') ? 'active' : '' }}">
                    <a href="{{ route('page_settings')}}">
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
