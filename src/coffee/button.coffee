$ = require('../../vendor/zepto-browserify.js').Zepto
Utils = require('./utils.coffee')
Translations = require('./translations.coffee')

class Button
  constructor: () ->
    @getOptions()
    if /big-logo/.test(@options.size)
      @logoElem = $('#podlove-subscribe-button-logo')
    @elem = $('#podlove-subscribe-button')

    @I18n = new Translations(@options.language)
    @render()

    @resizeIframe()

  render: () ->
    buttonHtml = "<span>#{@I18n.t('button')}</span>"
    @elem.addClass(@options.size.replace('%20', ' '))
      .html(buttonHtml)

    @elem.on 'click', (event) =>
      window.parent.postMessage("clicked_#{@options.id}", '*')

    if @logoElem
      image = "<img src='#{@options.podcastCover}'>"
      @logoElem.html(image)

    if @titleElem
      title = "<span>#{decodeURI(@options.podcastTitle)}</span>"
      @titleElem.html(title)

  getOptions: () ->
    @options = Utils.locationToOptions(window.location.search)

  resizeIframe: () ->
    resize = (height, width) =>
      resizeData = JSON.stringify({
        id: @options.id,
        listenTo: 'resizeButton',
        height: height,
        width: width
      })
      window.parent.postMessage(resizeData, '*')

    height = @elem.height()
    width = @elem.width()

    if @logoElem
      img = @logoElem.find('img')
      img.on 'load', =>
        @logoElem.height(width)
        height += width
        @logoElem.show()
        resize(height, width)
    else if @titleElem
      @titleElem.show()
      @titleElem.width(width)
      height += @titleElem.height()
      resize(height, width)
    else
      resize(height, width)

module.exports = Button
