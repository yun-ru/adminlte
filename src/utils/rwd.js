export default function() {
  var winW;
  $(window).on("load resize",function(){
    winW = $(window).width();
    this.winW = winW
    this.winType = checkWinType(winW)
  }.bind(this))

  function checkWinType(winW) {
    if(winW > 1024){
      return 'lg'
    }else if(winW > 736){
      return 'md'
    }else if(winW > 468){
      return 'sm'
    }else{
      return 'xs'
    }
  }
}
