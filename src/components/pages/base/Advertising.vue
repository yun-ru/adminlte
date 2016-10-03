<template>

    <div>
        <content-header v-if="resData" :breadcrumb="breadcrumb"></content-header>
        <content-body v-if="resData"
                      :code="code"
                      :permission="permission"
                      :crud="CRUD"
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

        <Modal :modal-data="modalData"
               :form-submit="formSubmit"
               :close-modal="closeModal"
               :on-file-change="onFileChange"
        ></Modal>
    </div>

</template>

<script>
    import commonMixin from '../../../mixins/commonMixin'
    import apiMixin from '../../../mixins/apiMixin'

    export default {
        mixins: [commonMixin, apiMixin],
        data () {
            return {
                subject: "advertising",
                code: "ang"
            }
        },
        ready() {
            this.dataReload();
        },
        computed: {
            dataLabel() {
                return {
                    [`pick_file`]: "選擇圖片",
                    [`files_name`]: "縮圖",
                    [`${this.code}_status`]: "狀態",
                    [`${this.code}_les_guid`]: "語系",
                    [`${this.code}_title`]: "標題",
                    [`${this.code}_description`]: "說明",
                    [`${this.code}_link`]: "連結",
                    [`${this.code}_blank`]: "另開視窗",
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
                    [`files_name`]: true,
                    [`${this.code}_status`]: true,
                    [`${this.code}_les_guid`]: true,
                    [`${this.code}_title`]: true,
                    [`${this.code}_description`]: true,
                    [`${this.code}_link`]: true,
                    [`${this.code}_blank`]: true,
                    [`${this.code}_udate`]: false,
                    [`${this.code}_add_date`]: false
                }

                var filter = {
                    [`files_name`]: "image",
                    [`${this.code}_les_guid`]: "lang",
                    [`${this.code}_blank`]: "yes",
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
                    controller,
                    langList: this.langList
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
                        [`files_name`]: "image",
                        [`pick_file`]: "file",
                        [`${this.code}_status`]: "radio",
                        [`${this.code}_title`]: "text",
                        [`${this.code}_description`]: "text",
                        [`${this.code}_les_guid`]: "radio",
                        [`${this.code}_link`]: "text",
                        [`${this.code}_blank`]: "radio",
                        [`${this.code}_udate`]: "date",
                        [`${this.code}_add_date`]: "date",
                        [`${this.code}_guid`]: "static"
                    },
                    option: {
                        [`${this.code}_status`]: [
                            {label: "啟用", value: 3},
                            {label: "不啟用", value: -2}
                        ],
                        [`${this.code}_blank`]: [
                            {label: "是", value: 'y'},
                            {label: "否", value: 'n'}
                        ],
                        [`${this.code}_les_guid`]: _.map(this.langList,item=>{
                            return {label: item.les_name_zh_TW, value: item.les_guid}
                        })

                    },
                    label: this.dataLabel,
                    errMsg: {}
                }
            },
            createReady() {
                this.modalInit()
                this.modalData.title = "新增廣告輪播項目"
                this.modalData.id = null
                this.modalData.display = {
                    [`pick_file`]: true,
                    [`files_name`]: false,
                    [`${this.code}_status`]: true,
                    [`${this.code}_les_guid`]: true,
                    [`${this.code}_title`]: true,
                    [`${this.code}_description`]: true,
                    [`${this.code}_link`]: true,
                    [`${this.code}_blank`]: true
                }
                this.modalData.value = {
                    [`files_name`]: "",
                    [`pick_file`]: "",
                    [`${this.code}_status`]: 3,
                    [`${this.code}_les_guid`]: "",
                    [`${this.code}_title`]: "",
                    [`${this.code}_description`]: "",
                    [`${this.code}_link`]: "",
                    [`${this.code}_blank`]: "y"
                }

            },
            modifyReady(data) {
                this.modalInit()
                this.modalData.title = "修改廣告輪播項目"
                this.modalData.id = data[`${this.code}_guid`]
                this.modalData.value = data
                this.modalData.display = {
                    [`pick_file`]: true,
                    [`files_name`]: true,
                    [`${this.code}_status`]: true,
                    [`${this.code}_les_guid`]: true,
                    [`${this.code}_title`]: true,
                    [`${this.code}_description`]: true,
                    [`${this.code}_link`]: true,
                    [`${this.code}_blank`]: true,
                    [`${this.code}_udate`]: true,
                    [`${this.code}_add_date`]: true
                }
            },
            createSubmit(_data) {
                var data = {
                    [`fi${this.code}_les_guid`]: this.modalData.file_guid,
                    [`${this.code}_status`]: _data[`${this.code}_status`],
                    [`${this.code}_les_guid`]: _data[`${this.code}_les_guid`],
                    [`${this.code}_title`]: _data[`${this.code}_title`],
                    [`${this.code}_description`]: _data[`${this.code}_description`],
                    [`${this.code}_link`]: _data[`${this.code}_link`],
                    [`${this.code}_blank`]: _data[`${this.code}_blank`]
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
                    [`fi${this.code}_les_guid`]: this.modalData.file_guid,
                    [`${this.code}_status`]: _data[`${this.code}_status`],
                    [`${this.code}_les_guid`]: _data[`${this.code}_les_guid`],
                    [`${this.code}_title`]: _data[`${this.code}_title`],
                    [`${this.code}_description`]: _data[`${this.code}_description`],
                    [`${this.code}_link`]: _data[`${this.code}_link`],
                    [`${this.code}_blank`]: _data[`${this.code}_blank`]
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


