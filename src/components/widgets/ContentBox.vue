<template>
    <h3>{{winType}} ({{winW}})</h3>
    <div class="box box-success">
        <div class="box-header with-border">
            <div class="btn-group pull-left">
                <a @click="goBack" class="btn btn-sm btn-default btn-flat"><i class="fa fa-arrow-left"></i>返回</a>
                <a @click="update" class="btn btn-sm btn-default btn-flat"><i class="fa fa-undo"></i>重新整理</a>
                <a @click="setting" class="btn btn-sm btn-default btn-flat"><i class="fa fa-wrench"></i>設定</a>
            </div>

            <a @click="openModal" class="btn btn-sm btn-success btn-flat pull-right"><i class="fa fa-plus"></i>新增項目</a>
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
    import RWD from '../../utils/rwd'
    export default {
        data() {
            return {
                winW: 100,
                winType: ""
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
            RWD.call(this)
        }
    }
</script>

<style lang="stylus">
    .btn > i.fa
        margin-right: 8px

</style>
