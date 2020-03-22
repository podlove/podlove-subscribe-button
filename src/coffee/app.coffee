_ = require('underscore')

Button = require('./button.coffee')
Popup = require('./popup.coffee')
Utils = require('./utils.coffee')
IframeResizer = require('./iframe_resizer.coffee')
IframeClick = require('./iframe_click.coffee')
Colors = require('./colors.coffee')
Translations = require('./translations.coffee')

class SubscribeButton
  @init: (selector = '.podlove-subscribe-button') ->
    if typeof selector != 'string'
      selector = '.podlove-subscribe-button'
    subscribeButtons = []
    elems = document.querySelectorAll(selector)

    return if elems.length == 0

    for elem in elems
      subscribeButtons.push(new SubscribeButton(elem))

    window.subscribeButtons = subscribeButtons

  constructor: (@scriptElem) ->
    @getOptions()
    @getPodcastData()

    return @

  init: () ->
    @checkForValidLanguage()
    @checkIntegrity()
    @addCss()
    @renderButtonIframe()

  update: () ->
    @getPodcastData()

  getOptions: () ->
    defaultOptions =
      size: 'medium'
      style: 'filled'
      format: 'rectangle'

    options =
      scriptPath: @scriptElem.getAttribute('src').match(/(^.*\/)/)[0].replace(/javascripts\/$/, '').replace(/\/$/, '')
      language: @scriptElem.dataset.language
      size: @scriptElem.dataset.size
      buttonId: @scriptElem.dataset.buttonid
      hide: @scriptElem.dataset.hide
      style: @scriptElem.dataset.style
      format: @scriptElem.dataset.format
      id: @scriptElem.dataset.buttonid || Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

    # fallback for old color settings
    # if new color setting "data-color" is available, use it,
    # if not, use the old "data-colors"
    if @scriptElem.dataset.color
      options.color = new Colors(@scriptElem.dataset.color)
    else
      options.color = new Colors(@scriptElem.dataset.colors)

    # fallback for old size option "big-logo"
    # size option "big-logo" not needed any more,
    # logo is added via "format: cover"
    if options.size && options.size.indexOf('-logo') >= 0
      options.size = options.size.replace('-logo', '')
      options.format = 'cover'

    @options = _.extend(defaultOptions, options)

  checkForValidLanguage: () ->
    translations = new Translations(@options.language)
    unless translations.supportsLanguage()
      @options.language = Translations.defaultLanguage

  getPodcastData: () ->
    if jsonUrl = @scriptElem.dataset.jsonUrl
      @fetchPodcastDataFromUrl(jsonUrl)
    else if dataSource = @scriptElem.dataset.jsonData
      @extractPodcastDataFromJson(window[dataSource])
    else
      @init()

  fetchPodcastDataFromUrl: (url) ->
    request = new XMLHttpRequest()
    request.open('GET', url, true)

    request.onload = () =>
      if request.status >= 200 && request.status < 400
        resp = JSON.parse(request.responseText)
        @extractPodcastDataFromJson(resp)
      else
        console.debug('Error fetching configuration', request)

    request.onerror = () =>
      console.debug('Error fetching configuration', request)

    request.send()

  extractPodcastDataFromJson: (data) ->
    @podcast = data
    if data
      @options = _.extend(@options, data.configuration)
      if data.configuration?.color
        @options.color = new Colors(@options.color)

    @init()

  checkIntegrity: () ->
    if @podcast && @podcast.feeds.length == 0
      text = "Subscribe Button Error. Please add at least one feed."
      console.warn(text)
      window.alert(text)

  renderButtonIframe: () ->
    unless @options.hide
      @scriptElem.parentNode.insertBefore(@iframe(), @scriptElem)

    @scriptElem.parentNode.removeChild(@scriptElem)

    @addEventListener()
    @checkForAutomaticOpening()
    if @options.buttonId
      customElement = document.querySelector(".podlove-subscribe-button-#{@options.buttonId}")
      return unless customElement
      customElement.addEventListener('click', => @openPopup(@options))

  checkForAutomaticOpening: () ->
    return unless window.location.hash == '#openSubscribeButtonPopup'
    self = @
    window.setTimeout (->
      self.openPopup(self.options)
    ), 250

  addEventListener: () ->
    document.body.addEventListener 'openSubscribeButtonPopup', (event) =>
      return if document.querySelectorAll('#podlove-subscribe-popup').length
      return unless event.detail.id == @options.id
      @podcast = event.detail
      popupOptions = _.extend(@options, event.detail.options)
      @checkForValidLanguage()
      @openPopup(popupOptions)

  addCss: () ->
    link = "<link rel=\"stylesheet\" href=\"#{@options.scriptPath}/stylesheets/app.css\">"
    link += @options.color.toStyles().outerHTML
    @scriptElem.insertAdjacentHTML('afterend', link)

  # builds the button Iframe and attaches the click event listener
  iframe: () ->
    podcastTitle = escape(@podcast.title)
    buttonUrl = "#{@options.scriptPath}/button.html?id=#{@options.id}&language=#{@options.language}&size=#{@options.size}&style=#{@options.style}&format=#{@options.format}&podcastTitle=#{podcastTitle}&podcastCover=#{@podcast.cover}#{@options.color.toParams()}"

    iframe = document.createElement('iframe')
    iframe.setAttribute('src', encodeURI(buttonUrl))
    iframe.setAttribute('id', @options.id)
    iframe.classList.add('podlove-subscribe-button-iframe')
    iframe.style.border = 'none'
    iframe.style.display = 'inline-block'
    iframe.style.overflow = 'hidden'

    IframeResizer.listen('resizeButton', iframe)

    IframeClick.listen(iframe, @openPopup, @options)

    if @options.buttonId
      customElement = document.querySelector(".podlove-subscribe-button-#{@options.buttonId}")
      return unless customElement
      customElement.addEventListener('click', (event) =>
        event.preventDefault()
        event.stopPropagation()
        @openPopup(@options)
        return false
      )
      
    iframe

  openPopup: (options) =>
    return if document.querySelectorAll('#podlove-subscribe-popup').length
    new Popup(@podcast, options)

window.SubscribeButton = SubscribeButton
window.Button = Button

# init the button
ready = false
ready = if document.attachEvent
  document.readyState == 'complete'
else
  document.readyState != 'loading'
if ready
  SubscribeButton.init()
else
  document.addEventListener('DOMContentLoaded', SubscribeButton.init)
