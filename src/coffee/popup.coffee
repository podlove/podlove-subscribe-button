Handlebars = require('handlebars')

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

  closePopupOnEsc: (event) =>
    if event.keyCode == 27
      @closePopup()

  render: () ->
    html = @template(@context())
    @body = document.body
    @html = document.querySelector('html')
    @window = window

    @body.insertAdjacentHTML('beforeend', html)
    @elem = @body.querySelector('#podlove-subscribe-popup')
    @disableBackgroundScrolling()

    # remove animation class for fadein animation
    window.setTimeout =>
      @elem.classList.remove('podlove-subscribe-popup-animate')
    , 500

    # close popup on click at close button
    @elem.querySelector('#podlove-subscribe-popup-close-button').addEventListener 'click', () =>
      @closePopup()

    # close popup on click in background
    @elem.addEventListener 'click', () =>
      @closePopup()

    # close popup on esc press
    @window.focus()
    @window.addEventListener 'keydown', @closePopupOnEsc

    # do not close popup on click in modal
    @elem.querySelector('#podlove-subscribe-popup-modal').addEventListener 'click', (event) =>
      event.stopPropagation()

    # open help panel
    @elem.querySelector('#podlove-subscribe-popup-help-button').addEventListener 'click', (event) =>
      @elem.querySelector('#podlove-subscribe-button-help-panel').classList.toggle('visible')
      event.currentTarget.classList.toggle('active')

    # close help panel
    @elem.querySelector('#podlove-help-close-button').addEventListener 'click', (event) =>
      @elem.querySelector('#podlove-subscribe-button-help-panel').classList.toggle('visible')
      event.currentTarget.classList.toggle('active')

    # swipe to clients panel when button was clicked
    @elem.querySelector('.podlove-subscribe-back-button').addEventListener 'click', (event) =>
      @container = @elem.querySelector('#podlove-subscribe-popup-modal-inner')
      if @container.classList.contains('swiped-left-2')
        @movePanels(1)
      else if @container.classList.contains('swiped-left-1')
        @movePanels(0)

  disableBackgroundScrolling: () ->
    @oldHtmlOverflow = @html.style.overflow
    @oldBodyOverflow = @body.style.overflow
    @html.style.overflow = 'hidden'
    @body.style.overflow = 'hidden'

  enableBackgroundScrolling: (body) ->
    @html.style.overflow = @oldHtmlOverflow
    @body.style.overflow = @oldBodyOverflow

  closePopup: () ->
    @enableBackgroundScrolling()
    @elem.classList.add('podlove-subscribe-popup-animate')
    window.setTimeout =>
      @elem.classList.remove('podlove-subscribe-popup-animate')
      # remove listener to close popup on esc press
      @window.removeEventListener 'keydown', @closePopupOnEsc
      @elem.parentNode.removeChild(@elem)
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
    @podcastPanel = new PodcastPanel(@elem.querySelector("#{prefix}-podcast"), @)
    @clientsPanel = new ClientsPanel(@elem.querySelector("#{prefix}-clients"), @)
    @finishPanel = new FinishPanel(@elem.querySelector("#{prefix}-finish"), @)

  movePanels: (step) ->
    @container = @elem.querySelector('#podlove-subscribe-popup-modal-inner')
    @container.classList.remove('swiped-left-0')
    @container.classList.remove('swiped-left-1')
    @container.classList.remove('swiped-left-2')
    @container.classList.add('swiped-left-' + step );

module.exports = Popup
