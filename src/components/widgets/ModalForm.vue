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

        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab_1" data-toggle="tab">Tab 1</a></li>
                <li><a href="#tab_2" data-toggle="tab">Tab 2</a></li>
                <li><a href="#tab_3" data-toggle="tab">Tab 3</a></li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        Dropdown <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
                        <li role="presentation" class="divider"></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
                    </ul>
                </li>
                <li class="pull-right"><a href="#" class="text-muted"><i class="fa fa-gear"></i></a></li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab_1">
                    <b>How to use:</b>

                    <p>Exactly like the original bootstrap tabs except you should use
                        the custom wrapper <code>.nav-tabs-custom</code> to achieve this style.</p>
                    A wonderful serenity has taken possession of my entire soul,
                    like these sweet mornings of spring which I enjoy with my whole heart.
                    I am alone, and feel the charm of existence in this spot,
                    which was created for the bliss of souls like mine. I am so happy,
                    my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
                    that I neglect my talents. I should be incapable of drawing a single stroke
                    at the present moment; and yet I feel that I never was a greater artist than now.
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_2">
                    The European languages are members of the same family. Their separate existence is a myth.
                    For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ
                    in their grammar, their pronunciation and their most common words. Everyone realizes why a
                    new common language would be desirable: one could refuse to pay expensive translators. To
                    achieve this, it would be necessary to have uniform grammar, pronunciation and more common
                    words. If several languages coalesce, the grammar of the resulting language is more simple
                    and regular than that of the individual languages.
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_3">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
        </div>
        <!-- nav-tabs-custom -->

        <div>
            <div class="btn-group">
                <label class="btn btn-default btn-flat" :class="{active: lang.les_guid=== langTab}" v-for="lang in modalData.langList">
                    <input type="radio" autocomplete="off" :value="lang.les_guid" v-model="langTab"> {{lang.les_name_zh_TW}}
                </label>
            </div>

            <div class="form-group" v-if="isActive" v-for="(labelKey,isActive) in vals.display" :class="{'has-error':vals.errMsg[labelKey]}">
                <label class="col-sm-2 control-label">{{vals.label[labelKey]}}</label>
                <div class="col-sm-10">
                    <template v-if="vals.type[labelKey]==='tab'">
                        <div class="btn-group" data-toggle="buttons">
                            <label class="btn btn-primary active" v-for="opt in vals.option[labelKey]">
                                <input type="radio" autocomplete="off" v-model="vals.value[labelKey]" :value="opt.value" :name="labelKey"> {{opt.label}}
                            </label>
                        </div>
                    </template>
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
                this.langTab = this.modalData.langs[0]
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
        .btn-group
            margin: 20px 0
            width: 100%
            display: flex
            justify-content: center
            input[type='radio']
                display: none
</style>
