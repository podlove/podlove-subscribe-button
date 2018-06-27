Handlebars = require('handlebars')
_ = require('underscore')

Utils = require('./utils.coffee')
Clients = require('./clients.coffee')
Panel = require('./panel.coffee')

prepareURL =(url, scheme, http, encodeHttp, encodePath) ->
  parser = document.createElement('a');
  parser.href = url;
  preparedURL = ""
  preparedURL += scheme
  if http
    preparedURL +=
      if encodeHttp then encodeURIComponent(parser.protocol + "//")
      else parser.protocol + "//"
  preparedURL +=
    if encodePath then encodeURIComponent(parser.host + parser.pathname + parser.search)
    else parser.host + parser.pathname + parser.search
  console.log(preparedURL)
  return preparedURL

class ClientsPanel extends Panel
  constructor: (@container, @parent) ->
    @podcast = @parent.podcast
    @platform = @parent.platform
    @clients = new Clients(@platform)
    @osDefault = new Clients(@platform, true)
    @cloudClients = new Clients('cloud')
    if @prepareClients(@parent.options.scriptPath)
      @render()
    else
      text = 'No usable feed found. Please add at least one feed.'
      console.warn(text)

  context: -> {
    cover: @podcast.cover,
    title: @podcast.title,
    subtitle: @podcast.subtitle,
    clients: @clients,
    platform: @platform,
    otherClient: @otherClient,
    cloudClients: @cloudClients,
    osDefault: @osDefault,
    scriptPath: @parent.options.scriptPath,
    podcastTitle: @podcast.title,
    podcastSubtitle: @podcast.subtitle,
    podcastCover: @podcast.cover,
  }

  detectBestFormat: () ->
    capabilities = if @platform == 'android'
      ['mp3', 'aac', 'ogg', 'opus']
    else
      ['aac', 'mp3', 'ogg', 'opus']

    _(capabilities).find (cap) =>
      _(@podcast.feeds).findWhere({format: cap})

  chooseFeed: () ->
    format = @detectBestFormat()
    feed = _(@podcast.feeds).findWhere({format: format})

  findCustomFeed: (type) =>
    (_(@podcast.feeds).findWhere({type: type}) || {}).url

  prepareClients: (pathPrefix) ->
    feed = @chooseFeed() || {}
    return false unless feed.url

    for client in @clients
      Utils.fixIconPath(client, pathPrefix)
      client.url = if type = client.customFeedType
        if customUrl = feed["directory-url-#{type}"]
          customUrl
        else
          prepareURL feed.url,client.scheme,client.http,client.encodeHttp,client.encodePath
      else
        prepareURL feed.url,client.scheme,client.http,client.encodeHttp,client.encodePath

    _(@clients).shuffle()

    for client in @cloudClients
      Utils.fixIconPath(client, pathPrefix)
      if client.post
        client.url = client.scheme
        client.feedUrl = cloudFeedUrl
      else
        client.url = prepareURL feed.url,client.scheme,client.http,client.encodeHttp,client.encodePath

    _(@cloudClients).shuffle()

    Utils.fixIconPath(@osDefault, pathPrefix)
    @osDefault.title = @parent.I18n.t('clients_panel.let_device_decide')
    @osDefault.originalUrl = feed.url
    unless @osDefault.scheme == null
      @osDefault.url = prepareURL feed.url,@osDefault.scheme
      # necessary for displaying the right finish panel content
      @osDefault.scheme = null

    @otherClient = new Clients('rss')
    Utils.fixIconPath(@otherClient, pathPrefix)
    @otherClient.originalUrl = feed.url

  render: () ->
    html = @template(@context())
    @container.insertAdjacentHTML('beforeend', html)
    @elem = @container.querySelector('.podlove-subscribe-button-clients-panel')

    items = @elem.querySelectorAll('li a')
    Array.prototype.forEach.call items, (item) =>
      item.addEventListener 'click', (event) =>
        client = event.target.dataset.client
        platform = event.target.dataset.platform
        url = event.target.getAttribute('href')
        @showClient(client, platform, url)

    @elem.querySelector('.podlove-subscribe-local').addEventListener 'click', (event) =>
      @elem.querySelector('.local-clients').style.display = 'block'
      @elem.querySelector('.cloud-clients').style.display = 'none'
      event.target.classList.add('active')
      event.target.nextElementSibling.classList.remove('active')

    @elem.querySelector('.podlove-subscribe-cloud').addEventListener 'click', (event) =>
      @elem.querySelector('.local-clients').style.display = 'none'
      @elem.querySelector('.cloud-clients').style.display = 'block'
      event.target.classList.add('active')
      event.target.previousElementSibling.classList.remove('active')

    form = @elem.querySelector('li form')
    if form
      form.querySelector('a').removeEventListener 'click'
      form.querySelector('a').addEventListener 'click', (event) =>
        event.preventDefault()

        form.submit()

        client = event.target.dataset.client
        platform = event.target.dataset.platform
        url = event.target.getAttribute('href')
        @showClient(client, platform, url)

  showClient: (clientTitle, platform, url) ->
    @parent.movePanels(2)

    client = if clientTitle == 'rss'
      @otherClient
    else if platform == 'cloud'
      _(@cloudClients).findWhere({title: clientTitle})
    else
      _(@clients).findWhere({title: clientTitle})

    client ?= @osDefault
    @parent.finishPanel.render(client, @podcast)

  template: Handlebars.compile('
    <div class="podlove-subscribe-button-clients-panel">
      <div class="device-cloud-switch">
        <button class="podlove-subscribe-local active">{{t "clients_panel.app"}}<span class="podlove-subscribe-tab-active"></span></button><!--
        --><button class="podlove-subscribe-cloud">{{t "clients_panel.cloud"}}<span class="podlove-subscribe-tab-active"></span></button>
      </div>

      <div class="client-list">
        <ul class="local-clients">
          {{#if osDefault.icon}}
          <li>
            <a href="{{osDefault.url}}" data-client="{{osDefault.title}}" target="_blank">
              <img src="{{osDefault.icon}}">
              {{osDefault.title}}
            </a>
          </li>
          {{/if}}

          {{#each clients}}
          <li>
            <a href="{{url}}" data-client="{{title}}" target="_blank">
              <img src="{{icon}}">
              {{title}}
            </a>
          </li>
          {{/each}}
          <li>
            <a data-client="rss">
              <img src="{{otherClient.icon}}">
              {{t "clients_panel.other_client"}}
            </a>
          </li>
        </ul>
        <ul class="cloud-clients">
          {{#each cloudClients}}
          <li>
            {{#if post}}
              <form method="post" action="{{url}}" target="_blank">
                <input type="hidden" name="url" value="{{feedUrl}}">
                <input type="hidden" name="title" value="{{../../podcastTitle}}">
                <input type="hidden" name="subtitle" value="{{../../podcastSubtitle}}">
                <input type="hidden" name="image" value="{{../../podcastCover}}">

                <a href="{{url}}" data-client="{{title}}" data-platform="cloud">
                  <img src="{{icon}}">
                  {{title}}
                </a>
              </form>
            {{else}}
              <a href="{{url}}" data-client="{{title}}" data-platform="cloud" target="_blank">
                <img src="{{icon}}">
                {{title}}
              </a>
            {{/if}}
          </li>
          {{/each}}
        </ul>
      </div>
    </div>
  ')

module.exports = ClientsPanel
