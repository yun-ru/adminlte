<template>
    <section class="content-header">
        <h1>
            {{title}}
            <small>{{subTitle}}</small>
        </h1>
        <ol class="breadcrumb">
            <slot name="breadcrumb"></slot>
        </ol>
    </section>
</template>

<script>
    export default {
        props: ['title','subTitle']
    }
</script>
