class Clients
  android: [
    {
      title: 'AntennaPod'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/antennapod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod'
    },
    {
      title: 'BeyondPod'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/beyondpod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=mobi.beyondpod'
    },
    {
      title: 'PocketCasts'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/pocketcasts@2x.png'
      install: 'https://play.google.com/store/apps/details?id=au.com.shiftyjelly.pocketcasts'
    },
    {
      title: 'Podkicker'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/podkicker@2x.png'
      install: 'https://play.google.com/store/apps/details?id=ait.podka'
    },
    {
      title: 'uPod'
      scheme: 'pcast://'
      platform: ['android']
      icon: 'android/upod@2x.png'
      install: 'https://play.google.com/store/apps/details?id=mobi.upod.app'
    }
  ]

  ios: [
    {
      title: 'Apple Podcasts'
      scheme: 'pcast://'
      platform: ['ios']
      icon: 'ios/podcasts@2x.png'
      install: 'https://itunes.apple.com/de/app/podcasts/id525463029'
    },
    {
      title: 'Castro'
      scheme: 'castro://subscribe/'
      platform: ['ios']
      icon: 'ios/castro@2x.png'
      install: 'https://itunes.apple.com/de/app/castro-high-fidelity-podcasts/id723142770'
    },
    {
      title: 'Downcast'
      scheme: 'downcast://'
      platform: ['ios']
      icon: 'ios/downcast@2x.png'
      install: 'https://itunes.apple.com/de/app/downcast/id393858566'
    },
    #{
      #title: 'iCatcher'
      #scheme: 'icatcher://'
      #platform: ['ios']
      #icon: 'ios/icatcher@2x.png'
      #install: 'https://itunes.apple.com/de/app/icatcher!-podcast-app/id414419105'
    #},
    {
      title: 'Instacast'
      scheme: 'instacast://'
      platform: ['ios']
      icon: 'ios/instacast@2x.png'
      install: 'https://itunes.apple.com/de/app/instacast-4-podcast-client/id577056377'
    },
    {
      title: 'Overcast'
      scheme: 'overcast://x-callback-url/add?url='
      platform: ['ios']
      icon: 'ios/overcast@2x.png'
      install: 'https://itunes.apple.com/de/app/overcast-podcast-player/id888422857'
    },
    #{
      #title: 'PocketCasts'
      #scheme: 'pktc://'
      #platform: ['ios']
      #icon: 'ios/pocketcasts@2x.png'
      #install: 'https://itunes.apple.com/de/app/pocket-casts/id414834813'
    #},
    #{
      #title: 'Podcat'
      #scheme: 'podcat://'
      #platform: ['ios']
      #icon: 'ios/podcat@2x.png'
    #},
  ]

  osx: [
    {
      title: 'Downcast'
      scheme: 'downcast://'
      platform: ['osx']
      icon: 'osx/downcast@2x.png'
      install: 'https://itunes.apple.com/de/app/downcast/id668429425?mt=12&uo=4'
    },
    {
      title: 'Instacast'
      scheme: 'instacast://'
      platform: ['osx']
      icon: 'osx/instacast@2x.png'
      install: 'https://itunes.apple.com/de/app/instacast/id733258666?mt=12&uo=4'
    },
    {
      title: 'iTunes'
      scheme: 'itpc://'
      platform: ['osx']
      icon: 'osx/itunes@2x.png'
      install: 'http://www.apple.com/itunes/'
    }
  ]

  windowsPhone: [
    {
      title: 'Podcasts'
      scheme: 'wp-podcast://'
      platform: 'windowsPhone'
    }
  ]

module.exports = Clients
