<template>

    <div>
        <content-header v-if="resData" :breadcrumb="breadcrumb"></content-header>
        <section class="content">
            <h1>HOME</h1>
        </section>

    </div>

</template>

<script>
    import commonMixin from '../../../mixins/commonMixin'
    import apiMixin from '../../../mixins/apiMixin'

    export default {
        data () {
            return {
            }
        },
        mixins: [commonMixin, apiMixin]
    }
</script>
