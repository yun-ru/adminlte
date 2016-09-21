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

  import api from '../../config/api'
  import menu from '../../config/menu'

  module.exports = {
    name: 'Container',
    data: function () {
      return {
        menu: menu || []
      }
    },
    components: {
      'app-header': Header,
      'app-sidebar': Sidebar,
      'app-footer': Footer
    },
    created() {
      var run = async function() {
        let res = await api.getMenu()
        console.log(res.data)
        this.doMenu(res.data)
      }
//      run.call(this)
    },
    methods: {
      doMenu(menu) {
        _.each(menu,(item,i,arr)=>{
          var targetItem = _.find(this.menu,{id: item.node_pguid})
          if(targetItem){
            if(!targetItem.hasOwnProperty('child')){
              targetItem.link = null
              targetItem.child = []
            }
            targetItem.child.push({
              id: item.node_guid,
              name: item.node_name_en,
              icon: 'fa-circle-o',
              link: '/'+item.node_route
            })

          }else{
            this.menu.push({
              id: item.node_guid,
              name: item.node_name_en,
              icon: 'fa-circle-o',
              link: '/'+item.node_route
            })
          }
        })
        console.log(this.menu)
      }
    }
  }

</script>
