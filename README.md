# Podlove Subscribe Button
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpodlove%2Fpodlove-subscribe-button.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpodlove%2Fpodlove-subscribe-button?ref=badge_shield)


## General

[Official project page](http://podlove.org/podlove-subscribe-button/)

[Help translating](https://podlove.oneskyapp.com/collaboration/project?id=14564)

If you are a client developer and want to add your client to the list, please read the page above carefully and open an issue on this repository when you have fulfilled the requirements.

## Usage

### Using the Podlove CDN

We are hosting an always up-to-date version of the Podlove Subscribe Button code on our CDN. This is the preferred way to include the button on your web site.

    <script class="podlove-subscribe-button" src="https://cdn.podlove.org/subscribe-button/javascripts/app.js" data-language="de" data-size="small" data-json-data="podcastData" data-colors="red;green;blue" data-buttonid="123abc" data-hide="true"></script>

Currently, you can set these options:

    data-json-data: name of the variable where the button can find information about the podcast (see Podcast data API section)
    data-language: language the texts on the button and popup should be in (currently supports 'de', 'en', 'eo', 'fi', 'fr', 'nl', 'zh' and 'ja')
    data-size: size and style of the button ('small', 'medium', 'big'). All of the sizes can be combined with 'auto' to adapt the button width to the available space like this: 'big auto'
    data-color: define the color of the button (Please see section **Override Button Color** for more information)
    data-buttonid: you can use this to open the popup from another element on the same page (see section **Use your own button element**
    data-hide: if set to `true` the button will not be shown (useful if you want to use your own element
    data-format: choose a button format, default is a rectangle, options are 'square' and 'cover' (**Note**: 'cover' has a max size of 300px)
    data-style: choose a button style, default is filled, options are 'outline' and 'frameless'

### Self hosted

Put

    dist/*

into the same folder on a publicly available server. Then add a script tag to the place where you want the button to appear:

    <script class="podlove-subscribe-button" src="http://example.com/subscribe-button/javascripts/app.js" data-language="de" data-size="small" data-json-data="podcastData"></script>

There are currently two options you can set:

    data-json-data: name of the variable where the button can find information about the podcast (see Podcast data API section)
    data-language: language the texts on the button and popup should be in (currently supports 'de', 'en', 'eo', 'fi', 'fr', 'nl', 'zh' and 'ja')

### Podcast data API

To work the button needs information about the podcast, which needs to be provided in the following format:

    <script>
      window.podcastData = {
        "title": "Newz of the World",
        "subtitle": "Tim and Mark talk about the Newz™",
        "description": "Newz of the World is a weekly show about world news. Mark Fonseca Rendeiro and Tim Pritlove come together to present interesting reports and discuss their aspects and possible consequences. Newz of the world wants to be an alternative window to the common media flow and cherry picks interesting developments for you.",
        "cover": "http://meta.metaebene.me/media/newz/newz-logo-600x600.jpg",
        "feeds": [
          {
            "type": "audio",
            "format": "mp3",
            "url": "http://newz-of-the-world.com/feed/mp3",
            "variant": "high"
          },
          {
            "type": "audio",
            "format": "aac",
            "url": "http://newz-of-the-world.com/feed/mp4",
            "variant": "high",
            "directory-url-itunes": "https://itunes.apple.com/de/podcast/newz-of-the-world/id492588543"
          },
          {
            "type": "audio",
            "format": "ogg",
            "url": "http://newz-of-the-world.com/feed/ogg",
            "variant": "high"
          },
          {
            "type": "audio",
            "format": "opus",
            "url": "http://newz-of-the-world.com/feed/opus",
            "variant": "high"
          }
        ]
      }
    </script>

If everything went right you should see a button that will open a popup with subscribe buttons when clicked.

### Override Button Color

The color of the button is configurable by setting the `data-color` parameter on the script tag. If the parameter is not given the default will be used. Allowed are all notations for colors that CSS can understand (keyword, rgb-hex, rgb, rgba, hsl, hsla). See [here for more](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).

**Please Note:** It is not possible to style multiple buttons/popups on the same page differently. Unfortunately this is technically not possible at this moment. Please write us or create an issue, if you are interested in this feature.

### Use your own button element

For ultimate freedom you can use a completely different element on the page for opening the popup. To achieve this you have to set a unique ID for each button you have on the page like this:

    <script ... data-buttonid="123abc"></script>

Then define the element that should open the popup when clicked just like this:

    <a href="#" class="podlove-subscribe-button-123abc">Subscribe</a>

If you want to hide the original button you can combine ```data-buttonid``` with ```data-hide``` which, you already guessed it, will hide the button:

    <script ... data-buttonid="123abc" data-hide="true"></script>

### Add non-javascript fallback

If you want to provide a fallback when no javascript is present, we recommend to do it like this:

    <script class="podlove-subscribe-button" src="http://example.com/subscribe-button/javascripts/app.js" data-language="de" data-size="small" data-json-data="podcastData"></script>
    <noscript><a href="http://newz-of-the-world.com/feed/mp4">Subscribe to feed</a></noscript>

You can also provide more than one feed link if you have more.

## Supported Apps / Services

### Android
  * [AntennaPod](https://play.google.com/store/apps/details?id=de.danoeh.antennapod)
  * [Player.fm](https://play.google.com/store/apps/details?id=fm.player)
  * [Podcast Addict](https://play.google.com/store/apps/details?id=com.bambuna.podcastaddict)
  * [Podcatcher Deluxe](https://play.google.com/store/search?q=pub:Kevin%20Hausmann)
  * [Podkicker](https://play.google.com/store/apps/details?id=ait.podka)
  * [uPod](https://play.google.com/store/apps/details?id=mobi.upod.app)

### Cloud
  * [gpodder.net](https://gpodder.net/)
  * [Player.fm](https://player.fm/)
  * [Pocket Casts](https://play.pocketcasts.com/)

### iOS
  * [Castro](https://itunes.apple.com/app/castro-2/id1080840241)
  * [Downcast](https://itunes.apple.com/de/app/downcast/id393858566)
  * [iCatcher](https://itunes.apple.com/de/app/icatcher!-podcast-app/id414419105)
  * [Instacast](https://itunes.apple.com/de/app/instacast-4-podcast-client/id577056377)
  * [Overcast](https://itunes.apple.com/de/app/overcast-podcast-player/id888422857)
  * [PocketCasts](https://itunes.apple.com/de/app/pocket-casts/id414834813)
  * [Podcasts](https://itunes.apple.com/de/app/podcasts/id525463029)
  * [Podcat](https://itunes.apple.com/app/podcat/id845960230)
  * [PodGrasp](https://itunes.apple.com/de/app/podgrasp-podcast-player/id531648276)
  * [RSSRadio](https://itunes.apple.com/app/rssradio-premium-podcast-downloader/id679025359)

### Linux
  * [Clementine](undefined)
  * [gPodder](http://gpodder.org/downloads)

### OSX
  * [Downcast](https://itunes.apple.com/de/app/downcast/id668429425?mt=12&uo=4)
  * [Instacast](https://itunes.apple.com/de/app/instacast/id733258666?mt=12&uo=4)
  * [iTunes](http://www.apple.com/itunes/)
  * [PodGrasp](https://itunes.apple.com/de/app/podgrasp-podcast-player/id530928805)

### WindowsPhone
  * [BringCast](http://windowsphone.com/s?appId=e5abef38-d413-e011-9264-00237de2db9e)
  * [gramocast](http://windowsphone.com/s?appId=ebb52054-5071-4aa4-9537-00399d06a99e)
  * [Podcast Lounge](http://windowsphone.com/s?appId=83bc0329-8e02-410e-b6d2-da3c0c1d971d)
  * [Podcast Picker](http://windowsphone.com/s?appId=79b72069-b656-47d2-bab1-fa2d4061825e)
  * [Podcasts](undefined)

### Windows7
  * [gPodder](http://gpodder.org/downloads)
  * [iTunes](http://www.apple.com/itunes/)

### Windows8
  * [gPodder](http://gpodder.org/downloads)
  * [iTunes](http://www.apple.com/itunes/)
  * [Podscout](http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17)

### Windows81
  * [gPodder](http://gpodder.org/downloads)
  * [iTunes](http://www.apple.com/itunes/)
  * [Podscout](http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17)

## Development

Install requirements

    yarn install

Use gulp to build the project or start the server:

    yarn run build

    yarn run dev

## Contribution

If you want to help us translate the button to other languages, please [sign up here](https://podlove.oneskyapp.com/collaboration/project?id=14564) and let us know if you need any help!

If you find a bug please use [Github Issues](https://github.com/podlove/podlove-subscribe-button/issues) to report it. If you want to add a feature or fix a bug please fork the repository, make your changes in a feature branch and open a pull-request.

## Support
<a href="https://keycdn.com"><img src="https://logos.keycdn.com/keycdn-logo-black.svg" alt="KeyCDN" width="200px"></a>

## License

[MIT](https://github.com/podlove/podlove-subscribe-button/blob/master/LICENSE)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpodlove%2Fpodlove-subscribe-button.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpodlove%2Fpodlove-subscribe-button?ref=badge_large)
