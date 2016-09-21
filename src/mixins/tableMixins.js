export default {
  data() {

  },
  ready() {

  },
  methods: {
    caseStatus(val) {
      switch (val){
        case 3:
          return '啟用'
        case -2:
          return '停用'
      }
    },
    pushTableBody(list){
      _.each(list,item=>{
        var itemArr = []
        console.log(this.caseStatus(item.ccy_status))
        itemArr.push(item.ccy_code)
        itemArr.push(item.ccy_name_en)
        itemArr.push(item.ccy_name_zh_CN)
        itemArr.push(item.ccy_name_zh_TW)
        itemArr.push(this.caseStatus(item.ccy_status))
        itemArr.push(new Date(item.ccy_udate*1000).toLocaleString())

        this.tableContent.push(itemArr)
      })
    },
    openModal() {
      $("#myModal").modal()
    },
    makePageList(num,current) {
      var list = []
      for(var i=0; i<num; i++){
        list.push({
          text: i+1,
          isActive: false
        })
      }
      list[current-1].isActive = true
      console.log(num)
      console.log(list)
      return list
    },
    dec2bin(dec) {
      return (dec >>> 0).toString(2);
    }
  }
}
