<template>
    <nav class="page">
        <ul class="pagination pagination-sm pull-left">
            <li :class="{disabled: pagination.page === 1}"><a @click="changePage(pagination.page-1,$event)"><i class="fa fa-angle-double-left"></i></a></li>
            <li v-for="index in pagination.page_num" :class="{active: pagination.page === index+1}"><a @click="changePage(index+1,$event)">{{index+1}}</a></li>
            <li :class="{disabled: pagination.page === pagination.page_num}"><a @click="changePage(pagination.page+1,$event)"><i class="fa fa-angle-double-right"></i></a></li>
        </ul>
        <p class="pull-right">
            排序：{{pagination.sort | sortBy}},
            類型：{{pagination.sort_type | sortType}},
            第 {{pagination.page}} 頁, 共 {{pagination.page_num}} 頁
            <span class="text-muted">(共 {{pagination.count}} 筆, 每頁顯示 {{pagination.perpage}} 筆)</span>
        </p>
    </nav>
</template>

<script>
    export default {
        props: ['pagination','dataLabel','changePage'],
        filters: {
            sortBy(data) {
                return this.dataLabel[data]
            },
            sortType(data) {
                return data==='DESC'? "正排序" : "逆排序"
            }
        }
    }
</script>

<style lang="stylus">
    nav.page
        p
            margin: 0
        .pagination
            margin: 0
</style>
