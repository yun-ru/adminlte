<template>
    <ol class="breadcrumb">
        <li>test</li>
        <li>test2</li>
    </ol>
</template>

<script>
    export default {
        data() {
            return {
                breadcrumb: this.$parent.$data.breadcrumb || []
            }
        },
        events: {
            onReady() {
                console.log(this.$parent.$data.breadcrumb)
            }
        }
    }
</script>
