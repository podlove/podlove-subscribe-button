$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars
Translations = require('./translations.coffee')

Panel = require('./panel.coffee')

class PodcastPanel extends Panel
  constructor: (@container, @parent) ->
    @podcast = @parent.podcast
    @render()

  context: -> {
    cover: @podcast.cover,
    title: new Handlebars.SafeString(@podcast.title),
    subtitle: new Handlebars.SafeString(@podcast.subtitle),
    scriptPath: @parent.options.scriptPath,
  }

  render: () ->
    @elem = $(@template(@context()))
    @container.append(@elem)

    @elem.find('button').on 'click', (event) =>
      @parent.moveClients('0%')
      @parent.movePodcast('-100%')

  template: Handlebars.compile('
    <div>
      {{#if cover}}
      <img class="podcast-cover" src="{{cover}}" alt="Logo of {{title}}">
      {{/if}}
      <div class="podlove-subscribe-popup-podcast-text">
        <h1>{{title}}</h1>
        <p>{{subtitle}}</p>
      </div>
      <button class="podlove-subscribe-button">{{t "podcast_panel.choose_client"}}</button>
    </div>
  ')

module.exports = PodcastPanel
