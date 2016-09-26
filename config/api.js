module.exports = (function(){

  var testMode = false
  var host = testMode? "/" : "http://mid.tw/"

  return {
    testMode,
    host
  }

})()
