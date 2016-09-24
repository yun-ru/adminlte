module.exports = (function(){


  var testMode = true
  var host = testMode? "/" : "http://mid.tw/"

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
      url: host + url,
      data: data,
      xhrFields: {
        withCredentials: true
      }
    })
  }

  return {
    setting: function(subject,action,data) {
      var route = testMode? 'static/data/getTestList.json' : subject + router.setting[action].path
      var type = testMode? 'get' : router.setting[action].type
      return apiInit( type , route , data)
    },
    login: function(data) {
      return apiInit('post','account/common/do-login', data)
    },
    menu: function() {
      var route = testMode? 'static/data/getTestMenu.json' : 'node/menu/get-menu'
      return apiInit('get', route)
    }
  }

})()
