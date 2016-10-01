<template>

    <div>
        <content-header v-if="resData" :breadcrumb="breadcrumb"></content-header>
        

        <Modal :modal-data="modalData" :form-submit="formSubmit" :close-modal="closeModal"></Modal>
    </div>

</template>

<script>
    import commonMixin from '../../../mixins/commonMixin'
    import apiMixin from '../../../mixins/apiMixin'

    export default {
        mixins: [commonMixin, apiMixin],
        data () {
            return {
                resData: null,
                subject: "currency",
                code: "ccy",
                modalData: {},
                dataLabel: {
                    ccy_status: "狀態",
                    ccy_name_zh_TW: "繁中名稱",
                    ccy_name_zh_CN: "簡中名稱",
                    ccy_name_en: "英文名稱",
                    ccy_code: "代碼",
                    ccy_udate: "更新時間",
                    ccy_add_date: "新增時間",
                    ccy_guid: "ID",
                    ccy_id: "_ID"
                }
            }
        },
        ready() {
            this.dataReload();
        },
        computed: {
            tableData() {
                var list = this.resData.data.list.map(item=>{return {...item, id: item[this.code+'_guid']}})
                var columns = this.dataLabel
                var display = {
                    ccy_status: true,
                    ccy_name_zh_TW: true,
                    ccy_name_zh_CN: true,
                    ccy_name_en: true,
                    ccy_code: true,
                    ccy_udate: true,
                    ccy_add_date: false
                }

                var filter = {
                    ccy_status: "status",
                    ccy_udate: "date",
                    ccy_add_date: "date"
                }

                var controller = {
                    title: "控制",
                    btns: ['edit','del']
                }

                return {
                    list,
                    columns,
                    display,
                    filter,
                    controller
                }
            }
        },
        methods: {
            modifyReady(data) {
                this.modalInit()
                this.modalData.title = "修改幣別項目"
                this.modalData.id = data.ccy_guid
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

                this.api.setting(this.subject,'postNew',data).then(res=>{
                    if(res.code===0){
                        this.closeModal()
                        swal("新增成功！").then(()=> this.dataReload())
                    }else{
                        this.handleError(res)
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
                this.api.setting(this.subject,'updateItem',data).then(res=>{
                    if(!res.code){
                        this.closeModal()
                        swal("修改成功！").then(()=>this.dataReload())
                    }else{
                        this.handleError(res)
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
                    label: this.dataLabel,
                    errMsg: {}
                }
            },
            createReady() {
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

            }
        }
    }
</script>


