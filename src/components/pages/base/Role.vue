<template>

    <div class="content-wrapper">
        <content-header :title="title" :sub-title="subTitle">
            <template slot="breadcrumb">
                <li><i class="fa fa-users"></i> {{subject}}</li>
                <li class="active">{{title}}</li>
            </template>
        </content-header>
        <section class="content">

            <content-box :title="title" @open-modal="openModal">
                <div class="table-responsive" slot="main">
                    <data-table v-if="!loading" transition :data-content="dataContent"></data-table>
                </div>
            </content-box>

        </section>

        <Modal :title="title">
            <form class="form-horizontal" slot="main">
                <div class="form-group">
                    <label for="item01" class="col-sm-2 control-label">項目一</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="item01" placeholder="請輸入項目一">
                    </div>
                </div>
                <div class="form-group">
                    <label for="item02" class="col-sm-2 control-label">項目二</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="item02" placeholder="請輸入項目二">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">項目三</label>
                    <div class="col-sm-10">
                        <label class="checkbox-inline">
                            <input type="checkbox" value="option1"> 1
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="option2"> 2
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="option3"> 3
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">項目四</label>
                    <div class="col-sm-10">
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 3
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <select class="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle btn-flat" type="button" data-toggle="dropdown">
                                {{ selectItem }}
                                <span class="caret"></span></button>
                            <ul class="dropdown-menu" role="menu">
                                <li class="dropdown-header">Group 1</li>
                                <li><a href="#" @click="changeSelected">HTML</a></li>
                                <li><a href="#" @click="changeSelected">CSS</a></li>
                                <li><a href="#" @click="changeSelected">JavaScript</a></li>
                                <li class="divider"></li>
                                <li class="dropdown-header">Group 2</li>
                                <li><a href="#" @click="changeSelected">About Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox"> 啟用
                            </label>
                        </div>
                    </div>
                </div>

            </form>
        </Modal>
    </div>

</template>

<script>
    import api from '../../../../config/api.js'
    import DataTable from '../../widgets/DataTable.vue'
    import ContentHeader from '../../widgets/ContentHeader.vue'
    import ContentBox from '../../widgets/ContentBox.vue'
    import Modal from '../../widgets/Modal.vue'
    export default {
        data () {
            return {
                subject: "系統設置",
                title: '角色設定',
                subTitle: "角色設定的說明在這裡",
                dataContent: {},
                selectItem: "Init",
                loading: false
            }
        },
        created() {
            var run = async function () {
                let res = await api.test()
                this.dataContent.data = res.content
                this.dataContent.columns = res.title
            }
            run.call(this)
            this.loading = true
        },
        ready() {
            setTimeout(function(){
                this.loading = false;
            }.bind(this),1000)
        },
        components: {
            DataTable,
            ContentHeader,
            ContentBox,
            Modal
        },
        methods: {
            openModal() {
                $("#myModal").modal()
            },
            changeSelected(e) {
                this.selectItem = e.target.innerText
            }
        }
    }
</script>

<style lang="stylus">
    .v-transition
        transition: opacity 0.4s ease-in-out
    .v-enter, .v-leave
        opacity: 0
    .btn .caret
        margin-left: 10px
    select.flat
        border-radius: 0
</style>
