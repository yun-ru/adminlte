<template>
    <form class="form-horizontal" novalidate>
        <div class="form-group" v-for="(labelKey,isActive) in modalData.display" :class="{'has-error':modalData.errMsg[labelKey]}">
            <label class="col-sm-2 control-label">{{modalData.label[labelKey]}}</label>
            <div class="col-sm-10">
                <template v-if="modalData.type[labelKey]==='radio'">
                    <label class="radio-inline" v-for="opt in modalData.option[labelKey]">
                        <input type="radio" v-model="modalData.value[labelKey]" :value="opt.value" :name="labelKey"> {{opt.label}}
                    </label>
                </template>
                <input v-if="modalData.type[labelKey]==='text'" type="text" class="form-control" :placeholder="modalData.label[labelKey]" v-model="modalData.value[labelKey]">
                <p v-if="modalData.type[labelKey]==='date'" class="form-control-static">{{modalData.value[labelKey] | my-date}}</p>
                <span v-if="modalData.errMsg[labelKey]" class="help-block">{{modalData.errMsg[labelKey]}}</span>
            </div>

        </div>
    </form>

</template>

<script>
    export default {
        props: ['modalData','formSubmit','formUpdate'],
        filters: {
            myDate(data) {
                return new Date(data*1000).toLocaleString()
            }
        }
    }
</script>
