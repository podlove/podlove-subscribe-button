# Podlove Subscribe Button

## General

[Official project page](http://podlove.org/podlove-subscribe-button/)

[Help translating](https://podlove.oneskyapp.com/collaboration/project?id=14564)

If you are a client developer and want to add your client to the list, please read the page above carefully and open an issue on this repository when you have fulfilled the requirements.

## Usage

### Through our CDN

    <script class="podlove-subscribe-button" src="http://cdn.podlove.org/subscribe-button/javascripts/app.js" data-language="de" data-size="small" data-json-data="podcastData"></script>

There are currently three options you can set:

    data-json-data: name of the variable where the button can find information about the podcast (see Podcast data API section)
    data-language: language the texts on the button and popup should be in (currently supports 'de', 'en' and 'ja')
    data-size: size and style of the button ('small', 'medium', 'big', 'big-logo'). All of the sizes can be combinated with 'auto' to adapt the button width to the available space like this: 'big-logo auto'

### Self hosted

Put

    dist/*

into the same folder on a publicly available server. Then add a script tag to the place where you want the button to appear:

    <script class="podlove-subscribe-button" src="http://example.com/subscribe-button/javascripts/app.js" data-language="de" data-size="small" data-json-data="podcastData"></script>

There are currently two options you can set:

    data-json-data: name of the variable where the button can find information about the podcast (see Podcast data API section)
    data-language: language the texts on the button and popup should be in (currently supports 'de', 'en' and 'ja')

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
            "variant": "high"
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

### Add non-javascript fallback

If you want to provide a fallback when no javascript is present, we recommend to do it like this:

    <script class="podlove-subscribe-button" src="http://example.com/subscribe-button/javascripts/app.js" data-language="de" data-size="small" data-json-data="podcastData"></script>
    <noscript><a href="http://newz-of-the-world.com/feed/mp4">Subscribe to feed</a></noscript>

You can also provide more than one feed link if you have more.

## Development

Install requirements

    gem install sass
    npm install -g gulp
    npm install gulp-util gulp-coffee gulp-ruby-sass gulp-watch gulp-uglify gulp-concat gulp-browserify gulp-rename gulp-connect uglify-js

Use gulp to build the project or start the watcher:

    gulp

    gulp watch

## Contribution

If you want to help us translate the button to other languages, please [sign up here](https://podlove.oneskyapp.com/collaboration/project?id=14564) and let us know if you need any help!

If you find a bug please use [Github Issues](https://github.com/podlove/podlove-subscribe-button/issues) to report it. If you want to add a feature or fix a bug please fork the repository, make your changes in a feature branch and open a pull-request.

## License

[MIT](https://github.com/podlove/podlove-subscribe-button/blob/master/LICENSE)
