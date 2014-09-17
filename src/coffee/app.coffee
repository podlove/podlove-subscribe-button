$ = require('../../vendor/zepto-browserify.js').Zepto

Button = require('./button.coffee')
Popup = require('./popup.coffee')
Utils = require('./utils.coffee')
IframeResizer = require('./iframe_resizer.coffee')
IframeClick = require('./iframe_click.coffee')

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
      #language: @scriptElem.data('language')
      size: @scriptElem.data('size')

    @options = $.extend(@defaultOptions, options)

  getPodcastData: () ->
    if jsonUrl = @scriptElem.data('json-url')
      @fetchPodcastDataFromUrl(jsonUrl)
    if dataSource = @scriptElem.data('json-data')
      @extractPodcastDataFromJson(window[dataSource])

  fetchPodcastDataFromUrl: () ->

  extractPodcastDataFromJson: (data) ->
    @podcast = data

  renderButtonIframe: () ->
    elem = $('<div>').append(@iframe())
    $(elem).on 'click', (event) =>
      @openPopup()

    @scriptElem.replaceWith(elem)

  addCss: () ->
    link = $("<link rel='stylesheet' href='#{@options.scriptPath}/stylesheets/app.css'></script>")
    @scriptElem.after(link)

  # builds the button Iframe and attaches the click event listener
  iframe: () ->
    id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    buttonUrl = "#{@options.scriptPath}/button.html?id=#{id}&language=#{@options.language}&size=#{@options.size}"

    iframe = $('<iframe>')
      .attr('src', buttonUrl)
      .attr('id', id)
      .addClass('podlove-subscribe-button-iframe')
      .css({border: 'none', display: 'block', overflow: 'hidden'})

    IframeResizer.listen('resizeButton', iframe)

    IframeClick.listen(iframe, @openPopup)

    iframe

  openPopup: () =>
    new Popup(@podcast, @options)

window.SubscribeButton = SubscribeButton
window.Button = Button

# init the button
$ -> SubscribeButton.init()
