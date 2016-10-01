<template>
    <div class="table-responsive">
        <!--{{testTableData|json}}-->
        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th v-for="(key,val) in testTableData.columns" v-if="testTableData.display[key]">{{val}}</th>
                <th>{{testTableData.controller.title}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in testTableData.list">
                <td v-for="(key,val) in testTableData.columns" v-if="testTableData.display[key]">
                    <span v-if="!testTableData.filter[key]">{{item[key]}}</span>
                    <span v-if="testTableData.filter[key]==='status'">{{item[key] | status}}</span>
                    <span v-if="testTableData.filter[key]==='date'">{{item[key] | myDate}}</span>
                    <span v-if="testTableData.filter[key]==='edit'">{{item[key] | allowEdit}}</span>
                </td>
                <td v-if="!allow(item[code+'_specific'])" class="text-muted">(不可修改)</td>
                <td v-if="allow(item[code+'_specific'])">
                    <button class="btn btn-default btn-xs" type="button" v-if="permissionBtn.edit" @click="onModify(item.id)">修改</button>
                    <button class="btn btn-danger btn-xs" type="button" v-if="permissionBtn.del" @click="onDelete(item.id)">刪除</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    import filterMixin from '../../mixins/filterMixin'
    export default {
        mixins: [filterMixin],
        props: ['code','test-table-data','permission','permissionBtn','onModify','onDelete'],
        methods: {
            allow(specific) {
                return specific===undefined || specific==='CUSTOM'
            }
        }
    }
</script>

<style lang="stylus">
    .table > tbody > tr > td
        .btn
            margin-right: 5px
            &:last-of-type
                margin-right: 0
</style>

