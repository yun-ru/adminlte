<template>

  <div>
    <content-header :title="title" :sub-title="subTitle" :breadcrumb-list="breadcrumbList"></content-header>


    <content-body :title="title" @open-modal="openModal">
      <div class="controller" slot="controller">

        <!--<a class="btn btn-sm btn-success btn-flat pull-right"><i class="fa fa-plus"></i><span v-if="winType !== 'xs'">新增項目</span></a>-->
      </div>
      <template slot="pagination">
        <pagination :data="pageData" :page-list="pageList"></pagination>
      </template>
    </content-body>


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
  import Pagination from '../../widgets/Pagination.vue'
  import ContentHeader from '../../widgets/ContentHeader.vue'
  import ContentBody from '../../widgets/ContentBody.vue'
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
        responseData: {},
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
      this.loading = true
    },
    ready() {
      var run = async function () {
        let res = await api.getCurrencyList()
        res.code>0 ? this.handleError(res) : this.handleSuccess(res)
        this.loading = false
      }
      run.call(this)
    },
    components: {
      ContentHeader,
      ContentBody,
      Modal,
      Pagination
    },
    events: {
      tableOk() {
        console.log("child say ok")
      }
    },
    methods: {
      handleSuccess(res) {
        this.dataContent.data = this.makeTableData(res.data.list)
        this.dataContent.columns = this.tableColumns
        this.permission = this.checkPermission(res.data.permission)
        this.breadcrumbList = this.makeBreadCrumbList(res.data.breadcrumb)
        this.pageData = res.data.paginator
        this.pageList = this.makePageList(this.pageData.page_num, this.pageData.page)
        this.responseData = res
        this.$broadcast("onReady")
        console.log("mom")
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
