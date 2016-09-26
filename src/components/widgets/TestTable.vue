<template>
    <div class="table-responsive">
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
                </td>
                <td>
                    <button class="btn btn-default btn-xs" type="button" v-if="permission[1]-0" @click="onModify(item.ccy_guid)">修改</button>
                    <button class="btn btn-danger btn-xs" type="button" v-if="permission[3]-0" @click="onDelete(item.ccy_guid)">刪除</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    import commonMixin from '../../mixins/commonMixin'
    export default {
        mixins: [commonMixin],
        data () {
            return {

            }
        },
        props: ['test-table-data','permission','onModify','onDelete']
    }
</script>

<style lang="stylus">
    .table > tbody > tr > td
        .btn
            margin-right: 5px
            &:last-of-type
                margin-right: 0
</style>

