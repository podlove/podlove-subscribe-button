$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars

Panel = require('./panel.coffee')

class FinishPanel extends Panel
  constructor: (@container, @parent) ->

  context: (client) -> {
    client: client,
    scriptPath: @parent.options.scriptPath,
  }

  render: (client) ->
    @container.empty()
    @elem = $(@template(@context(client)))
    @container.append(@elem)

    @elem.find('.back-button').on 'click', (event) =>
      @parent.moveClients('0%')
      @parent.moveFinish('100%')

    @elem.find('input').on 'click', () ->
      this.select()

  template: Handlebars.compile('
    <div>
      <div class="top-bar">
        <span class="back-button">&lsaquo;</span>
        <img src="{{scriptPath}}/images/icon-big@2x.png">
        <span class="panel-title">Subscribe</span>
      </div>
      <img class="podcast-cover" src="{{client.icon}}">
      {{#if client.scheme}}
        <h1>Handing over to<br> {{client.title}}...</h1>
        <p>Did something go wrong?</p>

        <p>
          <a href="{{client.url}}" target="_blank">
            Try again
          </a>
          <br>
          or
          <br>
          {{#if client.install}}
            <a href="{{client.install}}" target="_blank">
              Install {{client.title}} from the App Store
            </a>
          {{/if}}

          {{#if client.register}}
            <a href="{{client.register}}" target="_blank">
              Register an account with {{client.title}}
            </a>
          {{/if}}
        </p>
      {{else}}
        <p>
          Please copy the URL below and add it to your Podcast- or RSS-Client.
        </p>
        <input value="{{client.url}}">
      {{/if}}
    </div>
  ')

module.exports = FinishPanel
