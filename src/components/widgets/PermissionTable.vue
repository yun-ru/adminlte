<template>
    {{editMode? '編輯中':'xx'}}
    <div class="table-responsive">
        <form>
            <table class="table table-striped table-bordered">
                <thead>
                <tr>
                    <th></th>
                    <th v-for="role in tableData.roles">{{role.role_name_en}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in tableData.node">
                    <td>{{item.node_name_en}}</td>
                    <td v-for="rne in tableData.roleNode">{{rne.rne_status}}</td>
                    <td v-for="role in tableData.roles">
                        <input type="checkbox" name="role[]">
                    </td>
                </tr>
                </tbody>
            </table>
            <button type="button" class="btn btn-success" @click="editSubmit(data)">確認修改</button>
            <button type="button" class="btn btn-default">取消</button>
        </form>
    </div>

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
