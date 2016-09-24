<template>

    <div>
        <content-header :breadcrumb="breadcrumb"></content-header>
        <!--<content-body :permission="permission" :table-data="tableData"></content-body>-->

        <Modal :modal-data="modalData" :form-submit="formSubmit" :close-modal="closeModal"></Modal>
    </div>

</template>

<script>
    import api from '../../../../config/api.js'
    import ContentHeader from '../../widgets/ContentHeader.vue'
    import ContentBody from '../../widgets/ContentBody.vue'
    import Modal from '../../widgets/Modal.vue'
    import tableMixin from '../../../mixins/tableMixin'
    import commonMixin from '../../../mixins/commonMixin'
    export default {
        data () {
            return {
                resData: {},
//                tableContent: {},
//                loading: false,
//                permission: 0,
//                pageData: {},
//                pageList: [],
//                breadcrumbList: [],
//                resData: {},
//                tableColumns: [
//                    {title: '代碼'},
//                    {title: '英文名稱'},
//                    {title: '簡中名稱'},
//                    {title: '繁中名稱'},
//                    {title: '狀態'},
//                    {title: '最後更新時間'},
//                    {title: '控制'}
//                ],
                modalData: {}
            }
        },
        computed: {
            breadcrumb() {
                return _.map(this.resData.data.breadcrumb,item=>{
                    return {text: item.node_name_zh_TW,link: item.node_route}
                })
            },
            tableData() {

            }
        },
        created() {
            this.loading = true
            api.addCurrency({ccy_status:123})
        },
        ready() {
            this.dataReload()

        },
        components: {
            ContentHeader,
            ContentBody,
            Modal
        },
        events: {
            onCreate() {
                this.create()
            },
            onSubmitNew(data) {
                this.createSubmit(data)
            },
            onSubmitModify(data) {
                this.modifySubmit(data)
            },
            modify(id) {
                this.modify(id)
            },
            onUpdate() {
                this.dataReload()
            },
            delete(id) {
                this.handleRemove(api.delCurrency({ccy_guid: id}),this.dataReload)
            }
        },
        methods: {
            handleSuccess(res) {
                this.resData = res
//                this.tableContent.data = this.makeTableData(res.data.list)
//                this.tableContent.columns = this.tableColumns
//                this.permission = this.checkPermission(res.data.permission)
//                this.breadcrumbList = this.makeBreadCrumbList(res.data.breadcrumb)
//                this.pageData = res.data.paginator
//                this.pageList = this.makePageList(this.pageData.page_num, this.pageData.page)
//                this.resData = res
//                this.$broadcast("onReady")
//                console.log("onReady!")
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

                    tableData.push({id: item.ccy_guid, tds: itemArr})
                })
                return tableData
            },
            dataReload() {
                console.log("onUpdate!")
                this.$broadcast("onUpdate")
                api.getCurrencyList().then(res=>{
                    res.code===0 ? this.handleSuccess(res) : this.handleError(res)
                    this.loading = false
                })
            },
            create() {
                this.createModal()
                $("#myModal").modal()
            },
            modify(id) {
                api.showCurrency({ccy_guid: id}).then(res=>{
                    var data = res.data.currency
                    if(!res.code){
                        this.modifyModal(id,data)
                        $('#myModal').modal()
                    }else{
                        this.handleError(res)
                    }
                })
            },
            modifyModal(id,data) {
                this.modalInit()
                this.modalData.title = "修改幣別項目"
                this.modalData.id = id
                this.modalData.value = data
                this.modalData.display = {
                    ccy_status: true,
                    ccy_name_zh_TW: true,
                    ccy_name_zh_CN: true,
                    ccy_name_en: true,
                    ccy_code: true,
                    ccy_udate: true,
                    ccy_add_date: true
                }
            },
            createSubmit(_data) {
                var data = {
                    ccy_status: _data.ccy_status,
                    ccy_name_zh_TW: _data.ccy_name_zh_TW,
                    ccy_name_zh_CN: _data.ccy_name_zh_CN,
                    ccy_name_en: _data.ccy_name_en,
                    ccy_code: _data.ccy_code
                }

                api.addCurrency(data).then(res=>{
                    if(!res.code){
                        $('#myModal').modal("hide")
                        swal("新增成功！").then(()=>{
                            this.dataReload()
                        })
                    }else{
                        if(res.code===10006){
                            this.modalData.errMsg = res.text
                        }else{
                            swal("新增失敗！")
                        }
                    }

                })
            },
            modifySubmit(_data) {
                var data = {
                    ccy_guid: this.modalData.id,
                    ccy_status: _data.ccy_status,
                    ccy_name_zh_TW: _data.ccy_name_zh_TW,
                    ccy_name_zh_CN: _data.ccy_name_zh_CN,
                    ccy_name_en: _data.ccy_name_en,
                    ccy_code: _data.ccy_code
                }
                api.editCurrency(data).then(res=>{
                    if(!res.code){
                        $('#myModal').modal("hide")
                        swal("修改成功！").then(()=>{
                            this.dataReload()
                        })
                    }else{
                        if(res.code===10006){
                            this.modalData.errMsg = res.text
                        }else{
                            swal("修改失敗！")
                        }
                    }
                })
            },
            modalInit() {
              this.modalData = {
                  ready: false,
                  title: "",
                  id: null,
                  display: {},
                  value: {},
                  type: {
                      ccy_status: "radio",
                      ccy_name_zh_TW: "text",
                      ccy_name_zh_CN: "text",
                      ccy_name_en: "text",
                      ccy_code: "text",
                      ccy_udate: "date",
                      ccy_add_date: "date",
                      ccy_guid: "static"
                  },
                  option: {
                      ccy_status: [
                          {label: "啟用", value: 3},
                          {label: "不啟用", value: -2}
                      ]
                  },
                  label: {
                      ccy_status: "狀態",
                      ccy_name_zh_TW: "繁中名稱",
                      ccy_name_zh_CN: "簡中名稱",
                      ccy_name_en: "英文名稱",
                      ccy_code: "代碼",
                      ccy_udate: "更新時間",
                      ccy_add_date: "新增時間",
                      ccy_guid: "ID"
                  },
                  errMsg: {}
              }
            },
            createModal() {
                this.modalInit()
                this.modalData.title = "新增幣別項目"
                this.modalData.id = null
                this.modalData.display = {
                    ccy_status: true,
                    ccy_name_zh_TW: true,
                    ccy_name_zh_CN: true,
                    ccy_name_en: true,
                    ccy_code: true,
                }
                this.modalData.value = {
                    ccy_status: 3,
                    ccy_name_zh_TW: "",
                    ccy_name_zh_CN: "",
                    ccy_name_en: "",
                    ccy_code: ""
                }

            },
            formSubmit() {
                var data = this.modalData.value
                this.modalData.id ? this.modifySubmit(data) : this.createSubmit(data)
            },
            closeModal() {
                $('#myModal').modal("hide")
            }
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
