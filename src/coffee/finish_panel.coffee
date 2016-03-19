$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars

Panel = require('./panel.coffee')

class FinishPanel extends Panel
  constructor: (@container, @parent) ->

  context: (client, podcast) -> {
    client: client,
    podcast: podcast,
    scriptPath: @parent.options.scriptPath,
    platform: @parent.platform,
  }

  render: (client, podcast) ->
    @container.empty()
    @elem = $(@template(@context(client, podcast)))
    @container.append(@elem)

    @elem.find('input').on 'click', () ->
      this.select()

  template: Handlebars.compile('
    <div>
      <img class="podcast-cover" src="{{client.icon}}">
      {{#if client.scheme}}
        <h1>{{t "finish_panel.handing_over_to" client=client.title}}...</h1>
        <p>{{t "finish_panel.something_went_wrong"}}</p>

        <p>
          {{#if client.post}}
            <form method="post" action="{{client.url}}" target="_blank">
              <input type="hidden" name="url" value="{{client.url}}">
              <input type="hidden" name="title" value="{{podcast.title}}">
              <input type="hidden" name="subtitle" value="{{podcast.subtitle}}">
              <input type="hidden" name="image" value="{{podcast.cover}}">

              <button class="podlove-subscribe-button">
                {{t "finish_panel.try_again"}}
              </button>
            </form>
          {{else}}
            <a href="{{client.url}}" class="podlove-subscribe-button" target="_blank">
              {{t "finish_panel.try_again"}}
            </a>
          {{/if}}

          {{#if client.store}}
            {{t "finish_panel.or_install"}}
            <br>
            <a href="{{client.store}}" target="_blank">
              <img src="{{scriptPath}}/images/stores/{{platform}}.png" class="store-button">
            </a>
          {{/if}}

          {{#if client.install}}
            <a href="{{client.install}}" target="_blank">
              {{t "finish_panel.install" client=client.title}}
            </a>
          {{/if}}

          {{#if client.register}}
            <a href="{{client.register}}" target="_blank">
              {{t "finish_panel.register_an_account"}}
              {{client.title}}
            </a>
          {{/if}}
        </p>
      {{else}}
        <p>
          {{t "finish_panel.please_copy_url"}}
        </p>
        <input value="{{client.originalUrl}}">
      {{/if}}
    </div>
  ')

module.exports = FinishPanel
