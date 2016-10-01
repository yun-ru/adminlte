<template>

    <div>
        <content-header v-if="resData" :breadcrumb="breadcrumb"></content-header>
        <!--<content-body v-if="resData"-->
                      <!--:code="code"-->
                      <!--:permission="permission"-->
                      <!--:table-data="tableData"-->
                      <!--:test-table-data="testTableData"-->
                      <!--:data-reload="dataReload"-->
                      <!--:on-modify="onModify"-->
                      <!--:on-create="onCreate"-->
                      <!--:on-delete="onDelete"-->
                      <!--:pagination="pagination"-->
                      <!--:data-label="dataLabel"-->
                      <!--:change-page="changePage"-->
        <!--&gt;</content-body>-->
        <section class="content" v-if="resData">
            <div class="box box-success">
                <div class="box-header with-border">
                    <div class="controller">
                        <div class="btn-group pull-left">
                            <a class="btn btn-sm btn-default btn-flat"><i class="fa fa-arrow-left"></i><span v-if="winType !== 'xs'">返回</span></a>
                            <a class="btn btn-sm btn-default btn-flat" @click="dataReload"><i class="fa fa-undo"></i><span v-if="winType !== 'xs'">更新</span></a>
                            <a class="btn btn-sm btn-success btn-flat" @click="onCreate"><i class="fa fa-plus"></i><span v-if="winType !== 'xs'">新增</span></a>
                        </div>
                    </div>
                </div>
                <div class="box-body">
                    <form id="myForm">
                        <img :src="image" />
                        <input name="file_upload" type="file" @change="onFileChange">
                        <button class="btn btn-default" @click.prevent="fileUpload">上傳圖片</button>
                    </form>

                    {{imgRes|json}}


                    <!--<form id="uploadForm" >-->
                        <!--<input id="file" type="file" name="file_upload"/>-->
                        <!--<button type="button" @click="testClick">upload</button>-->
                    <!--</form>-->


                    <test-table v-if="permission" :code="code" :test-table-data="testTableData" :permission="permission" :on-modify="onModify" :on-delete="onDelete"></test-table>
                    <pagination v-if="pagination" :pagination="pagination" :data-label="dataLabel" :change-page="changePage"></pagination>
                </div>
            </div>
        </section>


        <Modal :modal-data="modalData" :form-submit="formSubmit" :close-modal="closeModal"></Modal>
    </div>

</template>

