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
  }

  render: () ->
    @elem = $(@template(@context()))
    @container.append(@elem)

    @elem.find('button').on 'click', (event) =>
      @parent.moveClients('0%')
      @parent.movePodcast('-100%')

  template: Handlebars.compile('
    <div>
      <div class="top-bar">
        Subscribe
      </div>
      {{#if cover}}
      <img class="podcast-cover" src="{{cover}}">
      {{/if}}
      <h1>{{title}}</h1>
      <p>{{subtitle}}</p>
      <button class="podlove-subscribe-button">Choose Client</button>
    </div>
  ')

module.exports = PodcastPanel
