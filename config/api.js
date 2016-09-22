module.exports = (function(){

  var host = "http://mid.tw/";

  function apiInit(method,url,data) {
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
    test: function() {
      return $.get('/static/data/test.json')
    },
    getTestList: function() {
      return $.get('/static/data/getTestList.json')
    },
    getTestMenu: function() {
      return $.get('/static/data/getTestMenu.json')
    },



    getMenu: function() {
      return apiInit('get','node/menu/get-menu')
    },
    getCurrencyList: function() {
      return apiInit('get','currency/setting/get-list')
    },
    postCurrencyList: function(data) {
      return apiInit('post','currency/setting/get-list',data)
    },
    login: function(data) {
      return apiInit('post','account/common/do-login',data)
    },
    getRoleList: function() {
      return apiInit('get','role/role/get-list')
    }
  }
})()
