<template>
  <router-view></router-view>
</template>

<script>
  import rwd from './mixins/rwd'
  export default {
    replace: false,
    mixins: [rwd]
  }
</script>
