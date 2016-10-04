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
                      :check-select-all="checkSelectAll"
        ></content-body>

        <button @click="onCreate">add test</button>
        <button @click="onModify('14349697-8a11-11e6-b295-000c29c2eae8')">edit test</button>

        <Modal :modal-data="modalData"
               :group-data="groupData"
               :form-submit="formSubmit"
               :close-modal="closeModal"
               :on-file-change="onFileChange"
               :on-group-file-change="onGroupFileChange"
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
                code: "ang",
                groupCode: "agp"
            }
        },
        ready() {
            this.dataReload();
        },
        computed: {
            dataLabel() {
                return {
                    [`group_pick_file`]: "選擇圖片",
                    [`group_file_img`]: "縮圖",
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
            searchTypes() {
                return [
                    {text: "全部", value: "search_complex", placeholder: "標題+連結"},
                    {text: this.dataLabel[`${this.code}_status`], value: `search_${this.code}_status`, opts: this.opts.status},
                    {text: this.dataLabel[`${this.code}_les_guid`], value: `search_${this.code}_les_guid`},
                    {text: this.dataLabel[`${this.code}_title`], value: `search_${this.code}_title`},
                    {text: this.dataLabel[`${this.code}_description`], value: `search_${this.code}_description`},
                    {text: this.dataLabel[`${this.code}_link`], value: `search_${this.code}_link`}
                ]
            },
            tableData() {
                var list = this.resData.data.list.map(item=>{return {...item, id: item[this.code+'_guid']}})
                var columns = this.dataLabel
                var display = {
                    [`group_file_img`]: true,
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
                    [`group_file_img`]: "image",
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
                    langList: this.langList,
                    checkGroup: this.checkGroup,
                    selectAll: this.selectAll,
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
                        [`group_file_img`]: "image",
                        [`group_pick_file`]: "file",
                        [`${this.code}_status`]: "radio",
                        [`${this.code}_title`]: "text",
                        [`${this.code}_description`]: "text",
                        [`${this.code}_les_guid`]: "select",
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
                this.modalData.title = "新增廣告輪播"
                this.modalData.id = null
                this.modalData.display = {
                    [`${this.code}_status`]: true,
                    [`${this.code}_blank`]: true
                }
                this.modalData.value = {
                    [`group_file_img`]: "",
                    [`group_pick_file`]: "",
                    [`${this.code}_status`]: 3,
                    [`${this.code}_les_guid`]: "",
                    [`${this.code}_title`]: "",
                    [`${this.code}_description`]: "",
                    [`${this.code}_link`]: "",
                    [`${this.code}_blank`]: "y"
                }
                this.groupData = {}
                var langs = _.map(this.langList,lang=>lang.les_guid)
                this.modalData.langs = langs
                this.modalData.langList = this.langList

                _.each(this.langList,lang=>{
                    this.groupData[lang.les_guid] = _.assign({},{
                        type: this.modalData.type,
                        option: this.modalData.option,
                        label: this.modalData.label,
                        display: this.modalData.display,
                        value: this.modalData.value,
                        errMsg: this.modalData.errMsg
                    })

                    this.groupData[lang.les_guid].display = {
                        [`group_file_img`]: true,
                        [`group_pick_file`]: true,
                        [`${this.code}_title`]: true,
                        [`${this.code}_description`]: true,
                        [`${this.code}_link`]: true,
                    }

                    this.groupData[lang.les_guid].value = {
                        [`group_file_img`]: "",
                        [`group_pick_file`]: "",
                        [`${this.code}_title`]: "",
                        [`${this.code}_description`]: "",
                        [`${this.code}_link`]: ""
                    }

                })

            },
            modifyReady(data,groupData) {
                console.log(data)
                console.log(groupData)
                this.modalInit()
                this.modalData.title = "修改廣告輪播"
                this.modalData.id = data[`${this.code}_guid`]
                this.modalData.value = {
                    [`${this.code}_guid`]: data[`${this.code}_guid`],
                    [`${this.code}_blank`]: data[`${this.code}_blank`],
                    [`${this.code}_status`]: data[`${this.code}_status`],
                }
//                var target = _.find(this.tableData.list,{files_guid: data[`${this.code}_files_guid`]})
//                var path = this.host + target.files_folder + "/" +target.group_file_img
//                this.modalData.value[`group_file_img`] = path
                this.modalData.display = {
                    [`${this.code}_status`]: true,
                    [`${this.code}_blank`]: true
                }

                this.groupData = {}
                var langs = _.map(this.langList,lang=>lang.les_guid)
                this.modalData.langs = langs
                this.modalData.langList = this.langList

                _.each(this.langList,lang=>{
                    this.groupData[lang.les_guid] = _.assign({},{
                        type: this.modalData.type,
                        option: this.modalData.option,
                        label: this.modalData.label,
                        display: this.modalData.display,
                        value: this.modalData.value,
                        errMsg: this.modalData.errMsg
                    })

                    this.groupData[lang.les_guid].display = {
                        [`group_file_img`]: true,
                        [`group_pick_file`]: true,
                        [`${this.code}_title`]: true,
                        [`${this.code}_description`]: true,
                        [`${this.code}_link`]: true,
                    }

                    var imgPath = this.host + groupData[lang.les_guid][`files_folder`] + "/" + groupData[lang.les_guid][`files_name`]
                    var imgID = groupData[lang.les_guid][`files_guid`]

                    this.groupData[lang.les_guid].value = {
                        [`group_file_img`]: groupData[lang.les_guid][`files_name`] ? imgPath : "",
                        [`files_guid`]: groupData[lang.les_guid][`files_guid`] ? imgID : "",
                        [`group_pick_file`]: "",
                        [`${this.code}_title`]: groupData[lang.les_guid][`${this.groupCode}_title`],
                        [`${this.code}_description`]: groupData[lang.les_guid][`${this.groupCode}_description`],
                        [`${this.code}_link`]: groupData[lang.les_guid][`${this.groupCode}_link`]
                    }

                })

            },
            createSubmit(_mainData,_groupData) {
                var mainData = {
                    [`${this.code}_status`]: _mainData[`${this.code}_status`],
                    [`${this.code}_blank`]: _mainData[`${this.code}_blank`],
                }

                var group = _.mapValues(_groupData,(val)=>{
                    return val.value
                })

                console.log(group)

                var groupData = _.mapValues(group,vals=>{
                    var data = {}
                    data["agp_title"] = vals[`${this.code}_title`]
                    data["agp_link"] = vals[`${this.code}_link`]
                    data["agp_description"] = vals[`${this.code}_description`]
                    data["files_guid"] = vals["files_guid"]
                    return data
                })

                var data = _.assign({},mainData,groupData)

                this.api.setting(this.subject,'postNew',data).then(res=>{
                    if(res.code===0){
                        this.closeModal()
                        swal("新增成功！").then(()=> this.dataReload())
                    }else{
                        this.handleError(res)
                    }
                })
            },
            modifySubmit(_mainData, _groupData) {
                var mainData = {
                    [`${this.code}_guid`]: _mainData[`${this.code}_guid`],
                    [`${this.code}_status`]: _mainData[`${this.code}_status`],
                    [`${this.code}_blank`]: _mainData[`${this.code}_blank`],
                }

                var group = _.mapValues(_groupData,(val)=>{
                    return val.value
                })

                var groupData = _.mapValues(group,vals=>{
                    var data = {}
                    data["agp_title"] = vals[`${this.code}_title`]
                    data["agp_link"] = vals[`${this.code}_link`]
                    data["agp_description"] = vals[`${this.code}_description`]
                    data["files_guid"] = vals["files_guid"]
                    return data
                })

                var data = _.assign({},mainData,groupData)
                console.log(data)
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


