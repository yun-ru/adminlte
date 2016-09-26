
export default {
    data() {
      return {
          msg: "good!"
      }
    },
    filters: {
        myDate(data) {
            return new Date(data*1000).toLocaleString()
        },
        status(val) {
            switch (val){
                case 3:
                    return '啟用'
                case -2:
                    return '停用'
            }
        }
    },
    methods: {
        openModal() {
            $("#myModal").modal()
        },
        closeModal() {
            $('#myModal').modal("hide")
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
        handleRemove(api,cb) {
            swal({
                title: '是否確認刪除?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '確認刪除',
                cancelButtonText: "取消"
            }).then(function() {
                api.then(cb,()=>{
                    swal("未刪除成功!");
                })
            })
        },
        obj2arr(obj) {
            var list = []
            _.each(obj,(val,key)=>{
                list.push([key,val])
            })
            return list
        }
    }
}
