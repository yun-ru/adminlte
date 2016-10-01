import apiConfig from '../../config/api'
export default {
    computed: {
        api() {
            var router = {
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
                }
            }

            var apiInit = function (method,url,data) {
                return $.ajax({
                    method: method,
                    url: apiConfig.host + url,
                    data: data,
                    xhrFields: {
                        withCredentials: true
                    }
                })
            }

            var getTestRoute = function(action) {
                return action === 'getList' ? 'static/data/getList.json' : 'static/data/getItem.json'
            }

            return {
                setting: function(subject,action,data) {
                    var route = apiConfig.testMode? getTestRoute(action) : subject + router.setting[action].path
                    var type = apiConfig.testMode? 'get' : router.setting[action].type
                    var _data = apiConfig.testMode? {testType: action, ...data} : data
                    return apiInit( type , route , _data)
                },
                login: function(data) {
                    return apiInit('post','account/common/do-login', data)
                },
                menu: function() {
                    var route = apiConfig.testMode? 'static/data/getMenu.json' : 'node/menu/get-menu'
                    return apiInit('get', route)
                },
                assign: function(action,data) {
                    var route, type
                    if(apiConfig.testMode){
                        route = 'static/data/showRole.json'
                        return apiInit( 'get' , route , {testType: action, ...data})
                    }else{
                        route = router.assign[action].path
                        type = router.assign[action].type
                        return apiInit( type , route , data)
                    }
                },
                upload: function(data) {
                    return $.ajax({
                        method: 'post',
                        url: apiConfig.host + 'theme/setting/do-upload',
                        xhrFields: {
                            withCredentials: true
                        },
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false
                    })

                }
            }
        }
    },
    methods: {
        handleError(res){

            console.log(res)

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
                    this.modalData.errMsg = res.text
                    break
                case 30006:
                    this.$router.go({path: "/login"});
                    swal(errMsg)
                    break
                default:
                    swal(errMsg)
                    break
            }


        }
    }
}
