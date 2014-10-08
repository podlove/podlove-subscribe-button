class UserAgent
  detect: () ->
    userAgent = (window.navigator && navigator.userAgent) || ""

    for own ua, regex of UAs
      if regex.test(userAgent)
        return ua

UAs =
  windows7: /Windows NT 6.1/
  windows8: /Windows NT 6.2/
  windows81: /Windows NT 6.3/
  windowsPhone: /trident/i
  android: /android/i
  ios: /(ipad|iphone|ipod)/i
  linux: /linux/i
  osx: /macintosh/i

module.exports = UserAgent
