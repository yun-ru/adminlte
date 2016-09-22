<template>
    <div class="table-responsive">
        <table id="example" class="table table-striped table-bordered">
            <thead>
            <tr>
                <th v-for="item in tableContent.columns">{{item.title}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in tableContent.data" track-by="$index">
                <td v-for="subItem in item" track-by="$index">{{subItem}}</td>
                <td>
                    <button class="btn btn-default btn-xs" type="button" v-if="permission[1]-0" @click="onModify">修改</button>
                    <button class="btn btn-danger btn-xs" type="button" v-if="permission[3]-0" :data-id="item.ccy_guid">刪除</button>
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
        created() {
        },
        ready() {
            this.$dispatch("tableOk")
        },
        props: ['table-content','permission'],
        methods: {
            onModify() {
                this.$dispatch("onModify",999)
            }
        },
        events: {
            onReady() {
                console.log("my table get ready!")
            }
        }
    }
</script>

