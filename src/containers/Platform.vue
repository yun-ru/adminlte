<template>
    <app-header></app-header>
    <app-sidebar @sidebar-ready="getSidebarHeight"></app-sidebar>
    <div class="content-wrapper" :style="{'min-height': contentMinHeight+'px'}">
        <router-view class="view">
        </router-view>
    </div>
    <app-footer></app-footer>
</template>

<script>

    import Header from '../components/layout/Header.vue'
    import Sidebar from '../components/layout/Sidebar.vue'
    import Footer from '../components/layout/Footer.vue'

    import commonMixin from '../mixins/commonMixin'
    import apiMixin from '../mixins/apiMixin'
    import AccountMixin from '../mixins/AccountMixin'

    module.exports = {
        name: 'Container',
        data: function () {
            return {
                contentMinHeight: 0
            }
        },
        components: {
            'app-header': Header,
            'app-sidebar': Sidebar,
            'app-footer': Footer
        },
        ready() {
            if(this.menu.length===1) this.loadMenu()
        },
        mixins: [commonMixin, apiMixin, AccountMixin]
    }

</script>

<style lang="stylus">
    .v-transition
        transition: opacity 0.4s ease-in-out
    .v-enter, .v-leave
        opacity: 0
    .btn .caret
        margin-left: 10px
    select.flat
        border-radius: 0
</style>
