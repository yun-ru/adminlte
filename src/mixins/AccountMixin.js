import menu from '../../config/menu'
export default {
    data() {
      return {
          userInfo: null,
          menu: menu || [],
      }
    },
    methods: {
        logout() {
            this.$router.go({path:"/login"})
        },
        loginSuccess(res) {
            this.msgClass = "alert-warning"
            this.msg = "登入成功..."
            console.log(res)
            setTimeout(()=>{
                this.$router.go({path: "/"});
            },1500)
            if(res.data) this.userInfo = res.data
        },
        onSubmit() {
            this.api.login({ant_account: this.account, ant_passwd: this.password})
                .then(res=>{
                    if(res.code===0) this.loginSuccess(res)
                    else this.handleError(res)
                })
        },
        async loadMenu(){
            try{
                let res = await this.api.menu()
                res.code===0 ? this.GetMenuSuccess(res) : this.handleError(res)
            }catch(err){
                this.handleError(err)
            }
        },
        GetMenuSuccess(res) {
            this.makeMenu(res.data)
        },
        getSidebarHeight(height) {
            console.log("sidebar's height: " + height)
            this.contentMinHeight = height-50
        },
        makeMenu(menu) {
            _.each(menu,(item,i,arr)=>{
                var targetItem = _.find(this.menu,{id: item.node_pguid})
                if(targetItem){
                    if(!targetItem.hasOwnProperty('child')){
                        targetItem.link = null
                        targetItem.child = []
                    }
                    targetItem.child.push({
                        id: item.node_guid,
                        name: item.node_name_zh_TW,
                        icon: 'fa-circle-o',
                        link: '/'+item.node_route
                    })

                }else{
                    this.menu.push({
                        id: item.node_guid,
                        name: item.node_name_zh_TW,
                        icon: 'fa-circle-o',
                        link: '/'+item.node_route
                    })
                }
            })
        }
    }
}
