module.exports = (function(){

  var testMode = true
  var host = testMode? "/" : "http://mid.tw/"

  return {
    testMode,
    host
  }

})()
