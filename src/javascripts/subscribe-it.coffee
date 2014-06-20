class IframeResizer
  constructor: (listenTo, iframe, offset = {}, callback) ->
    window.addEventListener('message', ((event) ->
      resizeData = JSON.parse(event.data)

      return unless resizeData.id == listenTo

      height = resizeData.height + (offset.height || 0)
      width = resizeData.width + (offset.width || 0)
      iframe.style.height = "#{height}px"
      iframe.style.width = "#{width}px"

      callback(iframe) if callback?
    ), false)

  @buildData: (id, height, width) ->
    "{\"id\": \"#{id}\", \"height\": #{height}, \"width\": #{width}}"


class SubscribeIt
  @init: (elemName = 'subscribe-it') ->
    elems = document.getElementsByName(elemName)

    new SubscribeIt elem for elem in elems

  constructor: (scriptElem) ->
    @scriptElem = scriptElem

    @extractScriptPath()
    @extractFeedUrl()
    @extractButtonLanguage()
    @renderIframe()

  extractScriptPath: () ->
    @pathPrefix = @scriptElem.src.match(/(^.*\/)/)[0]

  extractFeedUrl: () ->
    @feedUrl = @scriptElem.dataset.url.replace(/^https?:\/\//, '')

  extractButtonLanguage: () ->
    @buttonLanguage = @scriptElem.dataset.lang || 'en'

  renderIframe: () ->
    iframe = @buildIframe()
    @scriptElem.parentElement.replaceChild(iframe, @scriptElem)

  buildIframe: () ->
    iframe = document.createElement('iframe')
    iframe.src = "#{@pathPrefix}button.html?language=#{@buttonLanguage}"
    iframe.style.border = 'none'
    iframe.style.display = 'block'
    iframe.style.overflow = 'hidden'
    iframe.className = 'podlove-subscribe-button'

    iframe.onload = () =>
      iframe.contentDocument.addEventListener 'click', (event) =>
        new SubscribePopupIframe(iframe, @feedUrl, @pathPrefix)

    new IframeResizer('resizeButton', iframe)

    iframe

new SubscribeIt.init()

class SubscribePopupIframe
  constructor: (buttonIframe, feedUrl, pathPrefix) ->
    @buttonIframe = buttonIframe
    @feedUrl = feedUrl
    @pathPrefix = pathPrefix

    @insert()
    @addCloseListener()

  build: () ->
    iframe = document.createElement('iframe')
    iframe.className = "subscribe-it-popup-iframe"
    iframe.src = "#{@pathPrefix}popup.html?feedUrl=#{@feedUrl}"
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
    @body = document.getElementById('subscribe-it-popup')
    @container = document.getElementById('subscribe-it-list-container')
    @closeButton = document.getElementById('subscribe-it-popup-close-button')
    @list = document.getElementById('subscribe-it-list')

    loc = window.location
    @pathPrefix = loc.href.replace(loc.search, '').match(/(^.*\/)/)[0]

    @addCloseHandler()
    @extractFeedUrl()
    @addButtons()
    @addLinkField()

    @centerContainer()
    window.setInterval (() =>
      @centerContainer()
    ), 1000


  addCloseHandler: () ->
    close = () ->
      window.parent.postMessage("{\"message\": \"closepopup\"}", '*')

    @closeButton.addEventListener 'click', () ->
      close()

  extractFeedUrl: () ->
    @feedUrl = window.location.search.split('=')[1]

  addButtons: () ->
    platform = SubscribeIt.UA.detect()
    for own clientId, clientData of SubscribeIt.Clients
      unless clientData.platform.indexOf(platform) == -1
        @addButton(clientData)

  addButton: (client) ->
    link = document.createElement('a')
    item = document.createElement('li')


    link.href = client.scheme + '://' + @feedUrl
    link.target = '_blank'
    link.innerHTML = client.title

    if client.icon
      icon = document.createElement('img')
      icon.src = "#{@pathPrefix}images/#{client.icon}"
      link.insertBefore(icon, link.firstChild)

    item.appendChild(link)

    @list.appendChild(item)

  addLinkField: () ->
    @inputContainer = document.getElementById('subscribe-it-feed-link-input')
    input = document.createElement('input')
    input.value = @feedUrl
    input.onclick = () ->
      this.select()

    item = document.createElement('div')
    item.className = 'subscribe-it-link-input'
    item.appendChild(input)

    @inputContainer.appendChild(item)

  centerContainer: () ->
    height = @container.clientHeight
    bodyHeight = @body.clientHeight
    @container.style.marginTop = "#{(bodyHeight - height)/2}px"

class SubscribeButton
  constructor: () ->
    lang = window.location.search.split('=')[1]
    elem = document.getElementById('subscribe-it-button')
    elem.innerHTML = SubscribeIt.Translations.button[lang]

    height = elem.offsetHeight
    width = elem.clientWidth
    resizeData = IframeResizer.buildData('resizeButton', height, width)
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
    platform: ['android', 'ios']
  podcat:
    title: 'Podcat'
    scheme: 'podcat'
    platform: ['ios']
  windowstest:
    title: 'Subscribe'
    scheme: 'wp-podcast'
    platform: 'windowsPhone'
