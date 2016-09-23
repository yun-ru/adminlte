<template>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">{{modalItem.title}}</h4>
                </div>
                <div class="modal-body">
                    <modal-form :modal-item="modalItem" v-ref:modal-form></modal-form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-flat" @click="close">關閉</button>
                    <button type="button" class="btn btn-success btn-flat" @click="submit">確認送出</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ModalForm from './ModalForm.vue'
    export default {
        props: ['modalItem'],
        methods: {
            submit() {
                console.log(this.$refs.modalForm.formItems)
                var data = _.mapValues(this.$refs.modalForm.formItems,val=>val.value)
                this.modalItem.id ? this.$dispatch("onSubmitModify", data) : this.$dispatch("onSubmitNew", data)
            },
            close() {
                $('#myModal').modal("hide")
            }
        },
        components: {
            ModalForm
        }
    }
</script>
