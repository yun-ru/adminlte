<template>
    <table id="example" class="table table-striped table-bordered">
        <thead>
        <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Extn.</th>
            <th>Start date</th>
            <th>Salary</th>
        </tr>
        </thead>
    </table>
</template>

<script>
    export default {
        data () {
            return {
                title: ['title1','title2','title3'],
                content: [
                ]
            }
        },
        ready() {
            $('#example').DataTable( {
                responsive: true,
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
                "processing": true,
                "ajax": "/static/data/demo.json",
                "columns": [
                    { "data": "name" },
                    { "data": "hr.position" },
                    { "data": "contact.0" },
                    { "data": "contact.1" },
                    { "data": "hr.start_date" },
                    { "data": "hr.salary" }
                ]
            } );
        },
        methods: {
        }
    }
</script>
