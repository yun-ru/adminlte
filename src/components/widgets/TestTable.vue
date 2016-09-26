<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th v-for="(key,val) in testTableData.columns" v-if="testTableData.display[key]">{{val}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in testTableData.list">
                <td v-for="(key,val) in testTableData.columns" v-if="testTableData.display[key]">
                    <span v-if="!testTableData.filter[key]">{{item[key]}}</span>
                    <span v-if="testTableData.filter[key]==='status'">{{item[key] | status}}</span>
                    <span v-if="testTableData.filter[key]==='date'">{{item[key] | myDate}}</span>
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
        props: ['test-table-data','permission','onModify','onDelete']
    }
</script>

