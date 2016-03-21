$ = require('../../vendor/zepto-browserify.js').Zepto
Utils = require('./utils.coffee')
Translations = require('./translations.coffee')
Colors = require('./colors.coffee')

class Button
  constructor: () ->
    @getOptions()
    if /big-logo/.test(@options.size)
      @logoElem = $('#podlove-subscribe-button-logo')
    if /auto/.test(@options.size)
      @autoSize = true
    @elem = $('#podlove-subscribe-button')

    @I18n = new Translations(@options.language)
    @render()

    @resizeIframe()

  render: () ->
    buttonHtml = "<span>#{@I18n.t('button')}</span>"
    @elem.addClass(@options.size.replace('%20', ' '))
      .html(buttonHtml)

    # Add title attritbute to button element
    @elem.prop('title', @I18n.t('button'))

    @elem.on 'click', (event) =>
      window.parent.postMessage("clicked_#{@options.id}", '*')

    if @logoElem
      image = "<img src='#{@options.podcastCover}' alt='Logo of #{@options.podcastTitle}'>"
      @logoElem.html(image)

      @logoElem.on 'click', (event) =>
        window.parent.postMessage("clicked_#{@options.id}", '*')

    @setColors()

  setColors: () ->
    colors = Colors.fromParams(@options)
    @elem.after(colors.toStyles())

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

    width = if @autoSize && !@logoElem
      '100%'
    else
      @elem.width()

    if @logoElem
      img = @logoElem.find('img')
      img.on 'load', =>
        @logoElem.height(width)
        height += width
        @logoElem.show()
        resize(height, width)
    else
      resize(height, width)

module.exports = Button
