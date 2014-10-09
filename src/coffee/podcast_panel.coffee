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
        <span class="panel-title">Subscribe</span>
      </div>
      {{#if cover}}
      <img class="podcast-cover" src="{{cover}}">
      {{/if}}
      <h1>{{title}}</h1>
      <p>{{subtitle}}</p>
      <button class="podlove-subscribe-button">Choose Client</button>

      <div id="podlove-subscribe-button-help-panel">
        <div class="podlove-subscribe-button-help-panel-content">
          <h2>Subscribe?</h2>
          <p>You are about to subscribe to a podcast. This will allow your podcast client program to  automatically download new episodes or access the archive of previously released stuff.</p>

          <p>The Podlove Subscription Tool helps you to do this. Select your favorite podcast client from a list of potential apps on your device or pick a podcast cloud service on the web that you use.</p>

          <p>Upon launch, the podcast client should offer you to add the podcast to your list of subscriptions. Use the download link to get the app if not yet available.</p>
        </div>
      </div>
    </div>
  ')

module.exports = PodcastPanel
