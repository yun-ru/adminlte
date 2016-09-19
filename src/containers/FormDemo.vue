<template>
  <div class="loginPage">
    <div class="login-box">
      <div class="login-logo">
        <h1><b>MID</b>NET</h1>
      </div>
      <!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">請輸入會員帳號及密碼</p>
        <validator name="myValid">
          <form novalidate>
            <div v-for="field in fields" class="form-group" :class="{'has-feedback':field.icon}">
              <label :for="field.id">{{field.label}}</label>
              <input class="form-control"
                     :class= "field.customClass"
                     :type="field.type"
                     :id="field.id"
                     :name="field.name"
                     :placeholder="field.placeholder"
                     :field="field.name"
                     v-validate="field.validate">
              <span class="form-control-feedback" :class="field.icon"></span>
              <!--<div class="help-block" v-if="$myValid.username.invalid">-->
              <!--<p v-for="error in $myValid.username.errors">{{error.message}}</p>-->
              <!--</div>-->
            </div>



            <div class="row">
              <div class="col-xs-12">
                <div class="alert alert-danger">
                  <p v-for="error in $myValid.errors">{{error.message}}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-8">
                <div class="checkbox">
                  <label>
                    <input type="checkbox"> 記住我
                  </label>
                </div>
                <button @click.prevent="onReset">reset</button>
              </div>
              <!-- /.col -->
              <div class="col-xs-4">
                <button type="button" class="btn btn-success btn-block btn-flat">登入</button>
              </div>
              <!-- /.col -->
            </div>
          </form>
        </validator>

        <pre>{{$myValid | json}}</pre>

      </div>
      <!-- /.login-box-body -->
    </div>
    <!-- /.login-box -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          {
            id: 'username',
            label: '帳號',
            name: 'username',
            type: 'text',
            icon: 'fa fa-user',
            placeholder: '請輸入帳號',
            validate: {
              required: { rule: true, message: 'required you name !!' },
              minlength: { rule: 3, message: 'your name is too short!!' }
            }
          },
          {
            id: 'password',
            customClass: 'password',
            label: '密碼',
            name: 'password',
            type: 'text',
            icon: 'fa fa-lock',
            placeholder: '請輸入密碼',
            validate: {
              required: { rule: true, message: 'required you password !!' },
              minlength: { rule: 3, message: 'your password is too short!!' }
            }
          }
        ]
      }
    },
    methods: {
      onReset() {
        this.$resetValidation()
      }
    },
    ready() {
      $('.loginPage').height($(window).height())
      $(".password").on("focus",function(){
        $(this).attr('type','password')
      })
    }
  }
</script>

<style lang="stylus">
  .loginPage
    background-color: #eee
    .login-box
      margin: 0 auto
      padding: 7% 0
</style>
