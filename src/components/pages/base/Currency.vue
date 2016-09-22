<template>

    <div>
        <content-header :title="title" :sub-title="subTitle" :breadcrumb-list="breadcrumbList"></content-header>


        <content-box :title="title" @open-modal="openModal">
            <div class="controller" slot="controller">
                <div class="btn-group pull-left">
                    <a class="btn btn-sm btn-default btn-flat"><i class="fa fa-arrow-left"></i><span v-if="winType !== 'xs'">返回</span></a>
                    <a class="btn btn-sm btn-default btn-flat"><i class="fa fa-undo"></i><span v-if="winType !== 'xs'">更新</span></a>
                    <a class="btn btn-sm btn-success btn-flat" @click="openModal"><i class="fa fa-plus"></i><span v-if="winType !== 'xs'">新增</span></a>
                </div>
                <search-input></search-input>
                <!--<a class="btn btn-sm btn-success btn-flat pull-right"><i class="fa fa-plus"></i><span v-if="winType !== 'xs'">新增項目</span></a>-->
            </div>
            <div class="table-responsive" slot="main">
                <my-table v-if="!loading" transition :data-content="dataContent">
                    <template slot="inlineControl">
                        <button class="btn btn-default btn-xs" type="button" @click="openModal">修改</button>
                    </template>
                </my-table>
            </div>
            <template slot="pagination">
                <pagination :data="pageData" :page-list="pageList"></pagination>
            </template>
        </content-box>


        <Modal :title="title">
            <form class="form-horizontal" slot="main">
                <div class="form-group">
                    <label for="item01" class="col-sm-2 control-label">項目一</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="item01" placeholder="請輸入項目一">
                    </div>
                </div>
                <div class="form-group">
                    <label for="item02" class="col-sm-2 control-label">項目二</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="item02" placeholder="請輸入項目二">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">項目三</label>
                    <div class="col-sm-10">
                        <label class="checkbox-inline">
                            <input type="checkbox" value="option1"> 1
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="option2"> 2
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="option3"> 3
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">項目四</label>
                    <div class="col-sm-10">
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 3
                        </label>
                    </div>
                </div>

            </form>
        </Modal>
    </div>

</template>

<script>
    import api from '../../../../config/api.js'
    import MyTable from '../../widgets/MyTable.vue'
    import SearchInput from '../../widgets/Search.vue'
    import Pagination from '../../widgets/Pagination.vue'
    import ContentHeader from '../../widgets/ContentHeader.vue'
    import ContentBox from '../../widgets/ContentBox.vue'
    import Modal from '../../widgets/Modal.vue'
    import tableMixin from '../../../mixins/tableMixin'
    import commonMixin from '../../../mixins/commonMixin'
    export default {
        data () {
            return {
                subject: "系統設置",
                title: '幣別設定',
                subTitle: "幣別設定的說明在這裡",
                dataContent: {},
                loading: false,
                permission: 0,
                pageData: {},
                pageList: [],
                breadcrumbList: [],
                tableColumns: [
                    {title: '代碼'},
                    {title: '英文名稱'},
                    {title: '簡中名稱'},
                    {title: '繁中名稱'},
                    {title: '狀態'},
                    {title: '最後更新時間'},
                    {title: '控制'}
                ]
            }
        },
        created() {
            var run = async function () {
                let res = await api.getCurrencyList()
                if(res.code) this.handleError(res)
                else this.handleSuccess(res)
            }
            run.call(this)
            this.loading = true
        },
        ready() {
            setTimeout(function(){
                this.loading = false;
            }.bind(this),1000)
        },
        components: {
            MyTable,
            ContentHeader,
            ContentBox,
            Modal,
            Pagination,
            SearchInput
        },
        methods: {
            handleSuccess(res) {
                this.dataContent.data = this.makeTableData(res.data.list)
                this.dataContent.columns = this.tableColumns
                this.permission = this.dec2bin(res.data.permission)
                this.breadcrumbList = this.makeBreadCrumbList(res.data.breadcrumnb)
                this.pageData = res.data.paginator
                this.pageList = this.makePageList(this.pageData.page_num, this.pageData.page)
                this.$broadcast("onReady")
            },
            makeBreadCrumbList(list) {
                var breadcrumblist = []
                _.each(list,(item,i,arr)=>{
                    if(i===arr.length-1){
                        breadcrumblist.push({text: item.node_name_en, isActive: true})
                    }else{
                        breadcrumblist.push({text: item.node_name_en, isActive: false})
                    }
                })
                return breadcrumblist
            },
            makeTableData(list){
                var tableData = []
                _.each(list,item=>{
                    var itemArr = []
                    itemArr.push(item.ccy_code)
                    itemArr.push(item.ccy_name_en)
                    itemArr.push(item.ccy_name_zh_CN)
                    itemArr.push(item.ccy_name_zh_TW)
                    itemArr.push(this.caseStatus(item.ccy_status))
                    itemArr.push(new Date(item.ccy_udate*1000).toLocaleString())

                    tableData.push(itemArr)
                })
                return tableData
            },
        },
        mixins: [tableMixin,commonMixin]
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
