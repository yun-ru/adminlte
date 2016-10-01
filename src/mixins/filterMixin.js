
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
        type(val) {
            var types = [
                {label: "電話", value: 1},
                {label: "IP", value: 2},
                {label: "銀行帳號", value: 3}
            ]
            return _.find(types,{value: val-0})? _.find(types,{value: val-0}).label : ""
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
