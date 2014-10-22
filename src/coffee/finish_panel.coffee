$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars

Panel = require('./panel.coffee')

class FinishPanel extends Panel
  constructor: (@container, @parent) ->

  context: (client, podcast) -> {
    client: client,
    podcast: podcast,
    scriptPath: @parent.options.scriptPath,
  }

  render: (client, podcast) ->
    @container.empty()
    @elem = $(@template(@context(client, podcast)))
    @container.append(@elem)

    @elem.find('.podlove-subscribe-back-button').on 'click', (event) =>
      @parent.moveClients('0%')
      @parent.moveFinish('100%')

    @elem.find('input').on 'click', () ->
      this.select()

  template: Handlebars.compile('
    <div>
      <div class="top-bar">
        <span class="podlove-subscribe-back-button">&lsaquo;</span>
        <img src="{{scriptPath}}/images/icon-big@2x.png">
        <span class="panel-title">Subscribe</span>
      </div>
      <img class="podcast-cover" src="{{client.icon}}">
      {{#if client.scheme}}
        <h1>Handing over to<br> {{client.title}}...</h1>
        <p>Did something go wrong?</p>

        <p>
          {{#if client.post}}
            <form method="post" action="{{client.url}}" target="_blank">
              <input type="hidden" name="url" value="{{client.url}}">
              <input type="hidden" name="title" value="{{podcast.title}}">
              <input type="hidden" name="subtitle" value="{{podcast.subtitle}}">
              <input type="hidden" name="image" value="{{podcast.cover}}">

              <button>
                {{client.title}}
              </button>
            </form>
          {{else}}
            <a href="{{client.url}}" target="_blank">
              Try again
            </a>
          {{/if}}
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
