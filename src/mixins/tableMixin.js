export default {
  methods: {
    caseStatus(val) {
      switch (val){
        case 3:
          return '啟用'
        case -2:
          return '停用'
      }
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
      return list
    }
  }
}
