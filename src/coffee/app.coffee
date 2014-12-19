$ = require('../../vendor/zepto-browserify.js').Zepto
_ = require('../../vendor/underscore-min.js')

Button = require('./button.coffee')
Popup = require('./popup.coffee')
Utils = require('./utils.coffee')
IframeResizer = require('./iframe_resizer.coffee')
IframeClick = require('./iframe_click.coffee')
Colors = require('./colors.coffee')

class SubscribeButton
  @init: (selector = '.podlove-subscribe-button') ->
    subscribeButtons = []
    elems = $(selector)

    return if elems.length == 0

    for elem in elems
      subscribeButtons.push(new SubscribeButton(elem))

    window.subscribeButtons = subscribeButtons

  constructor: (scriptElem) ->
    @scriptElem = $(scriptElem)

    @getOptions()
    @getPodcastData()
    @checkIntegrity()
    @addCss()
    @renderButtonIframe()

    return @

  update: () ->
    @getPodcastData()

  defaultOptions:
    language: 'en'
    size: 'medium'

  getOptions: () ->
    options =
      scriptPath: @scriptElem.attr('src').match(/(^.*\/)/)[0].replace(/javascripts\/$/, '').replace(/\/$/, '')
      language: @scriptElem.data('language')
      size: @scriptElem.data('size')
      colors: new Colors(@scriptElem.data('colors'))

    @options = $.extend(@defaultOptions, options)

  getPodcastData: () ->
    if jsonUrl = @scriptElem.data('json-url')
      @fetchPodcastDataFromUrl(jsonUrl)
    if dataSource = @scriptElem.data('json-data')
      @extractPodcastDataFromJson(window[dataSource])

  fetchPodcastDataFromUrl: () ->

  extractPodcastDataFromJson: (data) ->
    @podcast = data

  checkIntegrity: () ->
    if @podcast.feeds.length == 0
      text = "Subscribe Button Error. Please add at least one feed."
      console.warn(text)
      window.alert(text)

  renderButtonIframe: () ->
    @scriptElem.replaceWith(@iframe())

  addCss: () ->
    link = $("<link rel='stylesheet' href='#{@options.scriptPath}/stylesheets/app.css'></script>")
    @scriptElem.after(link)
    link.after(@options.colors.toStyles())

  # builds the button Iframe and attaches the click event listener
  iframe: () ->
    @options.id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    buttonUrl = "#{@options.scriptPath}/button.html?id=#{@options.id}&language=#{@options.language}&size=#{@options.size}&podcastTitle=#{@podcast.title}&podcastCover=#{@podcast.cover}#{@options.colors.toParams()}"

    iframe = $('<iframe>')
      .attr('src', buttonUrl)
      .attr('id', @options.id)
      .addClass('podlove-subscribe-button-iframe')
      .css({border: 'none', display: 'inline-block', overflow: 'hidden'})

    IframeResizer.listen('resizeButton', iframe)

    IframeClick.listen(iframe, @openPopup, @options)

    iframe

  openPopup: (options) =>
    new Popup(@podcast, options)

window.SubscribeButton = SubscribeButton
window.Button = Button

# init the button
$ -> SubscribeButton.init()
