
export default {
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
