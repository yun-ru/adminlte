<template>
  <app-header></app-header>
  <app-sidebar></app-sidebar>
  <router-view
          class="view"
          keep-alive>
  </router-view>
  <app-footer></app-footer>
</template>

<script>

  import Header from '../components/layout/Header.vue'
  import Sidebar from '../components/layout/Sidebar.vue'
  import Footer from '../components/layout/Footer.vue'

  module.exports = {
    name: 'Container',
    data: function () {
      return {
        menu: require('../../config/menu.js') || []
      }
    },
    components: {
      'app-header': Header,
      'app-sidebar': Sidebar,
      'app-footer': Footer
    }
  }

</script>
