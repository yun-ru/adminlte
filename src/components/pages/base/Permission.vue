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

                            <a class="btn btn-sm btn-flat btn-success" v-if="!editMode" @click="onEdit"><i class="fa fa-wrench"></i><span v-if="winType !== 'xs'">編輯</span></a>
                            <a class="btn btn-sm btn-flat btn-warning" v-else @click="onSubmit"><i class="fa fa-wrench"></i><span v-if="winType !== 'xs'">確認修改</span></a>
                        </div>
                    </div>
                </div>
                <div class="box-body">
                    {{per|json}}
                    <permission-table v-if="tableData"
                                      :table-data="tableData"
                                      :edit-mode="editMode"
                                      :edit-data="editData"
                                      :on-submit="onSubmit"
                                      :on-change="onChange"
                                      :permission-btn="permissionBtn"
                    ></permission-table>

                </div>
                <!--<div v-if="loading" class="overlay" transition>-->
                <!--<i class="fa fa-refresh fa-spin"></i>-->
                <!--</div>-->

            </div>
        </section>

    </div>

</template>

<script>
    import PermissionTable from '../../widgets/PermissionTable.vue'
    import commonMixin from '../../../mixins/commonMixin'
    import apiMixin from '../../../mixins/apiMixin'

    export default {
        data () {
            return {
                resData: null,
                editData: null,
                code: "rne",
                editMode: false,
                nextRoleNode: {}
            }
        },
        computed: {
            prevRoleNode() {
                var roleNode = {}
                _.each(this.resData.data.role_node,(t,i)=>{
                    if(!_.has(roleNode,t.rne_node_guid)) roleNode[t.rne_node_guid] = {}
                    roleNode[t.rne_node_guid][t.rne_role_guid] = t.rne_crud
                })
                return roleNode
            },
            tableData() {
//                var srcData = this.editMode && this.editData? this.editData : this.resData
                var srcData = this.resData
                var roles = srcData.data.role
                var nodes = srcData.data.node
                var role_node = srcData.data.role_node

                var getSumList = function(node,role) {
                    var target = _.find(role_node,{rne_node_guid: node.node_guid, rne_role_guid: role.role_guid})

                    return target ? this.toCrudList(target.rne_crud) : []

                }
                var roleNodeList = _.map(nodes,node=>{
                    return _.map(roles,role=>{
                        return getSumList.call(this,node,role)
                    })
                })

                return {
                    roles,
                    nodes,
                    initCRUD: this.initCRUD,
                    roleNodeList,
                    roleNode: this.prevRoleNode
                }
            }
        },
        ready() {
            this.dataReload()
        },
        components: {
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
                this.nextRoleNode = _.extend(this.prevRoleNode)
            },
            onChange(node,role,crudItem,e) {

                console.log(crudItem)
                var nodeID = node.node_guid
                var roleID = role.role_guid

                if(!_.has(this.nextRoleNode,nodeID)) this.nextRoleNode[nodeID] = {}
                this.nextRoleNode[nodeID][roleID] = _.sum(crudItem)

            },
            onSubmit() {


                if(this.nextRoleNode === this.prevRoleNode) console.log("same")

                var data = {}
                data.role_node = this.nextRoleNode
                console.log(data)

                this.api.assign("doEdit", data).then(res=>{
                    if(res.code===0){
                        this.editMode = false
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
