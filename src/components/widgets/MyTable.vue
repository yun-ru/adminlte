<template>
    <div class="table-responsive">
        <table id="example" class="table table-striped table-bordered">
            <thead>
            <tr>
                <th v-for="item in tableData.columns">{{item.title}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in tableData.data" track-by="$index">
                <td v-for="subItem in item.tds" track-by="$index">{{subItem}}</td>
                <td>
                    <button class="btn btn-default btn-xs" type="button" v-if="permission[1]-0" @click="onModify(item.id)">修改</button>
                    <button class="btn btn-danger btn-xs" type="button" v-if="permission[3]-0" @click="onDelete(item.id)">刪除</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props: ['table-data','permission','onModify','onDelete']
    }
</script>

