$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars
Translations = require('./translations.coffee')

Panel = require('./panel.coffee')

class SettingsPanel extends Panel
  constructor: (@container, @parent) ->
    @podcast = @parent.podcast

    @render()

  context: -> {
    feeds: @podcast.feeds,
  }

  render: () =>
    @elem = $(@template(@context()))
    @container.append(@elem)

    @elem.find('.feed').on 'click', (event) =>
      @parent.settings.feed = $(event.currentTarget).data('feed')
      @parent.elem.find('#podlove-subscribe-panel-settings').toggleClass('visible')
      @parent.clientsPanel.prepareClients(@parent.options.scriptPath)
      @parent.clientsPanel.render()

  template: Handlebars.compile('
    <div class="podlove-subscribe-panel-settings-content">
      <h2>{{t "settings_panel.title"}}</h2>
      {{#each feeds}}
      <div class="feed" data-feed="{{format}}">
        {{format}}: {{url}}
      </div>
      {{/each}}
    </div>
  ')

module.exports = SettingsPanel
