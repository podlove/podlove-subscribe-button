$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars

Utils = require('./utils.coffee')
Translations = require('./translations.coffee')
IframeResizer = require('./iframe_resizer.coffee')
UserAgent = require('./user_agent.coffee')

PodcastPanel = require('./podcast_panel.coffee')
ClientsPanel = require('./clients_panel.coffee')
FinishPanel = require('./finish_panel.coffee')

class Popup
  constructor: (@podcast, @options) ->
    @I18n = new Translations(@options.language)
    @platform = new UserAgent().detect()
    @render()
    @initPanels()

  context: -> {
    scriptPath: @options.scriptPath
  }

  render: () ->
    @elem = $(@template(@context()))
    @body = $('body')
    @html = $('html')
    @body.append(@elem)
    @disableBackgroundScrolling()
    @elem.find('#podlove-subscribe-popup-close-button').on 'click', () =>
      @enableBackgroundScrolling()
      @elem.remove()
    @elem.find('#podlove-subscribe-popup-help-button').on 'click', (event) =>
      @elem.find('#podlove-subscribe-button-help-panel').toggleClass('visible')
      $(event.currentTarget).toggleClass('active')
    @elem.find('#podlove-help-close-button').on 'click', (event) =>
      @elem.find('#podlove-subscribe-button-help-panel').toggleClass('visible')
      $(event.currentTarget).toggleClass('active')
    @elem.find('.podlove-subscribe-back-button').on 'click', (event) =>
      @container = @elem.find('#podlove-subscribe-popup-modal-inner')
      if @container.hasClass('swiped-left-2')
        @movePanels(1)
      else if @container.hasClass('swiped-left-1')
        @movePanels(0)

  disableBackgroundScrolling: () ->
    @oldHtmlOverflow = @html.css('overflow')
    @oldBodyOverflow = @body.css('overflow')
    @html.css('overflow', 'hidden')
    @body.css('overflow', 'hidden')

  enableBackgroundScrolling: (body) ->
    @html.css('overflow', @oldHtmlOverflow)
    @body.css('overflow', @oldBodyOverflow)

  template: Handlebars.compile('
    <div id="podlove-subscribe-popup" class="podlove-subscribe">
      <div id="podlove-subscribe-popup-modal">
        <div id="podlove-subscribe-popup-modal-inner" class="show-left">
          <div class="top-bar">
            <span id="podlove-subscribe-popup-help-button"></span>
            <span class="podlove-subscribe-back-button"></span>
            <span class="panel-title">{{t "panels.title"}}</span>
            <span id="podlove-subscribe-popup-close-button" class="podlove-subscribe-install-button"></span>
          </div>

          <div id="podlove-subscribe-panel-container">
            <div id="podlove-subscribe-panel-podcast"></div>
            <div id="podlove-subscribe-panel-clients"></div>
            <div id="podlove-subscribe-panel-finish"></div>
          </div>
        </div>

        <a href="http://www.podlove.org" title="Podlove" target="_blank" class="podlove-logo"><img src="{{scriptPath}}/images/podlove@2x.png"></a>

        <div id="podlove-subscribe-button-help-panel">
          <span id="podlove-help-close-button" class="podlove-help-close-button"></span>
          <div class="podlove-subscribe-button-help-panel-content">
            <h2>{{t "help_panel.title"}}</h2>
            <p>{{t "help_panel.paragraph1"}}</p>

            <p>{{t "help_panel.paragraph2"}}</p>

            <p>{{t "help_panel.paragraph3"}}</p>
          </div>
        </div>
      </div>
    </div>
  ')

  initPanels: () ->
    prefix = '#podlove-subscribe-panel'
    @podcastPanel = new PodcastPanel(@elem.find("#{prefix}-podcast"), @)
    @clientsPanel = new ClientsPanel(@elem.find("#{prefix}-clients"), @)
    @finishPanel = new FinishPanel(@elem.find("#{prefix}-finish"), @)

  movePanels: (step) ->
    @container = @elem.find('#podlove-subscribe-popup-modal-inner')
    if @container.hasClass('swiped-left-0')
      @container.removeClass('swiped-left-0')
    if @container.hasClass('swiped-left-1')
      @container.removeClass('swiped-left-1')
    if @container.hasClass('swiped-left-2')
      @container.removeClass('swiped-left-2')
    @container.addClass('swiped-left-' + step );

module.exports = Popup
