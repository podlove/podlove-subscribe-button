# Podlove Subscribe It

## Usage

Put

    build/javascripts/subscribe-it.min.js
    build/stylesheets/subscribe-it.css
    build/button.html
    build/popup.html

onto a publicly available server. Then add a script tag to the place where you want the button to appear:

    <script name="subscribe-it" src="http://example.com/subscribe-it.min.js" data-url="http://example.com/feed.xml" data-lang="en"></script>

There are currently two options you can set:

    data-url: feed URL people can subscribe to
    data-lang: language the texts on the button and popup should be in (currently supports 'de', 'en' and 'fr')

If everything went right you should see a button that will open a popup with subscribe buttons when clicked.

## Development

Install requirements

    npm install gulp gulp-util gulp-coffee gulp-ruby-sass gulp-watch

Use gulp to build the project or start the watcher:

    gulp

    gulp watch

## License

[MIT](https://github.com/benzimmer/podlove-subscribe-it/blob/master/LICENSE)
