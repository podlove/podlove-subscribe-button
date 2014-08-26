$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars
_ = require('../../vendor/underscore-min.js')

Clients = require('./clients.coffee')
Panel = require('./panel.coffee')
UserAgent = require('./user_agent.coffee')

class ClientsPanel extends Panel
  constructor: (@container, @parent) ->
    @podcast = @parent.podcast
    @platform = new UserAgent().detect()
    @clients = new Clients(@platform)
    @prepareClients(@parent.options.scriptPath)

    @render()

  context: -> {
    cover: @podcast.cover,
    title: @podcast.title,
    subtitle: @podcast.subtitle,
    clients: @clients,
    platform: @platform,
  }

  prepareClients: (pathPrefix) ->
    for client in @clients
      client.icon = "#{pathPrefix}images/#{client.icon}"
      feedUrl = @podcast.feeds.aac.replace('http://', '')
      client.url = "#{client.scheme}#{feedUrl}"

    _(@clients).shuffle()

  render: () ->
    @elem = $(@template(@context()))
    @container.append(@elem)

    @elem.find('.back-button').on 'click', (event) =>
      @parent.movePodcast('0%')
      @parent.moveClients('100%')

    @elem.find('li a').on 'click', (event) =>
      client = $(event.target).data('client')
      @showClient(client)

  showClient: (clientTitle) ->
    @parent.moveClients('-100%')
    @parent.moveFinish('0%')

    client = _(this.clients).findWhere({title: clientTitle})
    @parent.finishPanel.render(client)

  template: Handlebars.compile('
    <div>
      <div class="top-bar">
        <span class="back-button">&lsaquo;</span>
      </div>
      <ul>
        {{#each clients}}
        <li>
          <a href="{{url}}" data-client="{{title}}" target="_blank">
            <img src="{{icon}}">
            {{title}}
          </a>
        </li>
        {{/each}}
      </ul>
    </div>
  ')

module.exports = ClientsPanel
