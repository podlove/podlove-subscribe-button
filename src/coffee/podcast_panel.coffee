$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars

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
      @elem.find('#podlove-subscribe-button-help-panel').toggle()
      $(event.currentTarget).toggleClass('active')

    @elem.find('button').on 'click', (event) =>
      @parent.moveClients('0%')
      @parent.movePodcast('-100%')

  template: Handlebars.compile('
    <div>
      <div class="top-bar">
        <span id="podlove-subscribe-popup-help-button">
          <span class="questionmark">?</span>
          <span class="back-button">&lsaquo;</span>
        </span>
        <img src="{{scriptPath}}/images/icon-big@2x.png">
        <span class="panel-title">Subscribe</span>
      </div>
      {{#if cover}}
      <img class="podcast-cover" src="{{cover}}">
      {{/if}}
      <h1>{{title}}</h1>
      <p>{{subtitle}}</p>
      <button class="podlove-subscribe-button">Choose Client</button>

      <div id="podlove-subscribe-button-help-panel">
        <h2>Subscribe?</h2>
        <p>With a subscription podcast episodes will be automatically downloaded to your device.</p>
      </div>
    </div>
  ')

module.exports = PodcastPanel
