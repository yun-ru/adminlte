import ContentHeader from '../components/widgets/ContentHeader.vue'
import ContentBody from '../components/widgets/ContentBody.vue'
import Modal from '../components/widgets/Modal.vue'
export default {
    data() {
      return {
          host: "http://61.219.77.174",
          langList: [],
          file: null,
          resData: null,
          modalData: {},
          searchMode: false,
          searchText: "",
          currentSearchType: "search_complex",
          crudList: {
              C: [3, 7, 11, 15],
              R: [1, 3, 5, 7, 9, 11, 13, 15],
              U: [5, 7, 13, 15],
              D: [9, 11, 13, 15]
          },
          initCRUD: [
              {text: "讀取", value: 1, code: "R"},
              {text: "新增", value: 2, code: "C"},
              {text: "修改", value: 4, code: "U"},
              {text: "刪除", value: 8, code: "D"}
          ],
          opts: {
              status: [
                  {label: "啟用", value: 3},
                  {label: "不啟用", value: -2}
              ],
              blockTypes: [
                  {label: "電話", value: 1},
                  {label: "IP", value: 2},
                  {label: "銀行帳號", value: 3}
              ]
          }
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
            return this.resData.data.permission
        },
        CRUD() {
            return {
                C: _.indexOf(this.toCrudList(this.permission),_.find(this.initCRUD,{code:"C"}).value) > -1,
                R: _.indexOf(this.toCrudList(this.permission),_.find(this.initCRUD,{code:"R"}).value) > -1,
                U: _.indexOf(this.toCrudList(this.permission),_.find(this.initCRUD,{code:"U"}).value) > -1,
                D: _.indexOf(this.toCrudList(this.permission),_.find(this.initCRUD,{code:"D"}).value) > -1,
            }
        }
    },
    methods: {
        toCrudList(num) {
            switch(num){
                case 1:
                    return [1]
                case 3:
                    return [1,2]
                case 5:
                    return [1,4]
                case 7:
                    return [1,2,4]
                case 9:
                    return [1,8]
                case 11:
                    return [1,2,8]
                case 13:
                    return [1,4,8]
                case 15:
                    return [1,2,4,8]
            }
        },
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
        async dataReload() {
            this.searchMode = false

            try{
                var mainRes = await this.api.setting(this.subject,"getList")
                var langRes = await this.api.setting("languages","getList")
                mainRes.code===0 ? this.resData = mainRes : this.handleError(mainRes)
                langRes.code===0 ? this.langList = langRes.data.list : this.handleError(langRes)
            }catch(err) {
                this.handleError(err)
            }

        },
        onCreate() {
            this.createReady()
            this.openModal()
        },
        onModify(id) {
            console.log(id)
            this.api.setting(this.subject,"getItem",{[`${this.code}_guid`]: id}).then(res=>{
                if(res.code===0){
                    if(this.subject==="cash-flow"){
                        this.modifyReady(res.data['cash_flow'])
                    }else{
                        this.modifyReady(res.data[this.subject])
                    }

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
        checkEmpty(searchText) {
            if(searchText===""){
                this.dataReload()
            }
        },
        onSearch(currentType,searchText) {
            this.searchMode = true
            var data = {
                [currentType]: searchText
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
