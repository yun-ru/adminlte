<template>
    <table id="example" class="table table-striped table-bordered">
        <thead>
        <tr>
            <th v-for="item in dataContent.columns">{{item.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in dataContent.data" track-by="$index">
            <td v-for="subItem in item" track-by="$index">{{subItem}}</td>
            <td>
                <slot name="inlineControl"></slot>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        created() {
        },
        ready() {
        },
        props: ['data-content'],
        methods: {
        }
    }
</script>

