$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars
_ = require('../../vendor/underscore-min.js')

Utils = require('./utils.coffee')
Clients = require('./clients.coffee')
Panel = require('./panel.coffee')
UserAgent = require('./user_agent.coffee')

class ClientsPanel extends Panel
  constructor: (@container, @parent) ->
    @podcast = @parent.podcast
    @platform = new UserAgent().detect()
    @clients = new Clients(@platform)
    @osDefault = new Clients(@platform, true)
    @cloudClients = new Clients('cloud')
    @prepareClients(@parent.options.scriptPath)

    @render()

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
  }

  prepareClients: (pathPrefix) ->
    feedUrl = @podcast.feeds.aac

    for client in @clients
      Utils.fixIconPath(client, pathPrefix)
      client.url = "#{client.scheme}#{feedUrl.replace('http://', '')}"

    _(@clients).shuffle()

    for client in @cloudClients
      Utils.fixIconPath(client, pathPrefix)
      feedUrl = feedUrl.replace('http://', '') unless client.http
      client.url = "#{client.scheme}#{feedUrl}"

    _(@cloudClients).shuffle()

    Utils.fixIconPath(@osDefault, pathPrefix)
    @osDefault.title = 'Let device decide'
    @osDefault.url = feedUrl

    @otherClient = new Clients('rss')
    Utils.fixIconPath(@otherClient, pathPrefix)
    @otherClient.url = feedUrl

  render: () ->
    @elem = $(@template(@context()))
    @container.append(@elem)

    @elem.find('.podlove-subscribe-back-button').on 'click', (event) =>
      @parent.movePodcast('0%')
      @parent.moveClients('100%')

    @elem.find('li a').on 'click', (event) =>
      client = $(event.target).data('client')
      platform = $(event.target).data('platform')
      @showClient(client, platform)

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

  showClient: (clientTitle, platform) ->
    @parent.moveClients('-100%')
    @parent.moveFinish('0%')

    client = if clientTitle == 'rss'
      @otherClient
    else if platform == 'cloud'
      _(@cloudClients).findWhere({title: clientTitle})
    else
      _(@clients).findWhere({title: clientTitle})

    @parent.finishPanel.render(client)

  template: Handlebars.compile('
    <div>
      <div class="top-bar">
        <span class="podlove-subscribe-back-button">&lsaquo;</span>
        <img src="{{scriptPath}}/images/icon-big@2x.png">
        <span class="panel-title">Subscribe</span>
      </div>
      <div class="device-cloud-switch">
        <button class="podlove-subscribe-local active">App</button>
        <button class="podlove-subscribe-cloud">Cloud</button>
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
              {{otherClient.title}}
            </a>
          </li>
        </ul>
        <ul class="cloud-clients">
          {{#each cloudClients}}
          <li>
            <a href="{{url}}" data-client="{{title}}" data-platform="cloud" target="_blank">
              <img src="{{icon}}">
              {{title}}
            </a>
          </li>
          {{/each}}
        </ul>
      </div>
    </div>
  ')

module.exports = ClientsPanel