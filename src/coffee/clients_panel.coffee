$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars
_ = require('../../vendor/underscore-min.js')

Clients = require('./clients.coffee')
Panel = require('./panel.coffee')
UserAgent = require('./user_agent.coffee')

class ClientsPanel extends Panel
  constructor: (@container, @parent) ->
    @podcast = @parent.podcast
    @render()

  context: -> {
    cover: @podcast.cover,
    title: @podcast.title,
    subtitle: @podcast.subtitle,
    clients: @clients(),
  }

  clients: () ->
    pathPrefix = @parent.options.scriptPath
    @platform = new UserAgent().detect()
    clients = new Clients()[@platform]

    _(clients).each (client) ->
      client.icon = "#{pathPrefix}images/#{client.icon}"

    return unless clients

    _(clients).shuffle()

  render: () ->
    @elem = $(@template(@context()))
    @container.append(@elem)

    @elem.find('.back-button').on 'click', (event) =>
      @parent.goToPodcast()

  template: Handlebars.compile('
    <div>
      <div class="top-bar">
        <span class="back-button">&lsaquo;</span>
      </div>
      <ul>
        {{#each clients}}
        <li>
          <img src="{{icon}}">
          {{title}}
        </li>
        {{/each}}
      </ul>
    </div>
  ')

module.exports = ClientsPanel
