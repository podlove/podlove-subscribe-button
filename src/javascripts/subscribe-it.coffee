class IframeResizer
  constructor: (listenTo, iframe, offset = {}, callback) ->
    window.addEventListener('message', ((event) =>
      resizeData = JSON.parse(event.data)

      return unless resizeData.id == iframe.id
      return unless resizeData.listenTo == listenTo

      height = resizeData.height + (offset.height || 0)
      width = resizeData.width + (offset.width || 0)
      iframe.style.height = "#{height}px"
      iframe.style.width = "#{width}px"

      callback(iframe) if callback?
    ), false)

  @buildData: (listenTo, height, width, iframeId) ->
    "{\"id\": \"#{iframeId}\", \"listenTo\": \"#{listenTo}\", \"height\": #{height}, \"width\": #{width}}"


class SubscribeIt
  @init: (elemName = 'subscribe-it') ->
    elems = document.getElementsByName(elemName)

    new SubscribeIt elem for elem in elems

  constructor: (scriptElem) ->
    @scriptElem = scriptElem

    @extractScriptPath()
    @extractFeedUrl()
    @extractButtonLanguage()
    @extractButtonSize()
    @extractPodcastData()
    @renderIframe()

  extractScriptPath: () ->
    @pathPrefix = @scriptElem.src.match(/(^.*\/)/)[0]

  extractFeedUrl: () ->
    @feedUrl = @scriptElem.dataset.url.replace(/^https?:\/\//, '')

  extractButtonLanguage: () ->
    @buttonLanguage = @scriptElem.dataset.lang || 'en'

  extractButtonSize: () ->
    @buttonSize = @scriptElem.dataset.size || 'medium'

  extractPodcastData: () ->
    if string = @scriptElem.dataset.podcast
      @podcast = JSON.parse(string.replace(/'/g, '"'))

  buttonParams: () ->
    {
      size: @buttonSize,
      language: @buttonLanguage,
    }

  renderIframe: () ->
    iframe = @buildIframe()
    @scriptElem.parentElement.replaceChild(iframe, @scriptElem)

  buildIframe: () ->
    id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    iframe = document.createElement('iframe')
    iframe.src = "#{@pathPrefix}button.html?language=#{@buttonLanguage}&size=#{@buttonSize}&id=#{id}"
    iframe.style.border = 'none'
    iframe.style.display = 'block'
    iframe.style.overflow = 'hidden'
    iframe.className = 'podlove-subscribe-button'
    iframe.id = id

    iframe.onload = () =>
      iframe.contentDocument.addEventListener 'click', (event) =>
        new SubscribePopupIframe(iframe, @feedUrl, @pathPrefix, @podcast)

    new IframeResizer('resizeButton', iframe)

    iframe

new SubscribeIt.init()

class SubscribePopupIframe
  constructor: (buttonIframe, feedUrl, pathPrefix, podcast) ->
    @buttonIframe = buttonIframe
    @feedUrl = feedUrl
    @pathPrefix = pathPrefix
    @podcast = podcast

    @insert()
    @addCloseListener()

  build: () ->
    iframe = document.createElement('iframe')
    iframe.className = "subscribe-it-popup-iframe"
    iframe.src = "#{@pathPrefix}popup.html?feedUrl=#{@feedUrl}&podcastName=#{@podcast.name}&podcastCoverUrl=#{@podcast.coverUrl}"
    iframe.style.border = 'none'
    iframe.style.position = 'absolute'

    iframe.style.height = '100vh'
    iframe.style.width = '100vw'
    iframe.style.top = 0
    iframe.style.left = 0

    @iframe = iframe

  insert: () ->
    document.body.appendChild(@build())

  remove: () ->
    @iframe.parentNode.removeChild(@iframe)

  addCloseListener: () ->
    document.body.addEventListener 'click', () ->
      document.body.dispatchEvent(new Event('click.subscribe-it'))

    reactToPopupMessage = (event) ->
      if JSON.parse(event.data).message == 'closepopup'
        removePopup()

    window.addEventListener('message', reactToPopupMessage, false)

    document.body.addEventListener 'click.subscribe-it', removePopup

    removePopup = () =>
      @remove()
      document.body.removeEventListener 'click.subscribe-it', removePopup
      window.removeEventListener('message', reactToPopupMessage, false)

  buttonDimensions: () ->
    @buttonRect ?= @buttonIframe.getBoundingClientRect()

class SubscribePopup
  constructor: () ->
    @extractParams()

    @body = document.getElementById('subscribe-it-popup')
    @container = document.getElementById('subscribe-it-list-container')
    @closeButton = document.getElementById('subscribe-it-popup-close-button')
    @leftSide = document.getElementById('subscribe-it-popup-modal-left')
    @list = document.getElementById('subscribe-it-list')

    loc = window.location
    @pathPrefix = loc.href.replace(loc.search, '').match(/(^.*\/)/)[0]

    @addCloseHandler()
    @addButtons()
    #@addLinkField()

    @addPodcastInfo()

  addPodcastInfo: () ->
    name = document.createElement('div')
    name.innerHTML = @params.podcastName
    @leftSide.appendChild(name)

    image = document.createElement('img')
    image.src = @params.podcastCoverUrl
    @leftSide.appendChild(image)

  extractParams: () ->
    string = window.location.search.replace(/^\?/, '')
    split = string.split('&')
    @params = {}
    @buildParamObject(param, @params) for param in split

  buildParamObject: (string, object) ->
    array = string.split('=')
    object[array[0]] = decodeURIComponent(array[1])

  addCloseHandler: () ->
    close = () ->
      window.parent.postMessage("{\"message\": \"closepopup\"}", '*')

    @closeButton.addEventListener 'click', () ->
      close()

  addButtons: () ->
    platform = SubscribeIt.UA.detect()
    for own clientId, clientData of SubscribeIt.Clients
      unless clientData.platform.indexOf(platform) == -1
        @addButton(clientData)

  addButton: (client) ->
    text = document.createElement('span')
    link = document.createElement('a')
    item = document.createElement('li')


    link.href = client.scheme + '://' + @params.feedUrl
    link.target = '_blank'

    text.innerHTML = client.title
    link.appendChild(text)

    if client.icon
      icon = document.createElement('img')
      icon.src = "#{@pathPrefix}images/#{client.icon}"
      link.insertBefore(icon, link.firstChild)

    item.appendChild(link)

    @list.appendChild(item)

  addLinkField: () ->
    @inputContainer = document.getElementById('subscribe-it-feed-link-input')
    input = document.createElement('input')
    input.value = @params.feedUrl
    input.style.textAlign = 'center'
    input.onclick = () ->
      this.select()

    item = document.createElement('div')
    item.className = 'subscribe-it-link-input'
    item.appendChild(input)

    @inputContainer.appendChild(item)

class SubscribeButton
  constructor: () ->
    @extractParams()

    lang = window.location.search.split('=')[1]
    size = window.location.search.split('=')[1]
    elem = document.getElementById('subscribe-it-button')
    elem.className = @params.size
    elem.innerHTML = "<span>#{SubscribeIt.Translations.button[@params.language]}</span>"

    @resizeIframe(elem)

  extractParams: () ->
    string = window.location.search.replace(/^\?/, '')
    split = string.split('&')
    @params = {}
    @buildParamObject(param, @params) for param in split

  buildParamObject: (string, object) ->
    array = string.split('=')
    object[array[0]] = array[1]

  resizeIframe: (elem) ->
    styles = document.defaultView.getComputedStyle(elem)

    #borderTop = parseInt(styles.borderTopWidth, 10)
    #borderBottom = parseInt(styles.borderBottomWidth, 10)
    #borderLeft = parseInt(styles.borderLeftWidth, 10)
    #borderRight = parseInt(styles.borderRightWidth, 10)
    height = parseInt(styles.height, 10)
    width = parseInt(styles.width, 10)
    newHeight = height + 2 # + borderTop + borderBottom
    newWidth = width# + borderLeft + borderRight - 2

    resizeData = IframeResizer.buildData('resizeButton', newHeight, newWidth, @params.id)
    window.parent.postMessage(resizeData, '*')

SubscribeIt.UA = (() ->
  {
    detect: () ->
      userAgent = (window.navigator && navigator.userAgent) || ""

      for own ua, regex of SubscribeIt.UAs
        if regex.test(userAgent)
          return ua
  }
)()

SubscribeIt.UAs =
  android: /android/i
  ios: /(ipad|iphone|ipod)/i
  linux: /linux/i
  mac: /macintosh/i
  windowsPhone: /windows phone/i

SubscribeIt.Translations =
  button:
    de: 'Abonnieren'
    en: 'Subscribe'
    fr: 'S\'Abonner'

SubscribeIt.Clients =
  antennapod:
    title: 'AntennaPod'
    scheme: 'pcast'
    platform: ['android']
  applepodcastsapp:
    title: 'Apple Podcasts'
    scheme: 'pcast'
    platform: ['ios']
  beyondpod:
    title: 'BeyondPod'
    scheme: 'pcast'
    platform: ['android']
  downcast:
    title: 'Downcast'
    scheme: 'downcast'
    platform: ['ios', 'mac']
    icon: 'downcast.png'
  instacast:
    title: 'Instacast'
    scheme: 'instacast'
    platform: ['ios', 'mac']
    icon: 'instacast.png'
  itunes:
    title: 'iTunes'
    scheme: 'itpc'
    platform: ['mac']
    icon: 'itunes.png'
  pocketcasts:
    title: 'PocketCasts'
    scheme: 'pcast'
    platform: ['android']
    icon: 'pocketcasts.png'
  pocketcasts:
    title: 'PocketCasts'
    scheme: 'pktc'
    platform: ['ios']
    icon: 'pocketcasts.png'
  podcat:
    title: 'Podcat'
    scheme: 'podcat'
    platform: ['ios']
  windowspodcastsapp:
    title: 'Podcasts'
    scheme: 'podcast'
    platform: 'windowsPhone'
  windowstest:
    title: 'Other App'
    scheme: 'wp-podcast'
    platform: 'windowsPhone'
