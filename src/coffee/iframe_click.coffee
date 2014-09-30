$ = require('../../vendor/zepto-browserify.js').Zepto

class IframeClick
  @listen: (iframe, callback) ->
    id = $(iframe).attr('id')
    window.addEventListener('message', ((event) =>

      return unless event.data == "clicked_#{id}"

      callback()
    ), false)

module.exports = IframeClick
