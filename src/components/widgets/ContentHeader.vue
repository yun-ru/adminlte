<template>
    <section class="content-header">
        <h1>
            {{title}}
        </h1>
        <ol class="breadcrumb">
            <li>
                <a v-link="{path:'/'}">
                    <i class="fa fa-home"></i> 首頁
                </a>
            </li>
            <li v-for="item in breadcrumbList" :class="{active: item.isActive}">
                {{item.text}}
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
        computed: {
            title() {
                return this.breadcrumbList.length ? this.breadcrumbList[this.breadcrumbList.length-1].text : ""
            }
        },
        props: ['breadcrumb-list']
    }
</script>
