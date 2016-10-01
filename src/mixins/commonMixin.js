import ContentHeader from '../components/widgets/ContentHeader.vue'
import ContentBody from '../components/widgets/ContentBody.vue'
import Modal from '../components/widgets/Modal.vue'
export default {
    data() {
      return {
          host: "http://61.219.77.174",
          file: null,
          resData: null,
          modalData: {},
          searchMode: false,
          searchText: "",
          currentSearchType: 0,
          searchTypes: [
              {text: "全部名稱", value: 0, code: "complex"},
              {text: "繁中名稱", value: 1, code: "name_zh_TW"},
              {text: "簡中名稱", value: 2, code: "name_zh_CN"},
              {text: "English Name", value: 3, code: "name_en"}
          ]
      }
    },
    computed: {
        pagination() {
            return this.resData.data.paginator
        },
        breadcrumb() {
            return _.map(this.resData.data.breadcrumb,item=>{
                return {text: item.node_name_zh_TW,link: item.node_route}
            })
        },
        permission() {
            return (this.resData.data.permission >>> 0).toString(2)
        },
        permissionBtn() {
            return {
                show: this.permission[0]-0,
                edit: this.permission[1]-0,
                add: this.permission[2]-0,
                del: this.permission[3]-0
            }
        }
    },
    methods: {
        onFileChange() {
            var formData = new FormData($("#form")[0])
            this.api.upload(formData).then(res=>{
                this.modalData.file_guid = res.data.files.files_guid
                this.modalData.fileImg = this.host + res.data.file_path + "/" + res.data.file_name
                this.modalData.display.files_name = false
                setTimeout(()=>{
                    this.modalData.value.files_name = this.modalData.fileImg
                    this.modalData.display.files_name = true
                })
            })
        },
        dataReload() {
            this.searchMode = false
            this.searchText = ""
            this.api.setting(this.subject,"getList").then(res=>{
                if(res.code===0) {
                    this.resData = res
                }else{
                    this.handleError(res)
                }
            })
        },
        onCreate() {
            this.createReady()
            this.openModal()
        },
        onModify(id) {
            console.log(this)
            this.api.setting(this.subject,"getItem",{[`${this.code}_guid`]: id}).then(res=>{
                if(res.code===0){
                    this.modifyReady(res.data[this.subject])
                    this.openModal()
                }else{
                    this.handleError(res)
                }
            })
        },
        onDelete(id) {
            swal({
                title: '確認刪除?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '刪除',
                cancelButtonText: '取消',
            }).then(()=> {
                this.api.setting(this.subject, 'delItem', {[`${this.code}_guid`]: id}).then(res=>{
                    if(res.code===0){
                        swal("刪除成功！").then(()=> this.dataReload())
                    }else{
                        this.handleError(res)
                    }
                })
            }, (dismiss)=> {
                if (dismiss === 'cancel') {
                    swal('刪除已取消');
                }
            });

        },
        getSearchType(currentSearchType) {
            this.currentSearchType = currentSearchType
            var target = _.find(this.searchTypes,{value: this.currentSearchType})
            var searchMsg = this.currentSearchType>0 ? `search_${this.code}_${target.code}` : `search_${target.code}`
            console.log(searchMsg)
        },
        checkEmpty(searchText) {
            if(searchText===""){
                this.dataReload()
            }
        },
        onSearch(searchText) {
            console.log(this)
            this.searchText = searchText
            this.searchMode = true
            var data = {
                search_complex: this.searchText
            }
            this.api.setting(this.subject,"getList",data).then(res=>{
                if(res.code===0) {
                    this.resData = res
                }else{
                    this.handleError(res)
                }
            })
        },
        formSubmit() {
            var data = this.modalData.value
            this.modalData.id ? this.modifySubmit(data) : this.createSubmit(data)
        },
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
    },
    components: {
        ContentHeader,
        ContentBody,
        Modal
    },
}
