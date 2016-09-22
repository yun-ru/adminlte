<template>
    <section class="content">
        <div class="box box-success">
            <div class="box-header with-border">
                <div class="controller">
                    <div class="btn-group pull-left">
                        <a class="btn btn-sm btn-default btn-flat"><i class="fa fa-arrow-left"></i><span v-if="winType !== 'xs'">返回</span></a>
                        <a class="btn btn-sm btn-default btn-flat"><i class="fa fa-undo"></i><span v-if="winType !== 'xs'">更新</span></a>
                        <a class="btn btn-sm btn-success btn-flat" v-if="permission[2]-0" @click="openModal"><i class="fa fa-plus"></i><span v-if="winType !== 'xs'">新增</span></a>
                    </div>
                    <search-input></search-input>
                </div>
            </div><!-- /.box-header -->
            <div class="box-body">
                <my-table :table-content="tableContent" :permission="permission"></my-table>
                <pagination :data="pageData" :page-list="pageList"></pagination>
            </div><!-- /.box-body -->
            <div v-if="loading" class="overlay" transition>
                <i class="fa fa-refresh fa-spin"></i>
            </div>

        </div>
    </section>

</template>

<script>
    import RWD from '../../mixins/rwd'
    import MyTable from '../widgets/MyTable.vue'
    import SearchInput from '../widgets/Search.vue'
    import Pagination from '../widgets/Pagination.vue'
    export default {
        mixins: [RWD],
        data() {
            return {
                data: {},
                tableContent: {},
                permission: "",
                pageData: {},
                pageList: []
            }
        },
        props: {
            'title': String
        },
        events: {
            onReady() {
                console.log("contentBox get ready!")
                this.$broadcast("table-data-ready")
                this.data = this.$parent.$data.responseData.data
                this.tableContent = this.$parent.$data.tableContent
                this.permission = this.$parent.$data.permission
                this.pageData = this.$parent.$data.pageData
                this.pageList = this.$parent.$data.pageList
            },
            onModify(id) {
                console.log(id)
            }
        },
        methods: {
            openModal() {
                this.$broadcast("onReady")
            },
            setting() {

            },
            update() {

            },
            goBack() {

            }
        },
        components: {
            MyTable,
            SearchInput,
            Pagination
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
