<template>
  <div class="row pure" v-el:pure>
    <div class="col-sm-12 col-md-12">
      <p class="text-center">
        <i class="fa fa-3x fa-frown-o"></i> 
      </p>
      <h2 class="text-center">404 Page Not Found</h2>
    </div>
  </div>
</template>

<script>
export default {
    computed: {
        winH() {
            return window.innerHeight
        }
    },
    ready() {
        this.$els.pure.style.height = this.winH + "px"
    }
}
</script>

<style lang="stylus">
    .pure
        display: flex
        align-items center
        justify-content center
        h3, h2, p
            color: #fff
</style>
