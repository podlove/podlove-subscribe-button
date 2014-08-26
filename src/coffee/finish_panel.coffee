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

  template: Handlebars.compile('
    <div>
      <div class="top-bar">
        <span class="back-button">&lsaquo;</span>
      </div>
      <img class="podcast-cover" src="{{icon}}">
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
          Install Instacast from the App Store
        </a>
      </p>
    </div>
  ')

module.exports = FinishPanel
