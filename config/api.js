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
    login: function(data) {
      return apiInit('post','account/common/do-login',data)
    },
    getRoleList: function() {
      return apiInit('get','role/role/get-list')
    }
  }
})()
