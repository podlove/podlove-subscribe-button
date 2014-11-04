class Clients
  constructor: (platform, osDefault=false) ->
    if osDefault
      return @['os_defaults'][platform]

    return @[platform]

  rss: {
    title: 'Other (Feed URL)'
    icon: 'generic/rss@2x.png'
  }

  os_defaults: {
    android: {
      scheme: 'pcast:'
      icon: 'generic/android@2x.png'
    },
    windows8: {
      scheme: 'pcast:'
      icon: 'generic/windows8@2x.png'
    },
    windowsphone: {
      scheme: 'pcast:'
      icon: 'generic/windowsphone@2x.png'
    }
  }

  cloud: [
    {
      title: 'gpodder.net'
      scheme: 'http://gpodder.net/subscribe?url='
      icon: 'cloud/gpoddernet@2x.png'
      register: 'https://gpodder.net/'
      http: true
    },
    {
      title: 'Instacast Cloud'
      scheme: 'https://instacastcloud.com/subscribe'
      #scheme: 'http://localhost:4000/test'
      icon: 'cloud/instacastcloud@2x.png'
      register: 'https://instacastcloud.com/'
      http: true
      post: true
    },
    {
      title: 'Player.fm'
      scheme: 'https://player.fm/subscribe?id='
      icon: 'cloud/playerfm@2x.png'
      register: 'https://player.fm/'
      http: true
    },
    {
      title: 'Pocket Casts'
      scheme: 'http://pcasts.in/feed/'
      icon: 'cloud/pocketcasts@2x.png'
      register: 'https://play.pocketcasts.com/'
      http: false
    }
  ]

  android: [
    {
      title: 'AntennaPod'
      scheme: 'antennapod-subscribe://'
      icon: 'android/antennapod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod'
    },
    #{
      #title: 'BeyondPod'
      #scheme: 'beyondpod://'
      #icon: 'android/beyondpod@2x.png'
      #install: 'https://play.google.com/store/apps/details?id=mobi.beyondpod'
    #},
    {
      title: 'Player.fm'
      scheme: 'https://player.fm/subscribe?id='
      icon: 'android/playerfm@2x.png'
      install: 'https://play.google.com/store/apps/details?id=fm.player'
    },
    {
      title: 'Podcast Addict'
      scheme: 'podcastaddict://'
      icon: 'android/podcastaddict@2x.png'
      install: 'https://play.google.com/store/apps/details?id=com.bambuna.podcastaddict'
    },
    #{
      #title: 'PocketCasts'
      #scheme: 'pktc://'
      #icon: 'android/pocketcasts-128@2x.png'
      #install: 'https://play.google.com/store/apps/details?id=au.com.shiftyjelly.pocketcasts'
    #},
    {
      title: 'Podkicker'
      scheme: 'podkicker://subscribe/'
      icon: 'android/podkicker@2x.png'
      install: 'https://play.google.com/store/apps/details?id=ait.podka'
    },
    {
      title: 'uPod'
      scheme: 'upod://'
      icon: 'android/upod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=mobi.upod.app'
    }
  ]

  ios: [
    {
      title: 'Castro'
      scheme: 'castro://subscribe/'
      icon: 'ios/castro@2x.png'
      install: 'https://itunes.apple.com/de/app/castro-high-fidelity-podcasts/id723142770'
    },
    {
      title: 'Downcast'
      scheme: 'downcast://'
      icon: 'ios/downcast@2x.png'
      install: 'https://itunes.apple.com/de/app/downcast/id393858566'
    },
    {
      title: 'iCatcher'
      scheme: 'icatcher://'
      icon: 'ios/icatcher@2x.png'
      install: 'https://itunes.apple.com/de/app/icatcher!-podcast-app/id414419105'
    },
    {
      title: 'Instacast'
      scheme: 'instacast://'
      icon: 'ios/instacast@2x.png'
      install: 'https://itunes.apple.com/de/app/instacast-4-podcast-client/id577056377'
    },
    {
      title: 'Overcast'
      scheme: 'overcast://x-callback-url/add?url='
      icon: 'ios/overcast@2x.png'
      install: 'https://itunes.apple.com/de/app/overcast-podcast-player/id888422857'
    },
    {
      title: 'PocketCasts'
      scheme: 'pktc://subscribe/'
      icon: 'ios/pocketcasts@2x.png'
      install: 'https://itunes.apple.com/de/app/pocket-casts/id414834813'
    },
    {
      title: 'Podcasts'
      scheme: 'pcast://'
      icon: 'ios/podcasts@2x.png'
      install: 'https://itunes.apple.com/de/app/podcasts/id525463029'
    },
    {
      title: 'Podcat'
      scheme: 'podcat://'
      icon: 'ios/podcat@2x.png'
      install: 'https://itunes.apple.com/app/podcat/id845960230'
    },
    {
      title: 'RSSRadio'
      scheme: 'rssradio://'
      icon: 'ios/rssradio@2x.png'
      install: 'https://itunes.apple.com/app/rssradio-premium-podcast-downloader/id679025359'
    }
  ]
  linux: [
    {
      title: 'Clementine'
      scheme: 'itpc://'
      icon: 'linux/clementine@2x.png'
    },
    {
      title: 'gPodder'
      scheme: 'gpodder://'
      icon: 'linux/gpodder@2x.png'
      install: 'http://gpodder.org/downloads'
    }
  ],
  osx: [
    {
      title: 'Downcast'
      scheme: 'downcast://'
      icon: 'osx/downcast@2x.png'
      install: 'https://itunes.apple.com/de/app/downcast/id668429425?mt=12&uo=4'
    },
    #{
      #title: 'gPodder'
      #scheme: 'gpodder://'
      #icon: 'osx/gpodder@2x.png'
      #install: 'http://gpodder.org/downloads'
    #},
    {
      title: 'Instacast'
      scheme: 'instacast://'
      icon: 'osx/instacast@2x.png'
      install: 'https://itunes.apple.com/de/app/instacast/id733258666?mt=12&uo=4'
    },
    {
      title: 'iTunes'
      scheme: 'itpc://'
      icon: 'osx/itunes@2x.png'
      install: 'http://www.apple.com/itunes/'
    }
  ]

  windowsPhone: [
    {
      title: 'BringCast'
      scheme: 'bringcast://subscribe/'
      icon: 'windowsphone/bringcast@2x.png'
      install: 'http://windowsphone.com/s?appId=e5abef38-d413-e011-9264-00237de2db9e'
      http: true
    },
    {
      title: 'Podcast Picker'
      scheme: 'podcastpicker://'
      icon: 'windowsphone/podcastpicker@2x.png'
      install: 'http://windowsphone.com/s?appId=79b72069-b656-47d2-bab1-fa2d4061825e'
    },
    {
      title: 'Podcasts'
      scheme: 'podcast:'
      icon: 'windowsphone/podcasts@2x.png'
    }
  ]

  windows7: [
    {
      title: 'gPodder'
      scheme: 'gpodder://'
      icon: 'windows/gpodder@2x.png'
      install: 'http://gpodder.org/downloads'
    },
    {
      title: 'iTunes'
      scheme: 'itpc://'
      icon: 'osx/itunes@2x.png'
      install: 'http://www.apple.com/itunes/'
    }
  ]

  windows8: [
    {
      title: 'gPodder'
      scheme: 'gpodder://'
      icon: 'windows/gpodder@2x.png'
      install: 'http://gpodder.org/downloads'
    },
    {
      title: 'iTunes'
      scheme: 'itpc://'
      icon: 'osx/itunes@2x.png'
      install: 'http://www.apple.com/itunes/'
    },
    {
      title: 'Podscout'
      scheme: 'podscout://'
      icon: 'windows/podscout@2x.png'
      install: 'http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17'
    }
  ]

  windows81: [
    #{
      #title: 'BringCast'
      #scheme: 'bringcast:'
      #icon: 'windows/bringcast@2x.png'
      #install: 'http://bringcast.com/'
    #},
    {
      title: 'gPodder'
      scheme: 'gpodder://'
      icon: 'windows/gpodder@2x.png'
      install: 'http://gpodder.org/downloads'
    },
    {
      title: 'iTunes'
      scheme: 'itpc://'
      icon: 'osx/itunes@2x.png'
      install: 'http://www.apple.com/itunes/'
    },
    {
      title: 'Podscout'
      scheme: 'podscout://'
      icon: 'windows/podscout@2x.png'
      install: 'http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17'
    }
  ]

  blackBerry: [
    #{
      #title: 'bPod'
      #scheme: '???:'
      #icon: 'blackberry/bpod@2x.png'
    #},
    #{
      #title: 'gPodder'
      #scheme: 'gpodder://'
      #icon: 'blackberry/gpodder@2x.png'
      #install: 'http://gpodder.org/downloads'
    #}
  ]



module.exports = Clients
