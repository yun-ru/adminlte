<template>
    <section class="content-header">
        <h1>
            {{breadcrumb[0].text}}
        </h1>
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
        data() {
          return {
          }
        },
        props: ['breadcrumb']
    }
</script>
