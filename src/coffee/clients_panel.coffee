$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars
_ = require('../../vendor/underscore-min.js')

Utils = require('./utils.coffee')
Clients = require('./clients.coffee')
Panel = require('./panel.coffee')

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
    feedUrlWithOutHttp = feed.url.replace(/^(http|https):\/\//, '')
    return false unless feed.url

    for client in @clients
      Utils.fixIconPath(client, pathPrefix)

      standardUrl = "#{client.scheme}#{feedUrlWithOutHttp}"
      client.url = if type = client.customFeedType
        if customUrl = feed["directory-url-#{type}"]
          customUrl
        else
          standardUrl
      else
        standardUrl


    _(@clients).shuffle()

    for client in @cloudClients
      Utils.fixIconPath(client, pathPrefix)
      cloudFeedUrl = if client.http then feed.url else feedUrlWithOutHttp
      if client.post
        client.url = client.scheme
        client.feedUrl = cloudFeedUrl
      else
        client.url = "#{client.scheme}#{cloudFeedUrl}"

    _(@cloudClients).shuffle()

    Utils.fixIconPath(@osDefault, pathPrefix)
    @osDefault.title = 'Let device decide'
    @osDefault.originalUrl = feed.url
    unless @osDefault.scheme == null
      @osDefault.url = "#{@osDefault.scheme}#{feedUrlWithOutHttp}"
      # necessary for displaying the right finish panel content
      @osDefault.scheme = null

    @otherClient = new Clients('rss')
    Utils.fixIconPath(@otherClient, pathPrefix)
    @otherClient.originalUrl = feed.url

  render: () ->
    @elem = $(@template(@context()))
    @container.append(@elem)

    @elem.find('li a').on 'click', (event) =>
      client = $(event.target).data('client')
      platform = $(event.target).data('platform')
      url = $(event.target).attr('href')
      @showClient(client, platform, url)

    @elem.find('.podlove-subscribe-local').on 'click', (event) =>
      @elem.find('.local-clients').show()
      @elem.find('.cloud-clients').hide()
      $(event.target).addClass('active')
      $(event.target).next().removeClass('active')

    @elem.find('.podlove-subscribe-cloud').on 'click', (event) =>
      @elem.find('.local-clients').hide()
      @elem.find('.cloud-clients').show()
      $(event.target).addClass('active')
      $(event.target).prev().removeClass('active')

    form = @elem.find('li form')
    if form.length
      form.find('a').off 'click'
      form.find('a').on 'click', (event) =>
        event.preventDefault()

        form.submit()

        client = $(event.target).data('client')
        platform = $(event.target).data('platform')
        url = $(event.target).attr('href')
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
    <div>
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
