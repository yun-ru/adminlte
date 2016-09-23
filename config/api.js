module.exports = (function(){

  var host = "http://mid.tw/";
  var local = "/";

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

  function apiTest(method,url,data) {
    return $.ajax({
      method: method,
      url: local + url,
      data: data
    })
  }

  return {
    test: function() {
      return apiTest('get','static/data/test.json')
    },
    getTestList: function(data) {
      return apiTest('get','static/data/getTestList.json',data)
    },
    postTestList: function(data) {
      return apiTest('post','static/data/getTestList.json',data)
    },

    getTestMenu: function(data) {
      return apiTest('get','static/data/getTestMenu.json',data)
    },
    showTest: function(data) {
      return apiTest('post','static/data/showTest.json', data)
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
    addCurrency: function(data) {
      return apiInit('post','currency/setting/do-add',data)
    },
    delCurrency: function(data) {
      return apiInit('post','currency/setting/do-del',data)
    },
    editCurrency: function(data) {
      return apiInit('post','currency/setting/do-edit',data)
    },
    showCurrency: function(data) {
      return apiInit('post','currency/setting/edit',data)
    },
    login: function(data) {
      return apiInit('post','account/common/do-login',data)
    },
    getRoleList: function() {
      return apiInit('get','role/role/get-list')
    }
  }
})()
