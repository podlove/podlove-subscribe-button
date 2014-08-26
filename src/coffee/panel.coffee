class Panel
  constructor: () ->

  moveLeft: (to) ->
    @container.css('left', to)

  moveRight: (to) ->
    @container.css('left', to)

module.exports = Panel
