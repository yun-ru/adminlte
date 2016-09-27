<template>
    <form >
        {{editMode? '編輯中':'xx'}}
        <div class="table-responsive">

        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th></th>
                <th v-for="role in tableData.roles">{{role.role_name_en}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="node in tableData.nodes">
                <td>{{node.node_name_en}}</td>
                <td v-for="role in tableData.roles">
                    {{tableData.getRoleNode(node.node_guid,role.role_guid)}}
                    <input type="checkbox" name="role[node.node_guid][role.role_guid]" value="[4]">
                    <input type="checkbox" name="role[node.node_guid][role.role_guid]" value="[1]">
                    <input type="checkbox" name="role[node.node_guid][role.role_guid]" value="[2]">
                    <input type="checkbox" name="role[node.node_guid][role.role_guid]" value="[8]">
                </td>
            </tr>
            </tbody>
        </table>

        </div>
        <button type="button" class="btn btn-success" @click="editSubmit(data)">確認修改</button>
        <button type="button" class="btn btn-default">取消</button>
    </form>

</template>

<script>

    export default {
        data() {
            return {
                data: {test:123}
            }
        },
        props: ['tableData','editMode','editData','editSubmit'],
    }
</script>
