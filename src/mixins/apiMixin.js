export default {
    data() {
        return {
            host: "http://mid2.tw/",
            router: {
                setting: {
                    getList: {path: "/setting/get-list", type: "get"},
                    getItem: {path: "/setting/edit", type: "post"},
                    showItem: {path: "/setting/show", type: "post"},
                    postNew: {path: "/setting/do-add", type: "post"},
                    delItem: {path: "/setting/do-del", type: "post"},
                    updateItem: {path: "/setting/do-edit", type: "post"}
                },
                assign: {
                    show: {path: "role/assign/show", type: "post"},
                    edit: {path: "role/assign/edit", type: "post"},
                    doEdit: {path: "role/assign/do-edit", type: "post"}
                },
                account: {
                    getList: {path: "getList", type: "get"},
                    getAllBranch: {path: "getAllBranch", type: "get"}
                }
            }
        }
    },
    computed: {
        api() {

            var account = (user, action, data) => {
                var route = `account/${user}/${this.router.account[action].path}`
                var type = this.router.account[action].type
                return this.apiInit( type , route , data)
            }

            var setting = (subject,action,data) => {
                var route = subject + this.router.setting[action].path
                var type = this.router.setting[action].type
                return this.apiInit( type , route , data)
            }

            var login = (data) =>{
                return this.apiInit('post','account/common/do-login', data)
            }

            var menu = () => {
                var route = 'node/menu/get-menu'
                return this.apiInit('get', route)
            }

            var assign = (action,data) => {
                var route, type
                route = this.router.assign[action].path
                type = this.router.assign[action].type
                return this.apiInit( type , route , data)
            }

            var upload = (data) => {
                return $.ajax({
                    method: 'post',
                    url: this.host + 'theme/setting/do-upload',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false
                })

            }


            return {
                account,
                setting,
                login,
                menu,
                assign,
                upload
            }
        }
    },
    methods: {
        apiInit(method, url, data) {
            return $.ajax({
                method: method,
                url: this.host + url,
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            })
        },
        handleError(res){
            throw res


            var errCode = _.has(res,'code')? res.code : 99999
            var errMsg = _.has(res,'text')? res.text.common : `系統錯誤 (${errCode})`
            switch(errCode) {
                case 1:
                    this.acc_err = res.text.ant_account
                    this.pw_err = res.text.ant_passwd
                    break
                case 4001:
                    this.msgClass = "alert-danger"
                    this.msg = "帳號或密碼錯誤請重新輸入"
                    break
                case 10006:
                    if(res.text.files_guid) res.text.pick_file = res.text.files_guid
                    this.modalData.errMsg = res.text
                    break
                case 30006:
                    this.$this.router.go({path: "/login"});
                    swal(errMsg)
                    break
                default:
                    swal(errMsg)
                    break
            }


        }
    }
}
