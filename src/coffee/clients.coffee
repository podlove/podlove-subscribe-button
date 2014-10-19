class Clients
  constructor: (platform, osDefault=false) ->
    if osDefault
      return @['os_defaults'][platform]

    return @[platform]

  rss: {
    title: 'Other Client (RSS)'
    icon: 'rss.png'
  }

  os_defaults: {
    android: {
      scheme: 'pcast:'
      icon: 'android@2x.png'
    }
  }

  cloud: [
    {
      title: 'gpodder.net'
      scheme: 'http://gpodder.net/subscribe?url='
      icon: 'cloud/gpodder@2x.jpg'
      register: 'https://gpodder.net/'
      http: true
    },
    {
      title: 'Player.fm'
      scheme: 'https://player.fm/subscribe?id='
      icon: 'cloud/playerfm@2x.png'
      register: 'https://player.fm/'
      http: true
    }
  ]

  android: [
    #{
      #title: 'AntennaPod'
      #scheme: 'pcast://'
      #icon: 'android/antennapod@2x.png'
      #install: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod'
    #},
    #{
      #title: 'BeyondPod'
      #scheme: 'pcast://'
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
      title: 'Podkicker Pro'
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
    }
  ],
  osx: [
    {
      title: 'Downcast'
      scheme: 'downcast://'
      icon: 'osx/downcast@2x.png'
      install: 'https://itunes.apple.com/de/app/downcast/id668429425?mt=12&uo=4'
    },
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
    #{
      #title: 'Podcasts'
      #scheme: 'pcast:'
      #icon: 'icon-medium@2x.png'
    #}
  ]

  windows7: [
    {
      title: 'iTunes'
      scheme: 'itpc://'
      icon: 'osx/itunes@2x.png'
      install: 'http://www.apple.com/itunes/'
    }
  ]

  windows8: [
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

module.exports = Clients
