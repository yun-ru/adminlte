<template>

    <div>
        <content-header :title="title" :sub-title="subTitle" :breadcrumb-list="breadcrumbList"></content-header>


        <content-body></content-body>


        <Modal :title="title" :modal-type="modalType" :modal-item="modalItem">

        </Modal>
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
                subject: "系統設置",
                title: '幣別設定',
                subTitle: "幣別設定的說明在這裡",
                tableContent: {},
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
                ],
                modalItem: {}
            }
        },
        created() {
            this.loading = true
        },
        ready() {
            this.update()
            api.addCurrency({ccy_status:123})
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
                this.update()
            },
            delete(id) {
                this.handleRemove(api.delCurrency({ccy_guid: id}),this.update)
            }
        },
        methods: {
            update() {
                console.log("onUpdate!")
                this.$broadcast("onUpdate")
                api.getCurrencyList().then(res=>{
                    res.code===0 ? this.handleSuccess(res) : this.handleError(res)
                    this.loading = false
                })
            },
            create() {
                this.initModalItem()
                this.modalItem.ready = true
                $("#myModal").modal()
            },
            modify(id) {
                this.initModalItem()
                this.modalItem.title = "修改幣別項目"
                this.modalItem.id = id
                this.modalItem.ready = true
                api.showCurrency({ccy_guid: id}).then(res=>{
                    var data = res.data.currency
                    if(!res.code){
                        this.modalItem.value = {
                            ccy_status: data.ccy_status,
                            ccy_name_zh_TW: data.ccy_name_zh_TW,
                            ccy_name_zh_CN: data.ccy_name_zh_CN,
                            ccy_name_en: data.ccy_name_en,
                            ccy_code: data.ccy_code,
                            ccy_udate: new Date(data.ccy_udate*1000).toLocaleString(),
                            ccy_add_date: new Date(data.ccy_add_date*1000).toLocaleString(),
                            ccy_guid: data.ccy_guid
                        }
                        this.modalItem.display = {
                            ccy_status: true,
                            ccy_name_zh_TW: true,
                            ccy_name_zh_CN: true,
                            ccy_name_en: true,
                            ccy_code: true,
                            ccy_udate: true,
                            ccy_add_date: true
                        }
                        $('#myModal').modal()
                    }else{
                        this.handleError(res)
                    }
                })
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
                            this.update()
                        })
                    }else{
                        if(res.code===10006){
                            this.modalItem.errMsg = res.text
                        }else{
                            swal("新增失敗！")
                        }
                    }

                })
            },
            modifySubmit(_data) {
                var data = {
                    ccy_guid: this.modalItem.id,
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
                            this.update()
                        })
                    }else{
                        if(res.code===10006){
                            this.modalItem.errMsg = res.text
                        }else{
                            swal("修改失敗！")
                        }
                    }
                })
            },
            initModalItem() {
                this.modalItem = {
                    ready: false,
                    title: "新增幣別項目",
                    id: "",
                    display: {
                        ccy_status: true,
                        ccy_name_zh_TW: true,
                        ccy_name_zh_CN: true,
                        ccy_name_en: true,
                        ccy_code: true,
                    },
                    type: {
                        ccy_status: "radio",
                        ccy_name_zh_TW: "text",
                        ccy_name_zh_CN: "text",
                        ccy_name_en: "text",
                        ccy_code: "text",
                        ccy_udate: "static",
                        ccy_add_date: "static",
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
                    value: {
                        ccy_status: 3,
                        ccy_name_zh_TW: "",
                        ccy_name_zh_CN: "",
                        ccy_name_en: "",
                        ccy_code: ""
                    },
                    errMsg: {}
                }
            },
            handleSuccess(res) {
                this.tableContent.data = this.makeTableData(res.data.list)
                this.tableContent.columns = this.tableColumns
                this.permission = this.checkPermission(res.data.permission)
                this.breadcrumbList = this.makeBreadCrumbList(res.data.breadcrumb)
                this.pageData = res.data.paginator
                this.pageList = this.makePageList(this.pageData.page_num, this.pageData.page)
                this.responseData = res
                this.$broadcast("onReady")
                console.log("onReady!")
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

                    tableData.push({id: item.ccy_guid, tds: itemArr})
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
