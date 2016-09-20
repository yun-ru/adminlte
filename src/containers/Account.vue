<template>
  <div class="loginPage">
    <div class="login-box">
      <div class="login-logo">
        <h1><b>MID</b>NET</h1>
      </div>
      <!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">請輸入會員帳號及密碼</p>
        <form novalidate>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="帳號">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="密碼">
          </div>
          <div class="row">
            <div class="col-xs-8">
              <div class="checkbox">
                <label>
                  <input type="checkbox"> 記住我
                </label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-xs-4">
              <button type="button" class="btn btn-success btn-block btn-flat">登入</button>
            </div>
            <!-- /.col -->
          </div>
        </form>

      </div>
      <!-- /.login-box-body -->
    </div>
    <!-- /.login-box -->
  </div>
</template>

<script>
  import api from '../../config/api.js'
  export default {
    data() {
      return {
        showError: true
      }
    },
    methods: {
    },
    ready() {
      $('.loginPage').height($(window).height())
      $(".password").on("focus",function(){
        $(this).attr('type','password')
      })
      async function run() {
        let a = await api.login({ant_account:'admin', ant_passwd:'Ab12345'})
        let b = await api.getRoleList()
        console.log(a)
        console.log(b)
      }
      run()

    }
  }
</script>

<style lang="stylus">
  input.form-control.invalid.touched
    border-color: #c40000

  .loginPage
    background-color: #eee
    .login-box
      margin: 0 auto
      padding: 7% 0
</style>
