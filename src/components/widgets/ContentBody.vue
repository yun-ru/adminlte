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
                    <search-input></search-input>
                </div>
            </div>
            <div class="box-body">

                <test-table v-if="permission" :test-table-data="testTableData" :permission="permission" :on-modify="onModify" :on-delete="onDelete"></test-table>
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
    import commonMixin from '../../mixins/commonMixin'
    import MyTable from '../widgets/MyTable.vue'
    import TestTable from '../widgets/TestTable.vue'
    import SearchInput from '../widgets/Search.vue'
    import Pagination from '../widgets/Pagination.vue'

    export default {
        mixins: [RWD,commonMixin],
        props: ['tableData','permission','dataReload','onModify','onCreate','onDelete','pagination','dataLabel','changePage','testTableData'],
        components: {
            SearchInput,
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
