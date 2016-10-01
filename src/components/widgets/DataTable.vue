<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th v-for="(key,val) in tableData.columns" v-if="tableData.display[key]">{{val}}</th>
                <th>{{tableData.controller.title}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in tableData.list">
                <!--<td v-if=""></td>-->
                <td :class="{img:tableData.filter[key]==='image'}" v-for="(key,val) in tableData.columns" v-if="tableData.display[key]">
                    <span v-if="!tableData.filter[key]">{{item[key]}}</span>
                    <span v-if="tableData.filter[key]==='type'">{{item[key] | type}}</span>
                    <span v-if="tableData.filter[key]==='status'">{{item[key] | status}}</span>
                    <span v-if="tableData.filter[key]==='date'">{{item[key] | myDate}}</span>
                    <span v-if="tableData.filter[key]==='edit'">{{item[key] | allowEdit}}</span>
                    <img v-if="tableData.filter[key]==='image'" :src="item[key] | showImg item" />
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
        props: ['code','tableData','permission','permissionBtn','onModify','onDelete'],
        methods: {
            allow(specific) {
                return specific===undefined || specific==='CUSTOM'
            }
        }
    }
</script>

<style lang="stylus">
    .table > tbody > tr > td
        &.img
            width: 100px
        vertical-align: middle
        img
            max-height: 100px
        .btn
            margin-right: 5px
            &:last-of-type
                margin-right: 0
</style>

