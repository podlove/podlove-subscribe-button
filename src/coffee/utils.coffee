class Utils
  @locationToOptions: (location) ->
    options = {}
    string = window.location.search.replace(/^\?/, '')
    split = string.split('&')

    for string in split
      array = string.split('=')
      options[array[0]] = decodeURIComponent(array[1])

    options

  @fixIconPath: (client, prefix) ->
    return if !client.icon

    if client.icon.indexOf(prefix) == -1
      client.icon = "#{prefix}/images/#{client.icon}"

module.exports = Utils
