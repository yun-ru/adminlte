<template>
    <div class="btnWrap" v-if="tableData.checkGroup.length>0">
        <button class="btn btn-danger btn-sm" type="button" v-if="CRUD.D" @click="onDelete(tableData.checkGroup)">刪除所選項目</button>
        <p v-else class="text-muted">(無批次處理項目或權限不足)</p>
    </div>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead>
            <tr class="bold">
                <th>
                    <input type="checkbox" v-model="tableData.selectAll" @change="checkSelectAll(tableData.selectAll)">
                </th>
                <th>#</th>
                <th v-for="(key,val) in tableData.columns" v-if="tableData.display[key]">{{val}}</th>
                <th>
                    {{tableData.controller.title}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in tableData.list">
                <td><input v-if="allow(item[code+'_specific'])" type="checkbox" v-model="tableData.checkGroup" :value="item.id"></td>
                <td class="bold">#{{$index+1}}</td>
                <td :class="{img:tableData.filter[key]==='image'}" v-for="(key,val) in tableData.columns" v-if="tableData.display[key]">
                    <span v-if="!tableData.filter[key]">{{item[key]}}</span>
                    <span v-if="tableData.filter[key]==='lang'">{{item[key] | lang}}</span>
                    <span v-if="tableData.filter[key]==='yes'">{{item[key] | yes}}</span>
                    <span v-if="tableData.filter[key]==='type'">{{item[key] | type}}</span>
                    <span v-if="tableData.filter[key]==='status'">{{item[key] | status}}</span>
                    <span v-if="tableData.filter[key]==='date'">{{item[key] | myDate}}</span>
                    <span v-if="tableData.filter[key]==='edit'">{{item[key] | allowEdit}}</span>
                    <img v-if="tableData.filter[key]==='image'" :src="item[key] | showImg item" />
                </td>
                <td v-if="!allow(item[code+'_specific'])" class="text-muted">(不可修改)</td>
                <td v-else>
                    <button class="btn btn-default btn-xs" type="button" v-if="CRUD.U" @click="onModify(item.id)">修改</button>
                    <button class="btn btn-danger btn-xs" type="button" v-if="CRUD.D" @click="onDelete(item.id)">刪除</button>
                    <p v-else class="text-muted">(權限不足)</p>
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
        props: ['code','tableData','permission','CRUD','onModify','onDelete','checkSelectAll'],
        methods: {
            allow(specific) {
                return specific===undefined || specific==='CUSTOM'
            }
        },
        filters:{
            lang(val) {
                var types = _.map(this.tableData.langList,item=>{
                    return {label: item.les_name_zh_TW, value: item.les_guid}
                })

                return _.find(types,{value: val})? _.find(types,{value: val}).label : "99"
            },
        }
    }
</script>

<style lang="stylus">
    .btnWrap
        margin-bottom: 10px
    .table tr
        > td, > th
            &.img
                width: 100px
            vertical-align: middle
            img
                max-height: 100px
            .btn
                margin-right: 5px
                &:last-of-type
                    margin-right: 0
            &.bold
                    font-weight: bold
            &:nth-child(1),
            &:nth-child(2)
                width: 40px
                text-align: center
</style>

