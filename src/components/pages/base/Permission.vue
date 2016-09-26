<template>

    <div>
        <content-header v-if="resData" :breadcrumb="breadcrumb"></content-header>
        <section class="content" v-if="resData">
            <div class="box box-success">
                <div class="box-header with-border">
                    <div class="controller" v-if="permission">
                        <div class="btn-group pull-left">
                            <a class="btn btn-sm btn-default btn-flat"><i class="fa fa-arrow-left"></i><span v-if="winType !== 'xs'">返回</span></a>
                            <a class="btn btn-sm btn-default btn-flat" @click="dataReload"><i class="fa fa-undo"></i><span v-if="winType !== 'xs'">更新</span></a>
                            <a class="btn btn-sm btn-flat btn-success" v-if="permissionBtn.edit && !editMode" @click="onEdit"><i class="fa fa-wrench"></i><span v-if="winType !== 'xs'">編輯</span></a>
                            <a class="btn btn-sm btn-flat btn-warning" v-if="permissionBtn.edit && editMode" @click="offEdit"><i class="fa fa-wrench"></i><span v-if="winType !== 'xs'">編輯中</span></a>
                        </div>
                    </div>
                </div>
                <div class="box-body">
                    <permission-table v-if="tableData" :table-data="tableData" :edit-mode="editMode" :edit-data="editData" :edit-submit="editSubmit"></permission-table>

                </div>
                <!--<div v-if="loading" class="overlay" transition>-->
                <!--<i class="fa fa-refresh fa-spin"></i>-->
                <!--</div>-->

            </div>
        </section>

    </div>

</template>

<script>
    import ContentHeader from '../../widgets/ContentHeader.vue'
    import PermissionTable from '../../widgets/PermissionTable.vue'
    import tableMixin from '../../../mixins/tableMixin'
    import commonMixin from '../../../mixins/commonMixin'
    import apiMixin from '../../../mixins/apiMixin'

    export default {
        data () {
            return {
                resData: null,
                editData: null,
                code: "rne",
                editMode: false,
                dataLabel: {
                    rne_id: ""
                }
            }
        },
        computed: {
            tableData() {
                var roles = this.resData.data.role
                var node = this.resData.data.node
                var roleNode = this.resData.data.role_node
                var getRoleNode = (role_guid)=> {

                    var targetNode =  _.filter(roleNode,item=>{
                        return item.rne_role_guid===role_guid
                    })
                    return targetNode.rne_status || ""

                }

                return {
                    roles,
                    node,
                    getRoleNode
                }
            },
            breadcrumb() {
                return _.map(this.resData.data.breadcrumb, item=> {
                    return {text: item.node_name_zh_TW, link: item.node_route}
                })
            },
            permission() {
                return (this.resData.data.permission >>> 0).toString(2)
            },
        },
        ready() {
            this.dataReload()
        },
        components: {
            ContentHeader,
            PermissionTable
        },
        methods: {
            async loadData() {
                this.resData = await this.api.assignShow()
            },
            dataReload() {
                this.loadData.call(this)
            },
            onEdit() {
                this.editMode = true
                this.api.assignEdit().then(res=>{
                    this.editData = res
                })
            },
            offEdit() {
                this.editMode = false
            },
            editSubmit(data) {
                this.api.assignEditSubmit(data).then(res=>{
                    if(res.code===0){

                    }else{

                    }
                })
            }
        },
        mixins: [commonMixin, apiMixin]
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
