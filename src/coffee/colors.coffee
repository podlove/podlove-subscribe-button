$ = require('../../vendor/zepto-browserify.js').Zepto
_ = require('../../vendor/underscore-min.js')

class Colors
  constructor: (colorString) ->
    @_setDefaults()
    @_extractColors(colorString)

  @fromParams: (params) ->
    colors = new Colors()
    _(Colors.colorDefaults).each (color) =>
      colors[color.name] = Colors.decode(params[color.name])
    colors

  toParams: () ->
    string = ''
    _(Colors.colorDefaults).each (color) =>
      string += "&#{color.name}=#{Colors.encode(@[color.name])}"
    string

  toStyles: () ->
    css = "
      #podlove-subscribe-button,
      .podlove-subscribe-button,
      #podlove-subscribe-popup #podlove-subscribe-panel-podcast .podlove-subscribe-button,
      #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-button {
        background-color: #{@buttonBackgroundColor};
        border-color: #{@buttonBorderColor};
        color: #{@buttonTextColor};
      }

      #podlove-subscribe-button:hover,
      .podlove-subscribe-button:hover,
      #podlove-subscribe-popup #podlove-subscribe-panel-podcast .podlove-subscribe-button:hover,
      #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-button:hover {
        background-color: #{@buttonHoverBackgroundColor};
        color: #{@buttonHoverTextColor};
      }

      #podlove-subscribe-button:active,
      .podlove-subscribe-button:active,
      #podlove-subscribe-popup #podlove-subscribe-panel-podcast .podlove-subscribe-button:active,
      #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-button:active {
        background-color: #{@buttonActiveBackgroundColor};
        color: #{@buttonActiveTextColor};
      }
      #podlove-subscribe-popup #podlove-subscribe-panel-clients li:hover {
        background: #{@listHighlightBackgroundColor};
        color: #{@listHighlightTextColor};
      }
    }
    "
    style = $('<style></style>')
    style.append(css)
    style

  _setDefaults: () ->
    _(Colors.colorDefaults).each (color) =>
      @[color.name] = color.default

  @colorDefaults: [
    {
      name: 'buttonBackgroundColor'
      default: '#75ad91'
    },
    {
      name: 'buttonHoverBackgroundColor'
      default: '#75c39d'
    },
    {
      name: 'buttonActiveBackgroundColor'
      default: '#61937b'
    },
    {
      name: 'buttonTextColor'
      default: '#ffffff'
    },
    {
      name: 'buttonHoverTextColor'
      default: '#ffffff'
    },
    {
      name: 'buttonActiveTextColor'
      default: '#ffffff'
    },
    {
      name: 'buttonBorderColor'
      default: '#456757'
    },
    {
      name: 'listHighlightBackgroundColor'
      default: '#75ad91'
    },
    {
      name: 'listHighlightTextColor'
      default: '#ffffff'
    },
  ]

  _extractColors: (string) ->
    return unless string
    colors = string.split(';')

    @_setColor('buttonBackgroundColor', colors[0])
    @_setColor('buttonHoverBackgroundColor', colors[1])
    @_setColor('buttonActiveBackgroundColor', colors[2])
    @_setColor('buttonTextColor', colors[3])
    @_setColor('buttonHoverTextColor', colors[4])
    @_setColor('buttonActiveTextColor', colors[5])
    @_setColor('buttonBorderColor', colors[6])

    @listHighlightBackgroundColor = colors[7]
    @listHighlightTextColor = colors[8]

  _setColor: (id, color) ->
    @[id] = color if color != ''

  @encode: (color) ->
    encodeURIComponent(color)

  @decode: (color) ->
    decodeURIComponent(color)

module.exports = Colors
