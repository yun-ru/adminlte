export default {
  methods: {
    caseStatus(val) {
      switch (val){
        case 3:
          return '啟用'
        case -2:
          return '停用'
      }
    }
  }
}
