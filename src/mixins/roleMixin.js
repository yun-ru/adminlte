export default {
    data() {
        return {
            roleRes: {},
        }
    },
    computed: {

    },
    methods: {
        getRole() {
            this.api.assign().then(res=>{
                this.roleRes = res
                console.dir(this.roleRes.data)

            })
        }
    }
}
