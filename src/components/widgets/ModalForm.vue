<template>
    <form id="form" class="form-horizontal" novalidate>
        <div class="form-group" v-if="isActive" v-for="(labelKey,isActive) in modalData.display" :class="{'has-error':modalData.errMsg[labelKey]}">
            <label class="col-sm-2 control-label">{{modalData.label[labelKey]}}</label>
            <div class="col-sm-10">
                <template v-if="modalData.type[labelKey]==='select'">
                    <select class="form-control" v-model="modalData.value[labelKey]">
                        <option value="">請選擇</option>
                        <option v-for="opt in modalData.option[labelKey]" type="radio" :value="opt.value" :name="labelKey">{{opt.label}}</option>
                    </select>
                </template>
                <template v-if="modalData.type[labelKey]==='radio'">
                    <label class="radio-inline" v-for="opt in modalData.option[labelKey]">
                        <input type="radio" v-model="modalData.value[labelKey]" :value="opt.value" :name="labelKey"> {{opt.label}}
                    </label>
                </template>
                <img v-if="modalData.type[labelKey]==='image'" :src="modalData.value[labelKey]">
                <input v-if="modalData.type[labelKey]==='file'" type="file" class="form-control" name="file_upload" v-model="modalData.value[labelKey]" @change="onFileChange">
                <input v-if="modalData.type[labelKey]==='text'" type="text" class="form-control" :placeholder="modalData.label[labelKey]" v-model="modalData.value[labelKey]">
                <p v-if="modalData.type[labelKey]==='date'" class="form-control-static">{{modalData.value[labelKey] | my-date}}</p>
                <span v-if="modalData.errMsg[labelKey]" class="help-block">{{modalData.errMsg[labelKey]}}</span>
            </div>

        </div>

    </form>

    <form :id="langID" class="form-horizontal" novalidate v-for="(langID, vals) in localGroupData" v-show="langTab===langID" keep-alive>
        <div>
            <label class="radio-inline" v-for="lang in modalData.langList">
                <input type="radio" :value="lang.les_guid" v-model="langTab"> {{lang.les_name_zh_TW}}
            </label>
            <br><br>
            <div class="form-group" v-if="isActive" v-for="(labelKey,isActive) in vals.display" :class="{'has-error':vals.errMsg[labelKey]}">
                <label class="col-sm-2 control-label">{{vals.label[labelKey]}}</label>
                <div class="col-sm-10">
                    <template v-if="vals.type[labelKey]==='select'">
                        <select class="form-control" v-model="vals.value[labelKey]">
                            <option value="">請選擇</option>
                            <option v-for="opt in vals.option[labelKey]" type="radio" :value="opt.value" :name="labelKey">{{opt.label}}</option>
                        </select>
                    </template>
                    <template v-if="vals.type[labelKey]==='radio'">
                        <label class="radio-inline" v-for="opt in vals.option[labelKey]">
                            <input type="radio" v-model="vals.value[labelKey]" :value="opt.value" :name="labelKey"> {{opt.label}}
                        </label>
                    </template>
                    <img v-if="vals.type[labelKey]==='image'" :src="vals.value[labelKey]">
                    <input v-if="vals.type[labelKey]==='file'" type="file" class="form-control" name="file_upload" v-model="vals.value[labelKey]" @change="onGroupFileChange(langID)">
                    <input v-if="vals.type[labelKey]==='text'" type="text" class="form-control" :placeholder="vals.label[labelKey]" v-model="vals.value[labelKey]">
                    <p v-if="vals.type[labelKey]==='date'" class="form-control-static">{{vals.value[labelKey] | my-date}}</p>
                    <span v-if="vals.errMsg[labelKey]" class="help-block">{{vals.errMsg[labelKey]}}</span>
                </div>

            </div>
        </div>
    </form>

</template>

<script>
    import filterMixin from '../../mixins/filterMixin'
    export default {
        mixins: [filterMixin],
        data() {
            return {
                langTab: "",
//                tw: {},
//                cn: {},
//                en: {},
                localGroupData: {}
            }
        },
        watch: {
            groupData(val) {
                this.langTab = this.modalData.langs[2]
                this.localGroupData = _.assign({},val)
//                this.tw = _.assign({},val[this.modalData.langs[0]],{title: "繁體中文"})
//                this.cn = _.assign({},val[this.modalData.langs[1]],{title: "簡體中文"})
//                this.en = _.assign({},val[this.modalData.langs[2]],{title: "英文"})
            }
        },
        props: ['modalData','groupData','formSubmit','formUpdate','onFileChange','onGroupFileChange']
    }
</script>

<style lang="stylus">
    form
        .form-group
            img
                max-height: 100px
</style>
