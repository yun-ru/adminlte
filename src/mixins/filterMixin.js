
export default {
    data() {
        return {
            host: "http://61.219.77.174"
        }
    },
    filters: {
        myDate(val) {
            return new Date(val*1000).toLocaleString()
        },
        status(val) {
            switch (val){
                case 3:
                    return '啟用'
                case -2:
                    return '停用'
            }
        },
        showImg(val,item) {
            return this.host + item.files_folder+ '/' + val
        },
        allowEdit(val) {
            switch (val){
                case 'CUSTOM':
                    return '可'
                default:
                    return '不可'
            }
        }
    }
}