<script>
    import ContentHeader from '../../widgets/ContentHeader.vue'
    import ContentBody from '../../widgets/ContentBody.vue'
    import Modal from '../../widgets/Modal.vue'
    import TestTable from '../../widgets/TestTable.vue'
    import Pagination from '../../widgets/Pagination.vue'
    import tableMixin from '../../../mixins/tableMixin'
    import commonMixin from '../../../mixins/commonMixin'
    import apiMixin from '../../../mixins/apiMixin'

    export default {
        data () {
            return {
                resData: null,
                imgRes: null,
                subject: "theme",
                code: "tme",
                modalData: {},
                imgFile: null,
                image: "",
                newInput: { name: '', image: ''},
                dataLabel: {
                    tme_status: "狀態",
                    tme_name_zh_TW: "繁中名稱",
                    tme_name_zh_CN: "簡中名稱",
                    tme_name_en: "英文名稱",
                    tme_code: "代碼",
                    tme_udate: "更新時間",
                    tme_add_date: "新增時間",
                    tme_guid: "ID",
                    tme_id: "_ID"
                }
            }
        },
        computed: {
            pagination() {
                return this.resData.data.paginator
            },
            breadcrumb() {
                return _.map(this.resData.data.breadcrumb,item=>{
                    return {text: item.node_name_zh_TW,link: item.node_route}
                })
            },
            permission() {
                return (this.resData.data.permission >>> 0).toString(2)
            },
            testTableData() {
                var list = this.resData.data.list.map(item=>{return {...item, id: item[this.code+'_guid']}})
                var columns = this.dataLabel
                var display = {
                    tme_status: true,
                    tme_name_zh_TW: true,
                    tme_name_zh_CN: true,
                    tme_name_en: true,
                    tme_code: true,
                    tme_udate: true,
                    tme_add_date: false
                }

                var filter = {
                    tme_status: "status",
                    tme_udate: "date",
                    tme_add_date: "date"
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
        components: {
            ContentHeader,
            ContentBody,
            Modal,
            Pagination,
            TestTable
        },
        methods: {
            onFileChange(e){
                this.imgFile = e.target.files[0]
                var reader = new FileReader();
                reader.onload = ()=>{
                    this.image = reader.result
                }
                reader.readAsDataURL(this.imgFile)
            },
            fileUpload() {
                var myForm = $("#myForm")[0]
                var formData = new FormData(myForm);

                this.api.upload(formData).then(res=>{
                    if(res.code===0) {
                        this.imgRes = res
                    }else{
                        this.handleError(res)
                    }
                })

            },
            dataReload() {
                this.api.setting(this.subject,"getList").then(res=>{
                    if(res.code===0) {
                        this.resData = res
                    }else{
                        this.handleError(res)
                    }
                })
            },
            onCreate() {
                this.createReady()
                this.openModal()
            },
            onModify(id) {
                this.api.setting(this.subject,"getItem",{tme_guid: id}).then(res=>{
                    if(res.code===0){
                        this.modifyReady(res.data.currency)
                        this.openModal()
                    }else{
                        this.handleError(res)
                    }
                })
            },
            onDelete(id) {
                swal({
                    title: '確認刪除?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '刪除',
                    cancelButtonText: '取消',
                }).then(()=> {
                    this.api.setting(this.subject, 'delItem', {tme_guid: id}).then(res=>{
                        if(res.code===0){
                            swal("刪除成功！").then(()=> this.dataReload())
                        }else{
                            this.handleError(res)
                        }
                    })
                }, (dismiss)=> {
                    if (dismiss === 'cancel') {
                        swal('刪除已取消');
                    }
                });

            },
            modifyReady(data) {
                this.modalInit()
                this.modalData.title = "修改幣別項目"
                this.modalData.id = data.tme_guid
                this.modalData.value = data
                this.modalData.display = {
                    tme_status: true,
                    tme_name_zh_TW: true,
                    tme_name_zh_CN: true,
                    tme_name_en: true,
                    tme_code: true,
                    tme_udate: true,
                    tme_add_date: true
                }
            },
            createSubmit(_data) {
                var data = {
                    tme_status: _data.tme_status,
                    tme_name_zh_TW: _data.tme_name_zh_TW,
                    tme_name_zh_CN: _data.tme_name_zh_CN,
                    tme_name_en: _data.tme_name_en,
                    tme_code: _data.tme_code
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
                    tme_guid: this.modalData.id,
                    tme_status: _data.tme_status,
                    tme_name_zh_TW: _data.tme_name_zh_TW,
                    tme_name_zh_CN: _data.tme_name_zh_CN,
                    tme_name_en: _data.tme_name_en,
                    tme_code: _data.tme_code
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
                        tme_status: "radio",
                        tme_name_zh_TW: "text",
                        tme_name_zh_CN: "text",
                        tme_name_en: "text",
                        tme_code: "text",
                        tme_udate: "date",
                        tme_add_date: "date",
                        tme_guid: "static"
                    },
                    option: {
                        tme_status: [
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
                    tme_status: true,
                    tme_name_zh_TW: true,
                    tme_name_zh_CN: true,
                    tme_name_en: true,
                    tme_code: true,
                }
                this.modalData.value = {
                    tme_status: 3,
                    tme_name_zh_TW: "",
                    tme_name_zh_CN: "",
                    tme_name_en: "",
                    tme_code: ""
                }

            },
            formSubmit() {
                var data = this.modalData.value
                this.modalData.id ? this.modifySubmit(data) : this.createSubmit(data)
            }
        },
        mixins: [tableMixin, commonMixin, apiMixin]
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
    img
        width: 30%
        margin: auto
        display: block
        margin-bottom: 10px

</style>
