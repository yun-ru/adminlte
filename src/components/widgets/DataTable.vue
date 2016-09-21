<template>
    <table id="example" class="table table-striped table-bordered"></table>
</template>

<script>
    export default {
        data () {
            return {
                table: {
                    responsive: true,
                    "paging":   false,
                    "ordering": false,
                    "info":     false,
                    "searching": false,
                    "language": {
                        "paginate": {
                            "first": "<i class='fa fa-angle-double-left'></i>",
                            "last": "<i class='fa fa-angle-double-right'></i>",
                            "previous": "<i class='fa fa-angle-left'></i>",
                            "next": "<i class='fa fa-angle-right'></i>"
                        },
                        "emptyTable": "No data available in table",
                        "info": "第 _PAGE_ 頁，共 _PAGES_ 頁",
                        "infoEmpty": "No entries to show",
                        "search": "搜尋:",
                        "lengthMenu": "每頁顯示 _MENU_ 筆"
                    },
                    "processing": true
                },
                dataTable: {}
            }
        },
        created() {
            this.dataTable = Object.assign({},this.table,this.dataContent)
        },
        ready() {
            console.log(this)
            $('#example').DataTable(this.dataTable);
        },
        props: ['data-content'],
        methods: {
            sayhi() {
                console.log('hi summer')
            }
        }
    }
</script>
