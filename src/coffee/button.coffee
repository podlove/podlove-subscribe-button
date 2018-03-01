Utils = require('./utils.coffee')
Translations = require('./translations.coffee')
Colors = require('./colors.coffee')

class Button
  constructor: () ->
    @getOptions()

    @I18n = new Translations(@options.language)
    @elem = document.querySelector('#podlove-subscribe-button')

    # Check if button should have auto width
    # would be provided as "data-size",
    # e.g. "big auto"
    if /auto/.test(@options.size)
      @autoSize = true

    @addFormat()
    @addStyle()
    @render()

    # Wait for button to be rendered,
    # before resizing the iframe
    window.setTimeout =>
      @resizeIframe()
    , 10

  render: () ->
    # Add size classes
    sizeOptions = @options.size.replace('%20', ' ').split(' ')
    sizeOptions.forEach (sizeOption) =>
      @elem.classList.add(sizeOption)

    # Add title attritbute to button element
    @elem.setAttribute('title', @I18n.t('button'))

    # Add listener
    @elem.addEventListener 'click', (event) =>
      window.parent.postMessage("clicked_#{@options.id}", '*')

    # Check for button label
    if @buttonHtml
      @elem.appendChild(@buttonHtml)

    # Check for cover image
    if @logoElem
      image = document.createElement('img')
      image.src = @options.podcastCover
      image.alt = "Logo of #{@options.podcastTitle}"
      @logoElem.appendChild(image)
      @logoElem.addEventListener 'click', (event) =>
        window.parent.postMessage("clicked_#{@options.id}", '*')

    @setColors()

  setColors: () ->
    colors = Colors.fromParams(@options)
    @elem.insertAdjacentHTML('afterend', colors.toStyles().outerHTML)

  getOptions: () ->
    @options = Utils.locationToOptions(window.location.search)

  addFormat: () ->
    # Check if data-format is not squared
    # and provide buttonHtml span tag for label.
    # If format is square, add class for styling.
    if @options.format != 'square'
      @buttonHtml = document.createElement('span')
      @buttonHtml.textContent = @I18n.t('button')
    else if @options.format == 'square'
      @elem.classList.add('square')

    # Check if data-format is cover
    # and provide a logo element variable for the image
    if @options.format == 'cover'
      @logoElem = document.querySelector('#podlove-subscribe-button-logo')

  addStyle: () ->
    if @options.style == 'frameless'
      @elem.classList.add('frameless')
    else if @options.style == 'outline'
      @elem.classList.add('outline')

  resizeIframe: () ->
    resize = (height, width) =>
      resizeData = JSON.stringify({
        id: @options.id,
        listenTo: 'resizeButton',
        height: height,
        width: width
      })
      window.parent.postMessage(resizeData, '*')

    height = @elem.offsetHeight

    width = if @autoSize && !@logoElem
      '100%'
    else
      @elem.offsetWidth

    if @logoElem
      img = @logoElem.querySelector('img')

      showImage = =>
        @logoElem.style.height = "#{width}px"
        height += width
        @logoElem.style.display = 'block'
        resize(height, width)

      unless img.complete
        img.addEventListener 'load', showImage
      else
        showImage()
    else
      resize(height, width)

module.exports = Button

