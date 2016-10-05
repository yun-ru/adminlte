<template>
  <header class="main-header">

    <!-- Logo -->
    <a v-link="{path: '/'}" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>A</b>LT</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Admin</b>LTE</span>
    </a>

    <!-- Header Navbar: style can be found in header.less -->
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
              <img src="./../../assets/image/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">Alexander Pierce</span>
            </a>
            <personal-box :logout="logout"></personal-box>
          </li>

        </ul>
      </div>

    </nav>
  </header>
</template>


<script>
import MessageList from './header/MessageList.vue'
import NotificationList from './header/NotificationList.vue'
import PersonalBox from './header/PersonalBox.vue'
import AccountMixin from '../../mixins/AccountMixin'
export default {
    mixins: [AccountMixin],
    components: {
        MessageList,
        NotificationList,
        PersonalBox
    }
}
</script>
