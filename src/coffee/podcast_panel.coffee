Handlebars = require('handlebars')
Translations = require('./translations.coffee')

Panel = require('./panel.coffee')

class PodcastPanel extends Panel
  constructor: (@container, @parent) ->
    @podcast = @parent.podcast

    if @podcast.subtitle && @podcast.subtitle != ''
      @podcast.subtitle = new Handlebars.SafeString(@podcast.subtitle)

    @render()

  context: -> {
    cover: @podcast.cover,
    title: new Handlebars.SafeString(@podcast.title),
    subtitle: @podcast.subtitle,
    scriptPath: @parent.options.scriptPath,
  }

  render: () ->
    html = @template(@context())
    @container.insertAdjacentHTML('beforeend', html)
    @elem = @container.querySelector('.podlove-subscribe-button-podcast-panel')

    @elem.querySelector('button').addEventListener 'click', (event) =>
      @parent.movePanels(1)

  template: Handlebars.compile('
    <div class="podlove-subscribe-button-podcast-panel{{#if subtitle}} podcast-has-subtitles"{{/if}}>
      {{#if cover}}
      <img class="podcast-cover" src="{{cover}}" alt="Logo of {{title}}">
      {{else}}
      <div class="podcast-cover-placeholder"></div>
      {{/if}}
      <div class="podlove-subscribe-popup-podcast-text">
        <h1>{{title}}</h1>
        {{#if subtitle}}
        <p>{{subtitle}}</p>
        {{/if}}
      </div>
      <button class="podlove-subscribe-button">{{t "podcast_panel.choose_client"}}</button>
    </div>
  ')

module.exports = PodcastPanel
