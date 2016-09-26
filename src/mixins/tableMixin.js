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
        changePage(page,e) {
            if(!$(e.target).closest('li').hasClass('disabled')){
                console.log('go to page: ' + page)
                this.api.setting(this.subject, 'getList', {page: page}).then(res=>{
                    return res.code===0 ? this.dataReload() : this.handleError(res)
                })
            }
        }
    }
}
