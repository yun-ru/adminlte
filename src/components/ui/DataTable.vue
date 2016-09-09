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
