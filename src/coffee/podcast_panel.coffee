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
    title: @podcast.title,
    subtitle: @podcast.subtitle,
    scriptPath: @parent.options.scriptPath,
  }

  render: () ->
    @elem = $(@template(@context()))
    @container.append(@elem)

    @elem.find('#podlove-subscribe-popup-help-button').on 'click', (event) =>
      @elem.find('#podlove-subscribe-button-help-panel').toggleClass('visible')
      $(event.currentTarget).toggleClass('active')

    @elem.find('button').on 'click', (event) =>
      @parent.moveClients('0%')
      @parent.movePodcast('-100%')

  template: Handlebars.compile('
    <div>
      <div class="top-bar">
        <span id="podlove-subscribe-popup-help-button">
          <span class="questionmark">?</span>
          <span class="podlove-subscribe-back-button">&lsaquo;</span>
        </span>
        <img src="{{scriptPath}}/images/icon-big@2x.png">
        <span class="panel-title">{{t "panels.title"}}</span>
      </div>
      {{#if cover}}
      <img class="podcast-cover" src="{{cover}}">
      {{/if}}
      <h1>{{title}}</h1>
      <p>{{subtitle}}</p>
      <button class="podlove-subscribe-button">{{t "podcast_panel.choose_client"}}</button>

      <div id="podlove-subscribe-button-help-panel">
        <div class="podlove-subscribe-button-help-panel-content">
          <h2>{{t "help_panel.title"}}</h2>
          <p>{{t "help_panel.paragraph1"}}</p>

          <p>{{t "help_panel.paragraph2"}}</p>

          <p>{{t "help_panel.paragraph3"}}</p>
        </div>
      </div>
    </div>
  ')

module.exports = PodcastPanel
