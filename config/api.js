module.exports = (function(){

  var testMode = false
  // var host = testMode? "/" : "http://mid.tw/"
  var host = testMode? "/" : "http://61.219.77.174/"

  return {
    testMode,
    host
  }

})()
