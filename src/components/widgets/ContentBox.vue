<template>
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{title}} {{$route.params.level}}</h3>
            <div class="box-tools pull-right">
            </div>
        </div><!-- /.box-header -->
        <div class="box-body">
            <slot name="main"></slot>
        </div><!-- /.box-body -->
        <div v-if="loading" class="overlay" transition>
            <i class="fa fa-refresh fa-spin"></i>
        </div>

        <div class="box-footer clearfix">
            <slot name="footer"></slot>
        </div><!-- /.box-footer -->
    </div><!-- /.box -->

</template>

<script>
    export default {
        props: {
            'title': String
        }
    }
</script>
