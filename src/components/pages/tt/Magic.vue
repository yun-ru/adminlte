<template>

  <div class="content-wrapper">
      <content-header></content-header>
      <section class="content">

        <content-box :title="title">
          <div class="table-responsive" slot="main">
            <data-table v-if="!loading" transition></data-table>
          </div>
          <template slot="footer">
            <a @click="openModal" class="btn btn-sm btn-success btn-flat pull-left">新增項目</a>
            <a href="javascript::;" class="btn btn-sm btn-default btn-flat pull-right">設定</a>
          </template>
        </content-box>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
              </div>
              <div class="modal-body">
                <form class="form-horizontal">
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
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success btn-flat">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /Modal  -->

      </section>
    </div>

</template>

<script>
  import DataTable from '../../widgets/DataTable.vue'
  import ContentHeader from '../../widgets/ContentHeader.vue'
  import ContentBox from '../../widgets/ContentBox.vue'
  export default {
    data () {
      return {
        title: '測試頁面',
        selectItem: "Init",
        loading: false
      }
    },
    created() {
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
      ContentBox
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
