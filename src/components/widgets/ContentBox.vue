<template>
    <div class="box box-success">
        <div class="box-header with-border">
            <slot name="controller"></slot>
        </div><!-- /.box-header -->
        <div class="box-body">
            <slot name="main"></slot>
            <slot name="pagination"></slot>
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
    .box-body
        padding: 20px 12px

</style>
