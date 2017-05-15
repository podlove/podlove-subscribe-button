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
    @window = $(window)

    @body.append(@elem)
    @disableBackgroundScrolling()

    # remove animation class for fadein animation
    window.setTimeout =>
      @elem.removeClass('podlove-subscribe-popup-animate')
    , 500

    # close popup on click at close button
    @elem.find('#podlove-subscribe-popup-close-button').on 'click', () =>
      @closePopup()

    # close popup on click in background
    @elem.on 'click', () =>
      @closePopup()

    # close popup on esc press
    $ =>
      @window.focus()
      @window.on 'keydown', (event) =>
        if event.keyCode == 27
          @closePopup()

    # do not close popup on click in modal
    @elem.find('#podlove-subscribe-popup-modal').on 'click', (event) =>
      event.stopPropagation()

    # open help panel
    @elem.find('#podlove-subscribe-popup-help-button').on 'click', (event) =>
      @elem.find('#podlove-subscribe-button-help-panel').toggleClass('visible')
      $(event.currentTarget).toggleClass('active')

    # close help panel
    @elem.find('#podlove-help-close-button').on 'click', (event) =>
      @elem.find('#podlove-subscribe-button-help-panel').toggleClass('visible')
      $(event.currentTarget).toggleClass('active')

    # swipe to clients panel when button was clicked
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

  closePopup: () ->
    @enableBackgroundScrolling()
    @elem.addClass('podlove-subscribe-popup-animate')
    window.setTimeout =>
      @elem.removeClass('podlove-subscribe-popup-animate')
      # remove listener to close popup on esc press
      @window.off 'keydown'
      @elem.remove()
    , 500

  template: Handlebars.compile('
    <div id="podlove-subscribe-popup" class="podlove-subscribe podlove-subscribe-popup-animate">
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

        <a href="https://podlove.org" title="Podlove" target="_blank" class="podlove-logo"><img src="{{scriptPath}}/images/podlove.svg"></a>

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
    @container.removeClass('swiped-left-0')
    @container.removeClass('swiped-left-1')
    @container.removeClass('swiped-left-2')
    @container.addClass('swiped-left-' + step );

module.exports = Popup
