<template>
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <!-- Messages: style can be found in dropdown.less-->
                <li class="dropdown messages-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-envelope-o"></i>
                        <span class="label label-danger">4</span>
                    </a>
                    <message-list></message-list>
                </li>
                <!-- Notifications: style can be found in dropdown.less -->
                <li class="dropdown notifications-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-bell-o"></i>
                        <span class="label label-danger">10</span>
                    </a>
                    <notification-list></notification-list>
                </li>
                <li>
                    <a href="javascript:;"><i class="fa fa-sign-out"></i></a>
                </li>
                <!-- User Account: style can be found in dropdown.less -->
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <img src="../../../assets/image/user2-160x160.jpg" class="user-image" alt="User Image">
                        <span class="hidden-xs">Alexander Pierce</span>
                    </a>
                    <personal-box></personal-box>
                </li>

            </ul>
        </div>

    </nav>
</template>


<script>
    import MessageList from './MessageList.vue'
    import NotificationList from './NotificationList.vue'
    import PersonalBox from './PersonalBox.vue'
    export default {
        components: {
            MessageList,
            NotificationList,
            PersonalBox
        }
    }
</script>
