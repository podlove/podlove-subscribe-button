class IframeClick
  @listen: (iframe, callback) ->
    window.addEventListener('message', ((event) =>

      return unless event.data == 'clicked'

      callback()
    ), false)

module.exports = IframeClick
