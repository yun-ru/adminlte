<template>
    {{newMsgItems | json}}
    <p v-for="item in newMsgItems">{{$key}} : {{item.msg}}</p>
    <form class="form-horizontal">
        <div class="form-group" v-for="item in formItems" v-if="item.display && modalItem.ready">
            <label class="col-sm-2 control-label">{{item.label}}</label>
            <div class="col-sm-10">
                <template v-if="item.type==='radio'">
                    <label class="radio-inline" v-for="opt in item.opt">
                        <input type="radio" v-model="item.value" :value="opt.value" :name="item.code"> {{opt.label}}
                    </label>
                </template>
                <input v-if="item.type==='text'" type="text" class="form-control" :placeholder="item.label" v-model="item.value">
                <p v-if="item.type==='static'" class="form-control-static">{{item.value}}</p>
                <span class="help-block">{{modalItem.errMsg[item.code]}}</span>
            </div>

        </div>
    </form>
</template>

<script>
    export default {
        props: ['modalItem'],
        data() {
            return {
                formItems: {}
            }
        },
        computed: {
            valueItems() {return _.mapValues(this.modalItem.value,val=>{ return {value: val} })},
            labelItems() {return _.mapValues(this.modalItem.label,val=>{ return {label: val} })},
            typeItems() {return _.mapValues(this.modalItem.type,val=>{ return {type: val} })},
            optItems() {return _.mapValues(this.modalItem.option,val=>{ return {opt: val} })},
            displayItems() {return _.mapValues(this.modalItem.display,val=>{ return {display: val} })}
        },
        ready() {
            this.$watch('modalItem',()=>{
                this.formItems = _.mapValues(_.merge(
                        this.valueItems,
                        this.labelItems,
                        this.typeItems,
                        this.optItems,
                        this.displayItems),
                        (val,key)=>{
                            val.code = key
                            return val
                        })
            })
            this.$watch('modalItem.errMsg',()=>{
                this.formUpdate()
            })
            this.$watch('modalItem.value',()=>{
                this.formUpdate()
            })


        },
        methods: {
            formUpdate() {
                this.formItems = _.mapValues(_.merge(
                        this.valueItems,
                        this.labelItems,
                        this.typeItems,
                        this.optItems,
                        this.displayItems),
                        (val,key)=>{
                            val.code = key
                            return val
                        })
            }
        }
    }
</script>
