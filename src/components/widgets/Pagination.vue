<template>
    <nav class="page">
        <ul class="pagination pagination-sm pull-left">
            <li :class="{disabled: currentPage === 1}"><a href="#"><i class="fa fa-angle-double-left"></i></a></li>
            <li v-for="page in pageList" :class="{active: page.isActive}"><a href="">{{page.text}}</a></li>
            <li :class="{disabled: pageList.length <= 1 || currentPage === pageList.length}"><a href="#"><i class="fa fa-angle-double-right"></i></a></li>
        </ul>
        <p class="pull-right text-muted">
            ( 共 {{data.count}} 筆, 每頁顯示 {{data.perpage}} 筆, 共 {{data.page_num}} 頁 )
        </p>
    </nav>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        computed: {
            currentPage() {
                return this.data.page
            }
        },
        created() {

        },
        ready() {
        },
        props: ['data','page-list']
    }
</script>

<style lang="stylus">
    nav.page
        p
            margin: 0
        .pagination
            margin: 0
</style>
