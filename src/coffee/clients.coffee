class Clients
  constructor: (platform) ->
    return @[platform]

  rss: {
    title: 'Other Client (RSS)'
    icon: 'rss.png'
  }

  cloud: [
    {
      title: 'gpodder.net'
      scheme: 'https://gpodder.net/search/?q='
      icon: 'cloud/gpodder@2x.jpg'
      register: 'https://gpodder.net/'
    }
  ]

  android: [
    {
      title: 'AntennaPod'
      scheme: 'pcast://'
      icon: 'android/antennapod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod'
    },
    {
      title: 'BeyondPod'
      scheme: 'pcast://'
      icon: 'android/beyondpod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=mobi.beyondpod'
    },
    {
      title: 'PocketCasts'
      scheme: 'pcast://'
      icon: 'android/pocketcasts@2x.png'
      install: 'https://play.google.com/store/apps/details?id=au.com.shiftyjelly.pocketcasts'
    },
    {
      title: 'Podkicker'
      scheme: 'pcast://'
      icon: 'android/podkicker@2x.png'
      install: 'https://play.google.com/store/apps/details?id=ait.podka'
    },
    {
      title: 'uPod'
      scheme: 'pcast://'
      icon: 'android/upod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=mobi.upod.app'
    }
  ]

  ios: [
    {
      title: 'Apple Podcasts'
      scheme: 'pcast://'
      icon: 'ios/podcasts@2x.png'
      install: 'https://itunes.apple.com/de/app/podcasts/id525463029'
    },
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
    #{
      #title: 'iCatcher'
      #scheme: 'icatcher://'
      #icon: 'ios/icatcher@2x.png'
      #install: 'https://itunes.apple.com/de/app/icatcher!-podcast-app/id414419105'
    #},
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
    #{
      #title: 'PocketCasts'
      #scheme: 'pktc://'
      #icon: 'ios/pocketcasts@2x.png'
      #install: 'https://itunes.apple.com/de/app/pocket-casts/id414834813'
    #},
    #{
      #title: 'Podcat'
      #scheme: 'podcat://'
      #icon: 'ios/podcat@2x.png'
    #},
  ]

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
    {
      title: 'Podcasts'
      scheme: 'wp-podcast://'
    }
  ]

module.exports = Clients
