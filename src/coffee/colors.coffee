$ = require('../../vendor/zepto-browserify.js').Zepto
_ = require('../../vendor/underscore-min.js')
TinyColor = require('../../vendor/tinycolor-min.js')

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
    # Get color values based on the @buttonBackgroundColor
    @buttonColor = new TinyColor(@buttonColor)
    @backgroundHoverColor = Colors.getHoverColor(@buttonColor.clone())
    @fontColor = Colors.getContrastColor(@buttonColor.clone())
    @fontHoverColor = Colors.getHoverColor(@fontColor.clone())
    @isolatedColor = Colors.getIsolatedColor(@buttonColor.clone())
    @isolatedHoverColor = Colors.getHoverColor(@isolatedColor.clone())
    @alphaColor = @buttonColor.clone().setAlpha(0.5)

    css = "
      #podlove-subscribe-button,
      .podlove-subscribe-button {
        background-color: #{@buttonColor};
        color: #{@fontColor};
      }

      #podlove-subscribe-button:active,
      .podlove-subscribe-button:active,
      #podlove-subscribe-button:hover,
      .podlove-subscribe-button:hover {
        background-color: #{@backgroundHoverColor};
        color: #{@fontHoverColor};
      }

      #podlove-subscribe-button.outline {
        border-color: #{@buttonColor};
        color: #{@buttonColor};
      }

      #podlove-subscribe-button.outline:active,
      #podlove-subscribe-button.outline:hover {
        background-color: #{@buttonColor};
        color: #{@fontColor};
      }

      #podlove-subscribe-button.frameless {
        color: #{@buttonColor};
      }

      #podlove-subscribe-button.frameless:active,
      #podlove-subscribe-button.frameless:hover {
        color: #{@backgroundHoverColor};
      }

      #podlove-subscribe-popup #podlove-subscribe-popup-close-button,
      #podlove-subscribe-popup #podlove-subscribe-popup-help-button,
      #podlove-subscribe-popup .podlove-subscribe-back-button {
        color: #{@isolatedColor};
      }

      #podlove-subscribe-popup #podlove-subscribe-popup-close-button:active,
      #podlove-subscribe-popup #podlove-subscribe-popup-help-button:active,
      #podlove-subscribe-popup .podlove-subscribe-back-button:active,
      #podlove-subscribe-popup #podlove-subscribe-popup-close-button:hover,
      #podlove-subscribe-popup #podlove-subscribe-popup-help-button:hover,
      #podlove-subscribe-popup .podlove-subscribe-back-button:hover {
        color: #{@isolatedHoverColor};
      }

      #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button .podlove-subscribe-tab-active {
        background-color: #{@buttonColor};
      }

      #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button:active,
      #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button:hover,
      #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button.active {
        color: #{@isolatedColor};
      }

      #podlove-subscribe-popup #podlove-subscribe-panel-clients li:active,
      #podlove-subscribe-popup #podlove-subscribe-panel-clients li:hover {
        background-color: #{@buttonColor};
        color: #{@fontColor};
      }

      #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-popup-finish-register {
        color: #{@isolatedColor};
      }

      #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-popup-finish-register:active,
      #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-popup-finish-register:hover {
        color: #{@isolatedHoverColor};
      }

      #podlove-subscribe-popup #podlove-subscribe-button-help-panel {
        background-color: #{@buttonColor};
        color: #{@fontColor};
      }

      #podlove-subscribe-popup h1::selection,
      #podlove-subscribe-popup p::selection,
      #podlove-subscribe-popup input::selection,
      #podlove-subscribe-popup span::selection,
      #podlove-subscribe-popup img::selection {
        background-color: #{@alphaColor};
      }

      #podlove-subscribe-popup h1::-moz-selection,
      #podlove-subscribe-popup p::-moz-selection,
      #podlove-subscribe-popup input::-moz-selection,
      #podlove-subscribe-popup span::-moz-selection,
      #podlove-subscribe-popup img::-moz-selection {
        background-color: #{@alphaColor};
      }
    "
    style = $('<style></style>')
    style.append(css)
    style

  _setDefaults: () ->
    _(Colors.colorDefaults).each (color) =>
      @[color.name] = color.default

  # default color variable
  # to use when no color is provided by user
  @colorDefaults: [
    {
      name: 'buttonColor'
      default: '#75ad91'
    }
  ]

  _extractColors: (string) ->
    return unless string
    colors = string.split(';')
    @_setColor('buttonColor', colors[0])

  _setColor: (id, color) ->
    @[id] = color if color != ''

  @encode: (color) ->
    encodeURIComponent(color)

  @decode: (color) ->
    decodeURIComponent(color)

  # Computes a color based on parameter color,
  # that has a high contrast to parameter color.
  # E.g. may be used as a font-color on
  # background with parameter color
  @getContrastColor: (color) ->
    @newColor = color.clone()
    if color.getBrightness() >= 190
      @newColor = color.darken( 70 )
    else if color.getBrightness() >= 155 && color.getBrightness() < 190
      @newColor = color.darken( 45 )
    else if color.getBrightness() < 155 && color.getBrightness() >= 50
      @newColor = color.lighten( 45 )
    else
      @newColor = color.lighten( 70 )
    return @newColor

  # Computes a color based on parameter color,
  # that may be used as its hover color
  @getHoverColor: (color) ->
    @newColor = color.clone()
    if color.getBrightness() < 50
      @newColor = color.lighten( 15 )
    else
      @newColor = color.darken( 10 )
    return @newColor

  # Computes a color, that can be used on white background,
  # e.g. for a font on white background
  @getIsolatedColor: (color) ->
    @newColor = color.clone();
    if color.getBrightness() >= 170
      @newColor = color.darken( 35 )
    return @newColor;

module.exports = Colors
