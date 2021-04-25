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
  windows10: /Windows NT 10.0/
  windowsphone: /trident/i
  android: /android/i
  ios: /(ipad|iphone|ipod)/i
  unix: /(linux|openbsd|freebsd|netbsd)/i
  osx_catalina: /macintosh.+10(_|\.)15/i
  osx_big_sur: /macintosh.+((10(_|\.)16)|(11(_|\.)))/i
  osx: /macintosh/i

module.exports = UserAgent
