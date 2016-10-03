<template>

  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <sidebar-user-panel></sidebar-user-panel>
      <sidebar-search></sidebar-search>
      <sidebar-menu></sidebar-menu>
    </section>
    <!-- /.sidebar -->
  </aside>
  
</template>

<script>

  import SidebarSearch from '../widgets/SidebarSearch.vue'
  import SidebarUserPanel from '../widgets/SidebarUserPanel.vue'
  import SidebarMenu from '../widgets/SidebarMenu.vue'

  module.exports = {
    data: function () {
      return {
        menu: this.$parent.$data.menu || []
      }
    },
    computed: {
      sidebarH() {
        return $(".main-sidebar").height()
      }
    },
    components: {
      'sidebar-search': SidebarSearch,
      'sidebar-user-panel': SidebarUserPanel,
      'sidebar-menu': SidebarMenu
    },
    ready() {
      console.log("sidebarH: " + this.sidebarH)
      this.$dispatch("sidebar-ready",this.sidebarH)
    }
  }

</script>
