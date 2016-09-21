<template>

  <div class="content-wrapper">
    <content-header :title="title" :sub-title="subTitle">
      <template slot="breadcrumb">
        <li><i class="fa fa-users"></i> {{subject}}</li>
        <li class="active">{{title}}</li>
      </template>
    </content-header>
    <section class="content">

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
          <my-table v-if="!loading" transition :data-content="dataContent" @modify="openModal"></my-table>
        </div>
        <template slot="pagination">
          <pagination :data="pageData" :page-list="pageList"></pagination>
        </template>
      </content-box>

    </section>

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
  import tableMixin from '../../../mixins/tableMixins'
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
        tableContent: [],
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
        let res = await api.getTestList()
        this.pushTableBody(res.data.list)
        this.dataContent.data = this.tableContent
        this.dataContent.columns = this.tableColumns
        this.permission = this.dec2bin(res.data.permission)
        this.pageData = res.data.paginator
        this.pageList = this.makePageList(this.pageData.page_num,this.pageData.page)
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

    },
    mixins: [tableMixin]
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
