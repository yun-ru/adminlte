<template>
    <div class="box box-success">
        <div class="box-header with-border">
            <div class="btn-group pull-left">
                <a @click="goBack" class="btn btn-sm btn-default btn-flat"><i class="fa fa-arrow-left"></i><span v-if="winType !== 'xs'">返回</span></a>
                <a @click="update" class="btn btn-sm btn-default btn-flat"><i class="fa fa-undo"></i><span v-if="winType !== 'xs'">重新整理</span></a>
                <a @click="setting" class="btn btn-sm btn-default btn-flat"><i class="fa fa-wrench"></i><span v-if="winType !== 'xs'">設定</span></a>
            </div>

            <a @click="openModal" class="btn btn-sm btn-success btn-flat pull-right"><i class="fa fa-plus"></i><span v-if="winType !== 'xs'">新增項目</span></a>
        </div><!-- /.box-header -->
        <div class="box-body">
            <slot name="main"></slot>
        </div><!-- /.box-body -->
        <div v-if="loading" class="overlay" transition>
            <i class="fa fa-refresh fa-spin"></i>
        </div>

    </div><!-- /.box -->

</template>

<script>
    import rwd from '../../mixins/rwd'
    export default {
        mixins: [rwd],
        data() {
            return {

            }
        },
        props: {
            'title': String
        },
        methods: {
            openModal() {
                this.$dispatch("open-modal")
            },
            setting() {

            },
            update() {

            },
            goBack() {

            }
        },
        created() {
        }
    }
</script>

<style lang="stylus">
    div.table-responsive > div.dataTables_wrapper > div.row > div[class^="col-"]
        padding: 0
    .btn > span
        margin-left: 8px

</style>
