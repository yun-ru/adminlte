<template>

    <div>
        <content-header v-if="resData" :breadcrumb="breadcrumb"></content-header>
        <content-body v-if="resData"
                      :code="code"
                      :permission="permission"
                      :permission-btn="permissionBtn"
                      :table-data="tableData"
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
                subject: "block",
                code: "bck"
            }
        },
        ready() {
            this.dataReload();
        },
        computed: {
            dataLabel() {
                return {
                    [`${this.code}_status`]: "狀態",
                    [`${this.code}_type`]: "類型",
                    [`${this.code}_content`]: "內容",
                    [`${this.code}_udate`]: "更新時間",
                    [`${this.code}_add_date`]: "新增時間",
                    [`${this.code}_guid`]: "ID",
                    [`${this.code}_id`]: "_ID"
                }
            },
            tableData() {
                var list = this.resData.data.list.map(item=>{return {...item, id: item[this.code+'_guid']}})
                var columns = this.dataLabel
                var display = {
                    [`${this.code}_status`]: true,
                    [`${this.code}_type`]: true,
                    [`${this.code}_content`]: true,
                    [`${this.code}_udate`]: false,
                    [`${this.code}_add_date`]: false
                }

                var filter = {
                    [`${this.code}_type`]: "type",
                    [`${this.code}_status`]: "status",
                    [`${this.code}_udate`]: "date",
                    [`${this.code}_add_date`]: "date"
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
            modalInit() {
                this.modalData = {
                    ready: false,
                    title: "",
                    id: null,
                    display: {},
                    value: {},
                    type: {
                        [`${this.code}_status`]: "radio",
                        [`${this.code}_type`]: "radio",
                        [`${this.code}_content`]: "text",
                        [`${this.code}_udate`]: "date",
                        [`${this.code}_add_date`]: "date",
                        [`${this.code}_guid`]: "static"
                    },
                    option: {
                        [`${this.code}_status`]: [
                            {label: "啟用", value: 3},
                            {label: "不啟用", value: -2}
                        ],
                        [`${this.code}_type`]: [
                            {label: "電話", value: 1},
                            {label: "IP", value: 2},
                            {label: "銀行帳號", value: 3}
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
                    [`${this.code}_status`]: true,
                    [`${this.code}_type`]: true,
                    [`${this.code}_content`]: true
                }
                this.modalData.value = {
                    [`${this.code}_status`]: 3,
                    [`${this.code}_type`]: "",
                    [`${this.code}_content`]: ""
                }

            },
            modifyReady(data) {
                this.modalInit()
                this.modalData.title = "修改幣別項目"
                this.modalData.id = data[`${this.code}_guid`]
                this.modalData.value = data
                this.modalData.display = {
                    [`${this.code}_status`]: true,
                    [`${this.code}_type`]: true,
                    [`${this.code}_content`]: true,
                    [`${this.code}_udate`]: true,
                    [`${this.code}_add_date`]: true
                }
            },
            createSubmit(_data) {
                var data = {
                    [`${this.code}_status`]: _data[`${this.code}_status`],
                    [`${this.code}_type`]: _data[`${this.code}_type`],
                    [`${this.code}_content`]: _data[`${this.code}_content`]
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
                    [`${this.code}_guid`]: this.modalData.id,
                    [`${this.code}_status`]: _data[`${this.code}_status`],
                    [`${this.code}_type`]: _data[`${this.code}_type`],
                    [`${this.code}_content`]: _data[`${this.code}_content`]
                }
                this.api.setting(this.subject,'updateItem',data).then(res=>{
                    if(!res.code){
                        this.closeModal()
                        swal("修改成功！").then(()=>this.dataReload())
                    }else{
                        this.handleError(res)
                    }
                })
            }
        }
    }
</script>


