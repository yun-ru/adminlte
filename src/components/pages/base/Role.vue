<template>

    <div>
        <content-header v-if="resData" :breadcrumb="breadcrumb"></content-header>
        <content-body v-if="resData"
                      :code="code"
                      :permission="permission"
                      :permission-btn="permissionBtn"
                      :table-data="tableData"
                      :test-table-data="testTableData"
                      :data-reload="dataReload"
                      :on-modify="onModify"
                      :on-create="onCreate"
                      :on-delete="onDelete"
                      :pagination="pagination"
                      :data-label="dataLabel"
                      :change-page="changePage"
                      :search-text="searchText"
                      :on-search="onSearch"
                      :check-empty="checkEmpty"
                      :get-search-type="getSearchType"
                      :search-types="searchTypes"
                      :search-mode="searchMode"
                      :current-search-type="currentSearchType"
        ></content-body>

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
                subject: "role",
                code: "role",
                modalData: {},
                dataLabel: {
                    role_specific: "編輯",
                    role_status: "狀態",
                    role_name_zh_TW: "繁中名稱",
                    role_name_zh_CN: "簡中名稱",
                    role_name_en: "英文名稱",
                    role_description_zh_TW: "繁中說明",
                    role_description_zh_CN: "簡中說明",
                    role_description_en: "英文說明",
                    role_udate: "更新時間",
                    role_add_date: "新增時間",
                    role_guid: "ID",
                    role_id: "_ID"
                }
            }
        },
        computed: {
            testTableData() {
                var list = this.resData.data.list.map(item=>{return {...item, id: item[this.code+'_guid']}})
                var columns = this.dataLabel
                var display = {
                    role_status: true,
                    role_name_zh_TW: true,
                    role_name_zh_CN: true,
                    role_name_en: true,
                    role_description_zh_TW: true,
                    role_description_zh_CN: true,
                    role_description_en: true,
                    role_udate: true,
                    role_specific: false
                }

                var filter = {
                    role_status: "status",
                    role_udate: "date",
                    role_add_date: "date",
                    role_specific: "edit"
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
        ready() {
            this.dataReload()
        },
        methods: {
            modifyReady(data) {
                this.modalInit()
                this.modalData.title = "修改幣別項目"
                this.modalData.id = data.role_guid
                this.modalData.value = data
                this.modalData.display = {
                    role_status: true,
                    role_name_zh_TW: true,
                    role_name_zh_CN: true,
                    role_name_en: true,
                    role_description_zh_TW: true,
                    role_description_zh_CN: true,
                    role_description_en: true,
                    role_udate: true,
                    role_add_date: true
                }
            },
            modifySubmit(_data) {
                var data = {
                    role_guid: this.modalData.id,
                    role_status: _data.role_status,
                    role_name_zh_TW: _data.role_name_zh_TW || "",
                    role_name_zh_CN: _data.role_name_zh_CN || "",
                    role_name_en: _data.role_name_en || "",
                    role_description_zh_TW: _data.role_description_zh_TW || "",
                    role_description_zh_CN: _data.role_description_zh_CN || "",
                    role_description_en: _data.role_description_en || "",
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
            createSubmit(_data) {
                var data = {
                    role_status: _data.role_status,
                    role_name_zh_TW: _data.role_name_zh_TW,
                    role_name_zh_CN: _data.role_name_zh_CN,
                    role_name_en: _data.role_name_en,
                    role_description_zh_TW: _data.role_description_zh_TW,
                    role_description_zh_CN: _data.role_description_zh_CN,
                    role_description_en: _data.role_description_en,
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
            modalInit() {
                this.modalData = {
                    ready: false,
                    title: "",
                    id: null,
                    display: {},
                    value: {},
                    type: {
                        role_status: "radio",
                        role_name_zh_TW: "text",
                        role_name_zh_CN: "text",
                        role_name_en: "text",
                        role_description_zh_TW: "text",
                        role_description_zh_CN: "text",
                        role_description_en: "text",
                        role_udate: "date",
                        role_add_date: "date",
                        role_guid: "static"
                    },
                    option: {
                        role_status: [
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
                    role_status: true,
                    role_name_zh_TW: true,
                    role_name_zh_CN: true,
                    role_name_en: true,
                    role_description_zh_TW: true,
                    role_description_zh_CN: true,
                    role_description_en: true
                }
                this.modalData.value = {
                    role_status: 3,
                    role_name_zh_TW: "",
                    role_name_zh_CN: "",
                    role_name_en: "",
                    role_description_zh_TW: "",
                    role_description_zh_CN: "",
                    role_description_en: ""
                }

            }
        }
    }
</script>

