<template>
    <section class="content-header">
        <h1>{{title}}</h1>
        <ol class="breadcrumb">
            <li>
                <a v-link="{path:'/'}">
                    <i class="fa fa-home"></i> 首頁
                </a>
            </li>
            <li v-for="item in breadcrumb">
                <a v-if="item.link" v-link="{path:'/' + item.link}">{{item.text}}</a>
                <a v-if="!item.link">{{item.text}}</a>
            </li>
        </ol>
    </section>
</template>

<script>
    export default {
        computed: {
            title() { return this.breadcrumb.length>0 ? this.breadcrumb[this.breadcrumb.length-1].text : ""}
        },
        props: ['breadcrumb']
    }
</script>
