<template>
    <div class="loginPage">
        <div class="login-box">
            <div class="login-logo">
                <h1><b>MID</b>NET</h1>
            </div>
            <!-- /.login-logo -->
            <div class="login-box-body">
                <p class="login-box-msg">請輸入會員帳號及密碼</p>
                <form novalidate @keyup.enter="onSubmit">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="帳號" v-model="account">
                        <p class="text-danger">{{acc_err}}</p>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="密碼" v-model="password">
                        <p class="text-danger">{{pw_err}}</p>
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
                            <button type="button" class="btn btn-success btn-block btn-flat" @click="onSubmit">登入</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
                <div class="alert text-center" :class="msgClass" role="alert">
                    <p>{{msg}}</p>
                </div>
            </div>
            <!-- /.login-box-body -->
        </div>
        <!-- /.login-box -->
    </div>
</template>

<script>
    import apiMixin from '../mixins/apiMixin'
    export default {
        mixins: [apiMixin],
        data() {
            return {
                account: "",
                password: "",
                msg: "",
                acc_err: "",
                pw_err: "",
                msgClass: ""
            }
        },
        methods: {
            handleSuccess(res) {
                this.msgClass = "alert-warning"
                this.msg = "登入成功..."
                console.log(res)
                setTimeout(()=>{
                    this.$router.go({path: "/"});
                },1500)
                if(res.data) this.userInfo = res.data


            },
            onSubmit() {
                this.api.login({ant_account: this.account, ant_passwd: this.password})
                    .then(res=>{
                        if(res.code===0) this.handleSuccess(res)
                        else this.handleError(res)
                    })
            },

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
    input.form-control.invalid.touched
        border-color: #c40000

    .loginPage
        background-color: #eee
        .login-box
            margin: 0 auto
            padding: 7% 0
    .alert
        margin-top: 10px
        margin-bottom: 0

</style>
