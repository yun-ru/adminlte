<template>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="closeModal"><span>&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">{{modalData.title}}</h4>
                </div>
                <div class="modal-body">
                    <modal-form v-ref:modal-form :form-submit="formSubmit" :modal-data="modalData"></modal-form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-flat" @click="closeModal">關閉</button>
                    <button type="button" class="btn btn-success btn-flat" @click="formSubmit">確認送出</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ModalForm from './ModalForm.vue'
    export default {
        props: ['modalData'],
        methods: {
            formSubmit() {
//                var data = _.mapValues(this.$refs.modalForm.formInputs,val=>val.value)
//                this.modalData.id ? this.$dispatch("onSubmitModify", data) : this.$dispatch("onSubmitNew", data)
            },
            closeModal() {
                $('#myModal').modal("hide")
            }
        },
        components: {
            ModalForm
        }
    }
</script>
