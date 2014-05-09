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

    @extractFeedUrl()
    @extractButtonLanguage()
    @renderIframe()

  extractFeedUrl: () ->
    @feedUrl = @scriptElem.dataset.url.replace(/^https?:\/\//, '')

  extractButtonLanguage: () ->
    @buttonLanguage = @scriptElem.dataset.lang || 'en'

  renderIframe: () ->
    iframe = @buildIframe()
    @scriptElem.parentElement.replaceChild(iframe, @scriptElem)

  buildIframe: () ->
    iframe = document.createElement('iframe')
    iframe.src = 'button.html?language=' + @buttonLanguage
    iframe.style.border = 'none'
    iframe.style.display = 'inline-block'
    iframe.style.overflow = 'hidden'

    iframe.onload = () =>
      iframe.contentDocument.addEventListener 'click', (event) =>
        new SubscribePopupIframe(iframe, @feedUrl)

    new IframeResizer('resizeButton', iframe)

    iframe

new SubscribeIt.init()

class SubscribePopupIframe
  constructor: (buttonIframe, feedUrl) ->
    @buttonIframe = buttonIframe
    @feedUrl = feedUrl

    @insert()
    @addCloseListener()

  build: () ->
    iframe = document.createElement('iframe')
    iframe.src = 'popup.html?feedUrl=' + @feedUrl
    iframe.style.border = 'none'
    iframe.style.position = 'absolute'

    iframe.style.top = @buttonDimensions().bottom + 'px'
    iframe.style.left = @buttonDimensions().left + 'px'

    new IframeResizer('resizePopup', iframe)

    @iframe = iframe

  insert: () ->
    document.body.appendChild(@build())

  remove: () ->
    @iframe.parentNode.removeChild(@iframe)

  addCloseListener: () ->
    document.body.addEventListener 'click', () ->
      document.body.dispatchEvent(new Event('click.subscribe-it'))

    removePopup = () =>
      @remove()
      document.body.removeEventListener 'click.subscribe-it', removePopup

    document.body.addEventListener 'click.subscribe-it', removePopup

  buttonDimensions: () ->
    @buttonRect ?= @buttonIframe.getBoundingClientRect()

class SubscribePopup
  constructor: () ->
    @list = document.getElementById('subscribe-it-list')
    @extractFeedUrl()
    @addButtons()
    @addLinkField()
    @resizeIframe()

  extractFeedUrl: () ->
    @feedUrl = window.location.search.split('=')[1]

  addButtons: () ->
    platform = SubscribeIt.UA.detect()
    for own clientId, clientData of SubscribeIt.Clients
      return if clientData.platform.indexOf(platform) == -1

      @addButton(clientData)

  addButton: (client) ->
    link = document.createElement('a')
    item = document.createElement('li')

    link.href = client.scheme + '://' + @feedUrl
    link.target = '_blank'
    link.innerHTML = client.title
    item.appendChild(link)

    @list.appendChild(item)

  addLinkField: () ->
    input = document.createElement('input')
    input.value = @feedUrl
    input.onclick = () ->
      this.select()

    item = document.createElement('li')
    item.className = 'subscribe-it-link-input'
    item.appendChild(input)

    @list.appendChild(item)

  resizeIframe: () ->
    height = document.body.offsetHeight
    width = document.body.offsetWidth
    resizeData = IframeResizer.buildData('resizePopup', height, width)
    window.parent.postMessage(resizeData, '*')

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
  instacast:
    title: 'Instacast'
    scheme: 'instacast'
    platform: ['ios', 'mac']
  pocketcasts:
    title: 'PocketCasts'
    scheme: 'pcast'
    platform: ['ios', 'android']
  applepodcastsapp:
    title: 'Apple Podcasts'
    scheme: 'pcast'
    platform: ['ios']
