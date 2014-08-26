$ = require('../../vendor/zepto-browserify.js').Zepto
Handlebars = require('../../vendor/handlebars.min.js').Handlebars

Panel = require('./panel.coffee')

class FinishPanel extends Panel
  constructor: (@container, @parent) ->

  render: (client) ->
    @container.empty()
    @elem = $(@template(client))
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
      </div>
      <img class="podcast-cover" src="{{icon}}">
      {{#if scheme}}
        <h1>Handing over to<br> {{title}}...</h1>
        <p>Did something go wrong?</p>

        <p>
          <a href="{{url}}" target="_blank">
            Try again
          </a>
          <br>
          or
          <br>
          <a href="{{install}}" target="_blank">
            Install {{title}} from the App Store
          </a>
        </p>
      {{else}}
        <p>
          Please copy the URL below and add it to your Podcast- or RSS-Client.
        </p>
        <input value="{{url}}">
      {{/if}}
    </div>
  ')

module.exports = FinishPanel
