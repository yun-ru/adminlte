import apiConfig from '../../config/api'
export default {
  computed: {
    api() {
      var router = {
        setting: {
          getList: {path: "/setting/get-list", type: "get"},
          getItem: {path: "/setting/edit", type: "post"},
          postNew: {path: "/setting/do-add", type: "post"},
          delItem: {path: "/setting/do-del", type: "post"},
          updateItem: {path: "/setting/do-edit", type: "post"}
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
          return apiInit( type , route , data)
        },
        login: function(data) {
          return apiInit('post','account/common/do-login', data)
        },
        menu: function() {
          var route = apiConfig.testMode? 'static/data/getMenu.json' : 'node/menu/get-menu'
          return apiInit('get', route)
        }
      }
    }
  }
}
