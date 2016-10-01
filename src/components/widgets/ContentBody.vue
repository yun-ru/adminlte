<template>
    <section class="content">
        <div class="box box-success">
            <div class="box-header with-border">
                <div class="controller" v-if="permission">
                    <div class="btn-group pull-left">
                        <a class="btn btn-sm btn-default btn-flat"><i class="fa fa-arrow-left"></i><span v-if="winType !== 'xs'">返回</span></a>
                        <a class="btn btn-sm btn-default btn-flat" @click="dataReload"><i class="fa fa-undo"></i><span v-if="winType !== 'xs'">更新</span></a>
                        <a class="btn btn-sm btn-success btn-flat" v-if="permission[2]-0" @click="onCreate"><i class="fa fa-plus"></i><span v-if="winType !== 'xs'">新增</span></a>
                    </div>
                    <search
                        :search-text="searchText"
                        :on-search="onSearch"
                        :check-empty="checkEmpty"
                        :get-search-type="getSearchType"
                        :search-types="searchTypes"
                        :current-search-type="currentSearchType"
                        :search-mode="searchMode"
                        :data-reload= "dataReload"
                    ></search>
                </div>
            </div>
            <div class="box-body">

                <test-table
                    v-if="permission"
                    :code="code"
                    :test-table-data="testTableData"
                    :permission="permission"
                    :permission-btn="permissionBtn"
                    :on-modify="onModify"
                    :on-delete="onDelete"
                ></test-table>
                <pagination v-if="pagination" :pagination="pagination" :data-label="dataLabel" :change-page="changePage"></pagination>

            </div>
            <!--<div v-if="loading" class="overlay" transition>-->
            <!--<i class="fa fa-refresh fa-spin"></i>-->
            <!--</div>-->

        </div>
    </section>

</template>

<script>
    import RWD from '../../mixins/rwd'
    import MyTable from '../widgets/MyTable.vue'
    import TestTable from '../widgets/TestTable.vue'
    import Search from '../widgets/Search.vue'
    import Pagination from '../widgets/Pagination.vue'

    export default {
        mixins: [RWD],
        props: [
            'code',
            'tableData',
            'permission',
            'permissionBtn',
            'dataReload',
            'onModify',
            'onCreate',
            'onDelete',
            'pagination',
            'dataLabel',
            'changePage',
            'testTableData',
            'searchText',
            'onSearch',
            'checkEmpty',
            'getSearchType',
            'searchTypes',
            'currentSearchType',
            'searchMode'
        ],
        components: {
            Search,
            MyTable,
            Pagination,
            TestTable
        }
    }
</script>

<style lang="stylus">
    div.table-responsive > div.dataTables_wrapper > div.row > div[class^="col-"]
        padding: 0
    .btn > span
        margin-left: 8px
    .box-body
        padding: 20px 12px

</style>
