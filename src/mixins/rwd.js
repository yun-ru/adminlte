export default {
  data() {
    return {
      winW: 99,
      winType: ''
    }
  },
  ready() {
    $(window).on("load resize",()=>{
      this.winW = $(window).width();
      if(this.winW<480) this.winType = 'xs'
      else if(this.winW<786) this.winType ='sm'
      else if(this.winW<1280) this.winType = 'md'
      else this.winType = 'lg'
    })
  }
}
