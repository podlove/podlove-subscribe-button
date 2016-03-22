$ = require('../../vendor/zepto-browserify.js').Zepto
Utils = require('./utils.coffee')
Translations = require('./translations.coffee')
Colors = require('./colors.coffee')

class Button
  constructor: () ->
    @getOptions()

    @I18n = new Translations(@options.language)
    @elem = $('#podlove-subscribe-button')

    if /auto/.test(@options.size)
      @autoSize = true

    if @options.format != 'square'
      @buttonHtml = "<span>#{@I18n.t('button')}</span>"
    else if @options.format == 'square'
      @elem.addClass('square')

    if @options.format == 'cover'
      @logoElem = $('#podlove-subscribe-button-logo')

    @addStyle()
    @render()

    @resizeIframe()

  render: () ->
    @elem.addClass(@options.size.replace('%20', ' '))

    # Add title attritbute to button element
    @elem.prop('title', @I18n.t('button'))

    @elem.on 'click', (event) =>
      window.parent.postMessage("clicked_#{@options.id}", '*')

    if @buttonHtml
      @elem.html(@buttonHtml)

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

  addStyle: () ->
    if @options.style == 'frameless'
      @elem.addClass('frameless')
    else if @options.style == 'outline'
      @elem.addClass('outline')

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
