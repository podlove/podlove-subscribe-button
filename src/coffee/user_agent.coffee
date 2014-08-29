class UserAgent
  detect: () ->
    userAgent = (window.navigator && navigator.userAgent) || ""

    for own ua, regex of UAs
      if regex.test(userAgent)
        return ua

UAs =
  windowsPhone: /trident/i
  android: /android/i
  ios: /(ipad|iphone|ipod)/i
  linux: /linux/i
  osx: /macintosh/i

module.exports = UserAgent
