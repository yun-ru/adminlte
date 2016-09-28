<template>
    <form >
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                <tr>
                    <th></th>
                    <th v-for="role in tableData.roles">{{role.role_name_en}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(n_i,node) in tableData.nodes">
                    <th>{{node.node_name_en}}</th>
                    <td v-for="(r_i,role) in tableData.roles">
                        <p v-for="obj in tableData.crudList[n_i][r_i].init">
                            <label>{{obj.text}}
                                <input type="checkbox" :disabled="!editMode" :value="obj.value" v-model="tableData.crudList[n_i][r_i].crud" @change="onChange(node.node_guid,role.role_guid,tableData.crudList[n_i][r_i].crud)">
                            </label>
                            {{obj.value}}
                        </p>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    </form>

</template>

<script>
    import commonMixin from '../../mixins/commonMixin'

    export default {
        mixins: [commonMixin],
        props: ['tableData','editMode','editData','onChange'],
    }
</script>

<style lang="stylus">
    .table > tbody > tr > td
        p
            margin: 0
</style>
