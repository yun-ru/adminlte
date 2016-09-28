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
                            <a class="btn btn-sm btn-flat btn-warning" v-if="permissionBtn.edit && editMode" @click="onSubmit"><i class="fa fa-wrench"></i><span v-if="winType !== 'xs'">確認修改</span></a>
                        </div>
                    </div>
                </div>
                <div class="box-body">
                    <permission-table v-if="tableData" :table-data="tableData" :edit-mode="editMode" :edit-data="editData" :on-submit="onSubmit" :on-change="onChange"></permission-table>

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
                readyRoleNode: {},
                dataLabel: {
                    rne_id: ""
                }
            }
        },
        computed: {
            tableData() {
//                var srcData = this.editMode && this.editData? this.editData : this.resData
                var srcData = this.resData
                var roles = srcData.data.role
                var nodes = srcData.data.node
                var role_node = srcData.data.role_node
                var initCRUD = [
                    {text: "新增", value: 2, code: "C"},
                    {text: "讀取", value: 1, code: "R"},
                    {text: "修改", value: 4, code: "U"},
                    {text: "刪除", value: 8, code: "D"}
                ]
                function getInitCrud() {
                    return initCRUD
                }
                
                var getSumList = function(node,role) {
                    var target = _.find(role_node,{rne_node_guid: node.node_guid, rne_role_guid: role.role_guid})
                    var sumList = []
                    if(target){
                        var crud = (target.rne_crud >>> 0).toString(2)
                        _.each(crud,(t,i)=>{
                            if(t) sumList.push(initCRUD[i].value)
                        })
                    }
                    return sumList
                }
                var roleNodeList = _.map(nodes,node=>{
                    return _.map(roles,role=>{
                        return getSumList(node,role)
                    })
                })

                return {
                    roles,
                    nodes,
                    initCRUD,
                    getSumList,
                    roleNodeList
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
                this.resData = await this.api.assign('show')
            },
            dataReload() {
                this.loadData.call(this)
            },
            onEdit() {
                this.editMode = true
//                this.api.assign('edit').then(res=>{
//                    this.editData = res
//                })
            },
            onChange(node,role,crudItem) {

                console.log(crudItem)
                var nodeID = node.node_guid
                var roleID = role.role_guid

                if(!_.has(this.readyRoleNode,nodeID)) this.readyRoleNode[nodeID] = {}

                this.readyRoleNode[nodeID][roleID] = _.sum(crudItem)

            },
            onSubmit() {
                this.editMode = false
                var data = {}
                data.role_node = this.readyRoleNode
                console.log(data)

                this.api.assign("doEdit", data).then(res=>{
                    if(res.code===0){
                        swal("修改成功").then(()=>{
                            this.dataReload()
                        })

                    }else{
                        this.handleError(res)
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
