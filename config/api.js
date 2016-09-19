module.exports = {
  host: "http://mid.tw/",
  api(method,url,data) {
    return $.ajax({
      method: method,
      url: this.host + url,
      data: data
    })
  },
  login(data) {
    return this.api('post','account/common/do-login',data)
  },
  getRoleList() {
    return this.api('get','role/role/get-list')
  }
}
