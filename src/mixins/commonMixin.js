
export default {
  methods: {
    openModal() {
      $("#myModal").modal()
    },
    dec2bin(dec) {
      return (dec >>> 0).toString(2);
    },
    makeBreadCrumbList(list) {
      var breadcrumblist = []

      _.each(list,(item,i,arr)=>{
        let _breadcrumb = {}
        _breadcrumb.text = item.node_name_en
        _breadcrumb.isActive = i===arr.length-1
        breadcrumblist.push(_breadcrumb)
      })
      return breadcrumblist
    },
    handleError(res){
      if(res.hasOwnProperty("text")){
        swal(res.text.common).then(()=>{
          this.$router.go({path: "/login"});
        })
      }else{
        throw res
      }
    }
  }
}
