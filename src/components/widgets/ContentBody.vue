<template>
    <section class="content">
        <div class="box box-success">
            <div class="box-header with-border">
                <div class="controller" v-if="permission">
                    <div class="btn-group pull-left">
                        <a class="btn btn-sm btn-default btn-flat"><i class="fa fa-arrow-left"></i><span v-if="winType !== 'xs'">返回</span></a>
                        <a class="btn btn-sm btn-default btn-flat" @click="dataReload"><i class="fa fa-undo"></i><span v-if="winType !== 'xs'">更新</span></a>
                        <a class="btn btn-sm btn-success btn-flat" v-if="CRUD.C" @click="onCreate"><i class="fa fa-plus"></i><span v-if="winType !== 'xs'">新增</span></a>
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

                <data-table
                    v-if="permission"
                    :code="code"
                    :table-data="tableData"
                    :permission="permission"
                    :crud="CRUD"
                    :on-modify="onModify"
                    :on-delete="onDelete"
                    :check-select-all="checkSelectAll"
                ></data-table>
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
    import DataTable from './DataTable.vue'
    import Search from '../widgets/Search.vue'
    import Pagination from '../widgets/Pagination.vue'

    export default {
        mixins: [RWD],
        props: [
            'code',
            'tableData',
            'permission',
            'CRUD',
            'dataReload',
            'onModify',
            'onCreate',
            'onDelete',
            'pagination',
            'dataLabel',
            'changePage',
            'searchText',
            'onSearch',
            'checkEmpty',
            'getSearchType',
            'searchTypes',
            'currentSearchType',
            'searchMode',
            'checkSelectAll'
        ],
        components: {
            Search,
            Pagination,
            DataTable
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
