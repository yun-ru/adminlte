<template>
    <section class="content-header">
        <h1>
            {{title}}
        </h1>
        <ol class="breadcrumb">
            <li v-for="item in breadcrumbList" :class="{active: item.isActive}">{{item.text}}</li>
        </ol>
    </section>
</template>

<script>
    export default {
        data() {
          return {
              breadcrumbList: [],
              title: ''
          }
        },
        events: {
            onReady() {
                this.breadcrumbList = this.$parent.$data.breadcrumbList
                this.title = this.breadcrumbList[this.breadcrumbList.length-1].text
            }
        }
    }
</script>
