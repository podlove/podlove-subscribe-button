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
    @feedUrl = @scriptElem.dataset.url

  extractButtonLanguage: () ->
    @buttonLanguage = @scriptElem.dataset.language || 'en'

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
        new SubscribePopupIframe(iframe, @feedUrl, @pathPrefix, @podcast, @buttonLanguage)

    new IframeResizer('resizeButton', iframe)

    iframe

new SubscribeIt.init()

class SubscribePopupIframe
  constructor: (buttonIframe, feedUrl, pathPrefix, podcast, language) ->
    @buttonIframe = buttonIframe
    @feedUrl = feedUrl
    @pathPrefix = pathPrefix
    @podcast = podcast
    @language = language

    @insert()
    @addCloseListener()

  build: () ->
    iframe = document.createElement('iframe')
    iframe.className = "subscribe-it-popup-iframe"
    iframe.src = "#{@pathPrefix}popup.html?feedUrl=#{@feedUrl}&language=#{@language}#{@podcastInfo()}"
    iframe.style.border = 'none'
    iframe.style.position = 'absolute'

    iframe.style.height = '100vh'
    iframe.style.width = '100vw'
    iframe.style.top = 0
    iframe.style.left = 0

    @iframe = iframe

  podcastInfo: () ->
    string = ''
    return string unless @podcast
    string += "&podcastName=#{@podcast.name}" if @podcast.name
    string += "&podcastCoverUrl=#{@podcast.coverUrl}" if @podcast.coverUrl
    string += "&podcastSubtitle=#{@podcast.subtitle}" if @podcast.subtitle

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
    @modal = document.getElementById('subscribe-it-popup-modal')
    @closeButton = document.getElementById('subscribe-it-popup-close-button')
    @leftSide = document.getElementById('subscribe-it-popup-modal-left')
    @middle = document.getElementById('subscribe-it-popup-modal-middle')
    @rightSide = document.getElementById('subscribe-it-popup-modal-right')
    @list = document.getElementById('subscribe-it-list')

    loc = window.location
    @pathPrefix = loc.href.replace(loc.search, '').match(/(^.*\/)/)[0]

    @addCloseHandler()

    @addList()

    @addOtherClientButton()

    @addPodcastInfo()

    @adjustHeight()

  adjustHeight: () ->
    panels = [@leftSide, @middle, @rightSide]
    clientHeights = (panel.clientHeight for panel in panels)
    maxHeight = Math.max.apply(null, clientHeights)
    panels.push(@modal)
    for panel in panels
      (panel.style.height = "#{maxHeight}px")

  addPodcastInfo: () ->
    if @params.podcastName
      name = document.createElement('strong')
      name.innerHTML = @params.podcastName
      @leftSide.appendChild(name)

    if @params.podcastSubtitle
      subtitle = document.createElement('div')
      subtitle.innerHTML = @params.podcastSubtitle
      @leftSide.appendChild(subtitle)

    if @params.podcastCoverUrl
      image = document.createElement('img')
      image.src = @params.podcastCoverUrl
      @leftSide.appendChild(image)

    heading = document.createElement('strong')
    heading.innerHTML = SubscribeIt.Translations.subscribe[@params.language]
    @leftSide.appendChild(heading)

    explanation = document.createElement('p')
    explanation.className = 'subscribe-it-explanation'
    explanation.innerHTML = SubscribeIt.Translations.explanation[@params.language]
    @leftSide.appendChild(explanation)

    nextButton = document.createElement('a')
    nextButton.className = 'subscribe-it-install-button'
    nextButton.innerHTML = SubscribeIt.Translations.next[@params.language]

    nextButton.addEventListener 'click', (event) ->
      this.parentNode.parentNode.className = 'show-middle'

    @leftSide.appendChild(nextButton)

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

  addList: () ->
    heading = document.getElementById('subscribe-it-list-heading')
    heading.innerHTML = SubscribeIt.Translations.launchClient[@params.language]

    @addBackButton(@middle, 'show-left')
    @addBackButton(@rightSide, 'show-middle')

    platform = SubscribeIt.UA.detect()
    clients = SubscribeIt.Utils.shuffle(SubscribeIt.Clients[platform])
    for client in clients
      @addButton(client)

  addBackButton: (addTo, targetClassName) ->
    backButton = document.createElement('a')
    backButton.className = 'subscribe-it-back-button'
    backButton.innerHTML = SubscribeIt.Translations.back[@params.language]
    backButton.addEventListener 'click', (event) ->
      this.parentNode.parentNode.className = targetClassName
    addTo.appendChild(backButton)

  addButton: (client) ->
    text = document.createElement('span')
    link = document.createElement('a')
    item = document.createElement('li')

    link.href = client.scheme + @params.feedUrl.replace(/^https?:\/\//, '')
    link.target = '_blank'

    text.innerHTML = client.title
    link.appendChild(text)

    if client.icon
      icon = document.createElement('img')
      icon.src = "#{@pathPrefix}images/#{client.icon}"
      link.insertBefore(icon, link.firstChild)

    item.appendChild(link)

    @list.appendChild(item)

    @addButtonAction(item, client)

  addOtherClientButton: () ->
    text = document.createElement('span')
    link = document.createElement('a')
    item = document.createElement('li')

    link.href = '#'

    text.innerHTML = SubscribeIt.Translations.otherClient[@params.language]
    link.appendChild(text)

    icon = document.createElement('img')
    icon.src = "#{@pathPrefix}images/rss.png"
    link.insertBefore(icon, link.firstChild)

    item.appendChild(link)

    @list.appendChild(item)

    item.addEventListener 'click', (event) =>
      paragraph = document.createElement('p')
      paragraph.innerHTML  = SubscribeIt.Translations.otherClientHelp[@params.language]
      @rightSide.appendChild(paragraph)

      @addLinkField(@rightSide, item)

  addButtonAction: (button, client) ->
    @addButtonHover(@rightSide, button, client)
    @addButtonClick(@rightSide, button, client)

  addButtonHover: (target, button, client) ->
    button.addEventListener 'mouseenter', (event) =>
      return if button.parentNode.className == 'clicked'

      target.innerHTML = ''

      helpText = document.createElement('p')
      text = SubscribeIt.Translations.help[@params.language]
      text = SubscribeIt.Template.render(text, {clientName: client.title})
      helpText.innerHTML = text
      target.appendChild(helpText)

    button.addEventListener 'mouseleave', (event) =>
      return if button.parentNode.className == 'clicked'
      target.innerHTML = ''

  addButtonClick: (target, button, client) ->
    button.addEventListener 'click', (event) =>
      button.parentNode.className = 'clicked'

      target.innerHTML = ''

      if client.install
        installText = document.createElement('p')
        text = SubscribeIt.Translations.clicked.install.text[@params.language]
        text = SubscribeIt.Template.render(text, {clientName: client.title})
        installText.innerHTML = "#{text}"
        target.appendChild(installText)

        installButton = document.createElement('a')
        installButton.className = 'subscribe-it-install-button'
        installButton.target = '_blank'
        installButton.href = client.install
        text = SubscribeIt.Translations.clicked.install.button[@params.language]
        installButton.innerHTML = SubscribeIt.Template.render(text, {clientName: client.title})
        target.appendChild(installButton)

      else
        text = SubscribeIt.Translations.clicked.noinstall.text[@params.language]
        target.innerHTML = "#{text}"

      doneButton = document.createElement('a')
      doneButton.className = 'subscribe-it-install-button subscribe-it-done-button'
      doneButton.href = '#'
      doneButton.addEventListener 'click', ->
        window.parent.postMessage("{\"message\": \"closepopup\"}", '*')
      doneButton.innerHTML = SubscribeIt.Translations.done[@params.language]
      target.appendChild(doneButton)

      event.currentTarget.parentNode.parentNode.parentNode.className = 'show-right'

  addLinkField: (target, button) ->
    button.parentNode.className = 'clicked'

    input = document.createElement('input')
    input.value = @params.feedUrl
    input.style.textAlign = 'center'
    input.onclick = () ->
      this.select()

    item = document.createElement('div')
    item.className = 'subscribe-it-link-input'
    item.appendChild(input)

    target.appendChild(item)

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

SubscribeIt.Template =
  render: (tmpl, vals) ->
    # default to doing no harm
    tmpl = tmpl or ""
    vals = vals or {}

    # regular expression for matching our placeholders; e.g., #{my-cLaSs_name77}
    rgxp = /\{([^{}]*)}/g

      # regex for text (markup) that should not be escaped; e..g., #{{html_content}}
    noEscapeRgxp = /\{{([^{}]*)}}/g

      # function to making replacements
    repr = (str, match) ->
      value = vals[match]
      (if (typeof value is "string" or typeof value is "number") then value else str)

      # non-escaped text (HTML)
    noEscapeRepr = (str, match) ->
      value = vals[match]
      (if (typeof value is "string" or typeof value is "number") then value else str)

    tmpl.replace noEscapeRgxp, noEscapeRepr

SubscribeIt.Utils =
  shuffle: (array) ->
    i = array.length
    while --i > 0
        j = ~~(Math.random() * (i + 1))
        t = array[j]
        array[j] = array[i]
        array[i] = t
    array

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
  osx: /macintosh/i
  windowsPhone: /windows phone/i

SubscribeIt.Translations =
  button:
    de: 'Abonnieren'
    en: 'Subscribe'
  done:
    de: 'Fertig'
    en: 'Done'
  subscribe:
    de: 'Podcast Abonnieren'
    en: 'Subscribe to Podcast'
  explanation:
    de: 'Um diesen Podcast zu abonnieren, bitte einen Client in der Mitte auswählen.'
    en: 'Please choose a client from the middle to subscribe to this Podcast.'
  help:
    de: 'Podcast abonnieren mit <strong>{{clientName}}</strong>'
    en: 'Subscribe to Podcast with <strong>{{clientName}}</strong>'
  launchClient:
    de: 'Client öffnen'
    en: 'Launch client'
  otherClient:
    de: 'Anderer Client'
    en: 'Other client'
  otherClientHelp:
    de: 'Kopiere die URL und füge sie in deinem Podcast Client hinzu.'
    en: 'Copy URL and add it to your Podcast Client.'
  next:
    de: 'Weiter'
    en: 'Next'
  back:
    de: 'Zurück'
    en: 'Back'
  clicked:
    noinstall:
      text:
        de: 'Falls nach dem Klick nichts passiert sein sollte, ist vermutlich kein Client installiert.'
        en: 'If nothing happened after the click you probably have not installed a Client.'
    install:
      text:
        de: 'Falls nach dem Klick nichts passiert sein sollte, kannst du <strong>{{clientName}}</strong> hier installieren:'
        en: 'If nothing happened after the click you can install <strong>{{clientName}}</strong> here:'
      button:
        de: '{{clientName}} Herunterladen'
        en: 'Download {{clientName}}'

SubscribeIt.Clients =
  android: [
    {
      title: 'AntennaPod'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/antennapod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod'
    },
    {
      title: 'BeyondPod'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/beyondpod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=mobi.beyondpod'
    },
    {
      title: 'PocketCasts'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/pocketcasts@2x.png'
      install: 'https://play.google.com/store/apps/details?id=au.com.shiftyjelly.pocketcasts'
    },
    {
      title: 'Podkicker'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/podkicker@2x.png'
      install: 'https://play.google.com/store/apps/details?id=ait.podka'
    },
    {
      title: 'uPod'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/upod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=mobi.upod.app'
    }
  ],
  ios: [
    {
      title: 'Apple Podcasts'
      scheme: 'pcast://'
      platform: ['ios']
      icon: 'ios/podcasts@2x.png'
      install: 'https://itunes.apple.com/de/app/podcasts/id525463029'
    },
    {
      title: 'Downcast'
      scheme: 'downcast://'
      platform: ['ios']
      icon: 'ios/downcast@2x.png'
      install: 'https://itunes.apple.com/de/app/downcast/id393858566'
    },
    {
      title: 'iCatcher'
      scheme: 'icatcher://'
      platform: ['ios']
      icon: 'ios/icatcher@2x.png'
      install: 'https://itunes.apple.com/de/app/icatcher!-podcast-app/id414419105'
    },
    {
      title: 'Instacast'
      scheme: 'instacast://'
      platform: ['ios']
      icon: 'ios/instacast@2x.png'
      install: 'https://itunes.apple.com/de/app/instacast-4-podcast-client/id577056377'
    },
    #{
      #title: 'PocketCasts'
      #scheme: 'pktc://'
      #platform: ['ios']
      #icon: 'ios/pocketcasts@2x.png'
      #install: 'https://itunes.apple.com/de/app/pocket-casts/id414834813'
    #},
    #{
      #title: 'Podcat'
      #scheme: 'podcat://'
      #platform: ['ios']
      #icon: 'ios/podcat@2x.png'
    #},
  ],
  osx: [
    {
      title: 'Downcast'
      scheme: 'downcast://'
      platform: ['osx']
      icon: 'osx/downcast@2x.png'
      install: 'https://itunes.apple.com/de/app/downcast/id668429425?mt=12&uo=4'
    },
    {
      title: 'Instacast'
      scheme: 'instacast://'
      platform: ['osx']
      icon: 'osx/instacast@2x.png'
      install: 'https://itunes.apple.com/de/app/instacast/id733258666?mt=12&uo=4'
    },
    {
      title: 'iTunes'
      scheme: 'itpc://'
      platform: ['osx']
      icon: 'osx/itunes@2x.png'
      install: 'http://www.apple.com/itunes/'
    }
  ],
  windowsPhone: [
    {
      title: 'Podcasts'
      scheme: 'wp-podcast://'
      platform: 'windowsPhone'
    }
  ]
