<template>
    <app-header></app-header>
    <app-sidebar @sidebar-ready="getSidebarHeight"></app-sidebar>
    <div class="content-wrapper" :style="{'min-height': contentMinHeight+'px'}">
        <router-view
            class="view"
            keep-alive>
        </router-view>
    </div>
    <app-footer></app-footer>
</template>

<script>

    import Header from '../components/layout/Header.vue'
    import Sidebar from '../components/layout/Sidebar.vue'
    import Footer from '../components/layout/Footer.vue'

    import menu from '../../config/menu'
    import commonMixin from '../mixins/commonMixin'
    import apiMixin from '../mixins/apiMixin'

    module.exports = {
        name: 'Container',
        data: function () {
            return {
                menu: menu || [],
                contentMinHeight: 0
            }
        },
        components: {
            'app-header': Header,
            'app-sidebar': Sidebar,
            'app-footer': Footer
        },
        ready() {
            this.loadMenu.call(this)
        },
        methods: {
            async loadMenu(){
                try{
                    let res = await this.api.menu()
                    res.code===0 ? this.handleSuccess(res) : this.handleError(res)
                }catch(err){
                    this.handleError(err)
                }
            },
            handleSuccess(res) {
                this.makeMenu(res.data)
            },
            getSidebarHeight(height) {
                console.log("sidebar's height: " + height)
                this.contentMinHeight = height-50
            },
            makeMenu(menu) {
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
            }
        },
        mixins: [commonMixin, apiMixin]
    }

</script>
