$ = require('../../vendor/zepto-browserify.js').Zepto
Utils = require('./utils.coffee')
Translations = require('./translations.coffee')

class Button
  constructor: () ->
    @getOptions()
    @elem = $('#podlove-subscribe-button')

    @translations = Translations[@options.language]
    @render()

    @resizeIframe()

  render: () ->
    buttonHtml = "<span>#{@translations.button}</span>"
    @elem.addClass(@options.size)
      .html(buttonHtml)

    @elem.on 'click', (event) =>
      window.parent.postMessage("clicked_#{@options.id}", '*')

  getOptions: () ->
    @options = Utils.locationToOptions(window.location.search)

  resizeIframe: () ->
    height = @elem.height()
    width = @elem.width()

    resizeData = JSON.stringify({
      id: @options.id,
      listenTo: 'resizeButton',
      height: height,
      width: width
    })
    window.parent.postMessage(resizeData, '*')

module.exports = Button
