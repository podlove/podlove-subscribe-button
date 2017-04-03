<<<<<<< HEAD
!function t(e,n,i){function r(s,a){if(!n[s]){if(!e[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=n[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return r(n?n:t)},c,c.exports,t,e,n,i)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(t){var e,n,i,r,o,s,a,l,c,u,p=function(t,e){return function(){return t.apply(e,arguments)}};e=t("../../vendor/zepto-browserify.js").Zepto,u=t("../../vendor/underscore-min.js"),n=t("./button.coffee"),s=t("./popup.coffee"),c=t("./utils.coffee"),o=t("./iframe_resizer.coffee"),r=t("./iframe_click.coffee"),i=t("./colors.coffee"),l=t("./translations.coffee"),a=function(){function t(t){return this.openPopup=p(this.openPopup,this),this.scriptElem=e(t),this.getOptions(),this.checkForValidLanguage(),this.getPodcastData(),this.checkIntegrity(),this.addCss(),this.renderButtonIframe(),this}return t.init=function(n){var i,r,o,s,a;if(null==n&&(n=".podlove-subscribe-button"),a=[],r=e(n),0!==r.length){for(o=0,s=r.length;s>o;o++)i=r[o],a.push(new t(i));return window.subscribeButtons=a}},t.prototype.update=function(){return this.getPodcastData()},t.prototype.getOptions=function(){var t,n;return t={size:"medium",style:"filled",format:"rectangle"},n={scriptPath:this.scriptElem.attr("src").match(/(^.*\/)/)[0].replace(/javascripts\/$/,"").replace(/\/$/,""),language:this.scriptElem.data("language"),size:this.scriptElem.data("size"),buttonId:this.scriptElem.data("buttonid"),hide:this.scriptElem.data("hide"),style:this.scriptElem.data("style"),format:this.scriptElem.data("format")},n.color=this.scriptElem.data("color")?new i(this.scriptElem.data("color")):new i(this.scriptElem.data("colors")),n.size.indexOf("-logo")>=0&&(n.size=n.size.replace("-logo",""),n.format="cover"),this.options=e.extend(t,n)},t.prototype.checkForValidLanguage=function(){var t;return t=new l(this.options.language),t.supportsLanguage()?void 0:this.options.language=l.defaultLanguage},t.prototype.getPodcastData=function(){var t,e;return(e=this.scriptElem.data("json-url"))&&this.fetchPodcastDataFromUrl(e),(t=this.scriptElem.data("json-data"))?this.extractPodcastDataFromJson(window[t]):void 0},t.prototype.fetchPodcastDataFromUrl=function(){},t.prototype.extractPodcastDataFromJson=function(t){return this.podcast=t},t.prototype.checkIntegrity=function(){var t;return 0===this.podcast.feeds.length?(t="Subscribe Button Error. Please add at least one feed.",console.warn(t),window.alert(t)):void 0},t.prototype.renderButtonIframe=function(){var t;return t=this.iframe(),this.options.hide&&e(t).hide(),this.scriptElem.replaceWith(t)},t.prototype.addCss=function(){var t;return t=e("<link rel='stylesheet' href='"+this.options.scriptPath+"/stylesheets/app.css'></script>"),this.scriptElem.after(t),t.after(this.options.color.toStyles())},t.prototype.iframe=function(){var t,n,i;return this.options.id=Math.floor(65536*(1+Math.random())).toString(16).substring(1),i=escape(this.podcast.title),t=this.options.scriptPath+"/button.html?id="+this.options.id+"&language="+this.options.language+"&size="+this.options.size+"&style="+this.options.style+"&format="+this.options.format+"&podcastTitle="+i+"&podcastCover="+this.podcast.cover+this.options.color.toParams(),n=e("<iframe>").attr("src",encodeURI(t)).attr("id",this.options.id).addClass("podlove-subscribe-button-iframe").css({border:"none",display:"inline-block",overflow:"hidden"}),o.listen("resizeButton",n),r.listen(n,this.openPopup,this.options),this.options.buttonId&&e(".podlove-subscribe-button-"+this.options.buttonId).on("click",function(t){return function(){return t.openPopup(t.options)}}(this)),n},t.prototype.openPopup=function(t){return new s(this.podcast,t)},t}(),window.SubscribeButton=a,window.Button=n,e(function(){return a.init()})},{"../../vendor/underscore-min.js":17,"../../vendor/zepto-browserify.js":18,"./button.coffee":2,"./colors.coffee":5,"./iframe_click.coffee":7,"./iframe_resizer.coffee":8,"./popup.coffee":11,"./translations.coffee":12,"./utils.coffee":14}],2:[function(t,e){var n,i,r,o,s;n=t("../../vendor/zepto-browserify.js").Zepto,s=t("./utils.coffee"),o=t("./translations.coffee"),r=t("./colors.coffee"),i=function(){function t(){this.getOptions(),this.I18n=new o(this.options.language),this.elem=n("#podlove-subscribe-button"),/auto/.test(this.options.size)&&(this.autoSize=!0),this.addFormat(),this.addStyle(),this.render(),window.setTimeout(function(t){return function(){return t.resizeIframe()}}(this),10)}return t.prototype.render=function(){var t;return this.elem.addClass(this.options.size.replace("%20"," ")),this.elem.prop("title",this.I18n.t("button")),this.elem.on("click",function(t){return function(){return window.parent.postMessage("clicked_"+t.options.id,"*")}}(this)),this.buttonHtml&&this.elem.html(this.buttonHtml),this.logoElem&&(t="<img src='"+this.options.podcastCover+"' alt='Logo of "+this.options.podcastTitle+"'>",this.logoElem.html(t),this.logoElem.on("click",function(t){return function(){return window.parent.postMessage("clicked_"+t.options.id,"*")}}(this))),this.setColors()},t.prototype.setColors=function(){var t;return t=r.fromParams(this.options),this.elem.after(t.toStyles())},t.prototype.getOptions=function(){return this.options=s.locationToOptions(window.location.search)},t.prototype.addFormat=function(){return"square"!==this.options.format?this.buttonHtml="<span>"+this.I18n.t("button")+"</span>":"square"===this.options.format&&this.elem.addClass("square"),"cover"===this.options.format?this.logoElem=n("#podlove-subscribe-button-logo"):void 0},t.prototype.addStyle=function(){return"frameless"===this.options.style?this.elem.addClass("frameless"):"outline"===this.options.style?this.elem.addClass("outline"):void 0},t.prototype.resizeIframe=function(){var t,e,n,i,r;return n=function(t){return function(e,n){var i;return i=JSON.stringify({id:t.options.id,listenTo:"resizeButton",height:e,width:n}),window.parent.postMessage(i,"*")}}(this),t=this.elem.height(),r=this.autoSize&&!this.logoElem?"100%":this.elem.width(),this.logoElem?(e=this.logoElem.find("img"),i=function(e){return function(){return e.logoElem.height(r),t+=r,e.logoElem.show(),n(t,r)}}(this),e[0].complete?i():e.on("load",i)):n(t,r)},t}(),e.exports=i},{"../../vendor/zepto-browserify.js":18,"./colors.coffee":5,"./translations.coffee":12,"./utils.coffee":14}],3:[function(t,e){var n;n=function(){function t(t,e){return null==e&&(e=!1),e?this.os_defaults[t]:this[t]}return t.prototype.printClientList=function(){var t,e,n,i,r,o,s,a,l,c;for(s=["Android","Cloud","iOS","Linux","OSX","WindowsPhone","Windows7","Windows8","Windows81"],l=[],t=0,i=s.length;i>t;t++){for(o=s[t],console.log("### "+o),a=this[o.toLowerCase()],n=0,r=a.length;r>n;n++)e=a[n],c=e.register||e.store||e.install,console.log("  * ["+e.title+"]("+c+")");l.push(console.log(""))}return l},t.prototype.rss={title:"Other (Feed URL)",icon:"generic/rss.png"},t.prototype.os_defaults={android:{scheme:"pcast:",icon:"generic/android.png"},windows8:{scheme:"pcast:",icon:"generic/windows8.png"},windowsphone:{scheme:"pcast:",icon:"generic/windowsphone.png"}},t.prototype.cloud=[{title:"gpodder.net",scheme:"http://gpodder.net/subscribe?url=",icon:"cloud/gpoddernet.png",register:"https://gpodder.net/",http:!0},{title:"Player.fm",scheme:"https://player.fm/subscribe?id=",icon:"cloud/playerfm.png",register:"https://player.fm/",http:!0},{title:"Pocket Casts",scheme:"http://pcasts.in/feed/",icon:"cloud/pocketcasts.png",register:"https://play.pocketcasts.com/",http:!1}],t.prototype.android=[{title:"AntennaPod",scheme:"antennapod-subscribe://",icon:"android/antennapod.png",store:"https://play.google.com/store/apps/details?id=de.danoeh.antennapod"},{title:"BeyondPod",scheme:"beyondpod://",icon:"android/beyondpod.png",store:"https://play.google.com/store/apps/details?id=mobi.beyondpod"},{title:"Player.fm",scheme:"https://player.fm/subscribe?id=",icon:"android/playerfm.png",store:"https://play.google.com/store/apps/details?id=fm.player"},{title:"Podcast Addict",scheme:"podcastaddict://",icon:"android/podcastaddict.png",store:"https://play.google.com/store/apps/details?id=com.bambuna.podcastaddict"},{title:"Podcatcher Deluxe",scheme:"pcd://",icon:"android/podcatcher-deluxe.png",store:"https://play.google.com/store/search?q=pub:Kevin%20Hausmann"},{title:"Podkicker",scheme:"podkicker://subscribe/",icon:"android/podkicker.png",store:"https://play.google.com/store/apps/details?id=ait.podka"},{title:"uPod",scheme:"upod://",icon:"android/upod.png",store:"https://play.google.com/store/apps/details?id=mobi.upod.app"}],t.prototype.ios=[{title:"Castro",scheme:"castro://subscribe/",icon:"ios/castro.png",store:"https://itunes.apple.com/de/app/castro-high-fidelity-podcasts/id723142770"},{title:"Downcast",scheme:"downcast://",icon:"ios/downcast.png",store:"https://itunes.apple.com/de/app/downcast/id393858566"},{title:"iCatcher",scheme:"icatcher://",icon:"ios/icatcher.png",store:"https://itunes.apple.com/de/app/icatcher!-podcast-app/id414419105"},{title:"Instacast",scheme:"instacast://",icon:"ios/instacast.png"},{title:"Overcast",scheme:"overcast://x-callback-url/add?url=",icon:"ios/overcast.png",store:"https://itunes.apple.com/de/app/overcast-podcast-player/id888422857"},{title:"PocketCasts",scheme:"pktc://subscribe/",icon:"ios/pocketcasts.png",store:"https://itunes.apple.com/de/app/pocket-casts/id414834813"},{title:"Podcasts",scheme:"pcast://",icon:"ios/podcasts.png",store:"https://itunes.apple.com/de/app/podcasts/id525463029"},{title:"Podcat",scheme:"podcat://",icon:"ios/podcat.png",store:"https://itunes.apple.com/app/podcat/id845960230"},{title:"PodGrasp",scheme:"podgrasp://subscribe/",icon:"ios/podgrasp.png",store:"https://itunes.apple.com/de/app/podgrasp-podcast-player/id531648276"},{title:"RSSRadio",scheme:"rssradio://",icon:"ios/rssradio.png",store:"https://itunes.apple.com/app/rssradio-premium-podcast-downloader/id679025359"}],t.prototype.linux=[{title:"Clementine",scheme:"itpc://",icon:"linux/clementine.png"},{title:"gPodder",scheme:"gpodder://",icon:"linux/gpodder.png",install:"http://gpodder.org/downloads"}],t.prototype.osx=[{title:"Downcast",scheme:"downcast://",icon:"osx/downcast.png",store:"https://itunes.apple.com/de/app/downcast/id668429425?mt=12&uo=4"},{title:"Instacast",scheme:"instacast://",icon:"osx/instacast.png"},{title:"iTunes",scheme:"itpc://",icon:"osx/itunes.png",install:"http://www.apple.com/itunes/",customFeedType:"itunes"},{title:"PodGrasp",scheme:"podgrasp://subscribe/",icon:"osx/podgrasp.png",store:"https://itunes.apple.com/de/app/podgrasp-podcast-player/id530928805"}],t.prototype.windowsphone=[{title:"BringCast",scheme:"bringcast://subscribe/",icon:"windowsphone/bringcast.png",store:"http://windowsphone.com/s?appId=e5abef38-d413-e011-9264-00237de2db9e"},{title:"gramocast",scheme:"gramocast://subscribe/",icon:"windowsphone/gramocast.png",store:"http://windowsphone.com/s?appId=ebb52054-5071-4aa4-9537-00399d06a99e"},{title:"Podcast Lounge",scheme:"podcastlounge://subscribe/",icon:"windowsphone/podcastlounge.png",store:"http://windowsphone.com/s?appId=83bc0329-8e02-410e-b6d2-da3c0c1d971d"},{title:"Podcast Picker",scheme:"podcastpicker://",icon:"windowsphone/podcastpicker.png",store:"http://windowsphone.com/s?appId=79b72069-b656-47d2-bab1-fa2d4061825e"},{title:"Podcasts",scheme:"podcast:",icon:"windowsphone/podcasts.png"}],t.prototype.windows7=[{title:"gPodder",scheme:"gpodder://",icon:"windows/gpodder.png",install:"http://gpodder.org/downloads"},{title:"iTunes",scheme:"itpc://",icon:"osx/itunes.png",install:"http://www.apple.com/itunes/",customFeedType:"itunes-url"}],t.prototype.windows8=[{title:"gPodder",scheme:"gpodder://",icon:"windows/gpodder.png",install:"http://gpodder.org/downloads"},{title:"iTunes",scheme:"itpc://",icon:"osx/itunes.png",install:"http://www.apple.com/itunes/",customFeedType:"itunes-url"},{title:"Podscout",scheme:"podscout://",icon:"windows/podscout.png",store:"http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17"}],t.prototype.windows81=[{title:"gPodder",scheme:"gpodder://",icon:"windows/gpodder.png",install:"http://gpodder.org/downloads"},{title:"iTunes",scheme:"itpc://",icon:"osx/itunes.png",install:"http://www.apple.com/itunes/",customFeedType:"itunes-url"},{title:"Podscout",scheme:"podscout://",icon:"windows/podscout.png",store:"http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17"}],t.prototype.windows10=[{title:"gPodder",scheme:"gpodder://",icon:"windows/gpodder.png",install:"http://gpodder.org/downloads"},{title:"iTunes",scheme:"itpc://",icon:"osx/itunes.png",install:"http://www.apple.com/itunes/",customFeedType:"itunes-url"},{title:"Podscout",scheme:"podscout://",icon:"windows/podscout.png",store:"http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17"}],t.prototype.blackBerry=[],t}(),e.exports=n},{}],4:[function(t,e){var n,i,r,o,s,a,l,c=function(t,e){return function(){return t.apply(e,arguments)}},u=function(t,e){function n(){this.constructor=t}for(var i in e)p.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},p={}.hasOwnProperty;n=t("../../vendor/zepto-browserify.js").Zepto,o=t("../../vendor/handlebars.min.js").Handlebars,l=t("../../vendor/underscore-min.js"),a=t("./utils.coffee"),i=t("./clients.coffee"),s=t("./panel.coffee"),r=function(t){function e(t,e){var n;this.container=t,this.parent=e,this.findCustomFeed=c(this.findCustomFeed,this),this.podcast=this.parent.podcast,this.platform=this.parent.platform,this.clients=new i(this.platform),this.osDefault=new i(this.platform,!0),this.cloudClients=new i("cloud"),this.prepareClients(this.parent.options.scriptPath)?this.render():(n="No usable feed found. Please add at least one feed.",console.warn(n))}return u(e,t),e.prototype.context=function(){return{cover:this.podcast.cover,title:this.podcast.title,subtitle:this.podcast.subtitle,clients:this.clients,platform:this.platform,otherClient:this.otherClient,cloudClients:this.cloudClients,osDefault:this.osDefault,scriptPath:this.parent.options.scriptPath,podcastTitle:this.podcast.title,podcastSubtitle:this.podcast.subtitle,podcastCover:this.podcast.cover}},e.prototype.detectBestFormat=function(){var t;return t="android"===this.platform?["mp3","aac","ogg","opus"]:["aac","mp3","ogg","opus"],l(t).find(function(t){return function(e){return l(t.podcast.feeds).findWhere({format:e})}}(this))},e.prototype.chooseFeed=function(){var t,e;return e=this.detectBestFormat(),t=l(this.podcast.feeds).findWhere({format:e})},e.prototype.findCustomFeed=function(t){return(l(this.podcast.feeds).findWhere({type:t})||{}).url},e.prototype.prepareClients=function(t){var e,n,r,o,s,c,u,p,h,f,d,g,m;if(o=this.chooseFeed()||{},s=o.url.replace(/^(http|https):\/\//,""),!o.url)return!1;for(f=this.clients,c=0,p=f.length;p>c;c++)e=f[c],a.fixIconPath(e,t),g=""+e.scheme+s,e.url=(m=e.customFeedType)?(r=o["directory-url-"+m])?r:g:g;for(l(this.clients).shuffle(),d=this.cloudClients,u=0,h=d.length;h>u;u++)e=d[u],a.fixIconPath(e,t),n=e.http?o.url:s,e.post?(e.url=e.scheme,e.feedUrl=n):e.url=""+e.scheme+n;return l(this.cloudClients).shuffle(),a.fixIconPath(this.osDefault,t),this.osDefault.title="Let device decide",this.osDefault.originalUrl=o.url,null!==this.osDefault.scheme&&(this.osDefault.url=""+this.osDefault.scheme+s,this.osDefault.scheme=null),this.otherClient=new i("rss"),a.fixIconPath(this.otherClient,t),this.otherClient.originalUrl=o.url},e.prototype.render=function(){var t;return this.elem=n(this.template(this.context())),this.container.append(this.elem),this.elem.find("li a").on("click",function(t){return function(e){var i,r,o;return i=n(e.target).data("client"),r=n(e.target).data("platform"),o=n(e.target).attr("href"),t.showClient(i,r,o)}}(this)),this.elem.find(".podlove-subscribe-local").on("click",function(t){return function(e){return t.elem.find(".local-clients").show(),t.elem.find(".cloud-clients").hide(),n(e.target).addClass("active"),n(e.target).next().removeClass("active")}}(this)),this.elem.find(".podlove-subscribe-cloud").on("click",function(t){return function(e){return t.elem.find(".local-clients").hide(),t.elem.find(".cloud-clients").show(),n(e.target).addClass("active"),n(e.target).prev().removeClass("active")}}(this)),t=this.elem.find("li form"),t.length?(t.find("a").off("click"),t.find("a").on("click",function(e){return function(i){var r,o,s;return i.preventDefault(),t.submit(),r=n(i.target).data("client"),o=n(i.target).data("platform"),s=n(i.target).attr("href"),e.showClient(r,o,s)}}(this))):void 0},e.prototype.showClient=function(t,e){var n;return this.parent.movePanels(2),n="rss"===t?this.otherClient:"cloud"===e?l(this.cloudClients).findWhere({title:t}):l(this.clients).findWhere({title:t}),null==n&&(n=this.osDefault),this.parent.finishPanel.render(n,this.podcast)},e.prototype.template=o.compile('<div> <div class="device-cloud-switch"> <button class="podlove-subscribe-local active">{{t "clients_panel.app"}}<span class="podlove-subscribe-tab-active"></span></button><!-- --><button class="podlove-subscribe-cloud">{{t "clients_panel.cloud"}}<span class="podlove-subscribe-tab-active"></span></button> </div> <div class="client-list"> <ul class="local-clients"> {{#if osDefault.icon}} <li> <a href="{{osDefault.url}}" data-client="{{osDefault.title}}" target="_blank"> <img src="{{osDefault.icon}}"> {{osDefault.title}} </a> </li> {{/if}} {{#each clients}} <li> <a href="{{url}}" data-client="{{title}}" target="_blank"> <img src="{{icon}}"> {{title}} </a> </li> {{/each}} <li> <a data-client="rss"> <img src="{{otherClient.icon}}"> {{t "clients_panel.other_client"}} </a> </li> </ul> <ul class="cloud-clients"> {{#each cloudClients}} <li> {{#if post}} <form method="post" action="{{url}}" target="_blank"> <input type="hidden" name="url" value="{{feedUrl}}"> <input type="hidden" name="title" value="{{../../podcastTitle}}"> <input type="hidden" name="subtitle" value="{{../../podcastSubtitle}}"> <input type="hidden" name="image" value="{{../../podcastCover}}"> <a href="{{url}}" data-client="{{title}}" data-platform="cloud"> <img src="{{icon}}"> {{title}} </a> </form> {{else}} <a href="{{url}}" data-client="{{title}}" data-platform="cloud" target="_blank"> <img src="{{icon}}"> {{title}} </a> {{/if}} </li> {{/each}} </ul> </div> </div>'),e}(s),e.exports=r},{"../../vendor/handlebars.min.js":15,"../../vendor/underscore-min.js":17,"../../vendor/zepto-browserify.js":18,"./clients.coffee":3,"./panel.coffee":9,"./utils.coffee":14}],5:[function(t,e){var n,i,r,o;n=t("../../vendor/zepto-browserify.js").Zepto,o=t("../../vendor/underscore-min.js"),r=t("../../vendor/tinycolor-min.js"),i=function(){function t(t){this._setDefaults(),this._extractColors(t)}return t.fromParams=function(e){var n;return n=new t,o(t.colorDefaults).each(function(){return function(i){return n[i.name]=t.decode(e[i.name])}}(this)),n},t.prototype.toParams=function(){var e;return e="",o(t.colorDefaults).each(function(n){return function(i){return e+="&"+i.name+"="+t.encode(n[i.name])}}(this)),e},t.prototype.toStyles=function(){var e,i;return this.buttonColor=new r(this.buttonColor),this.backgroundHoverColor=t.getHoverColor(this.buttonColor.clone()),this.fontColor=t.getContrastColor(this.buttonColor.clone()),this.fontHoverColor=t.getHoverColor(this.fontColor.clone()),this.isolatedColor=t.getIsolatedColor(this.buttonColor.clone()),this.isolatedHoverColor=t.getHoverColor(this.isolatedColor.clone()),this.alphaColor=this.buttonColor.clone().setAlpha(.5),e="#podlove-subscribe-button, .podlove-subscribe-button { background-color: "+this.buttonColor+"; color: "+this.fontColor+"; } #podlove-subscribe-button:active, .podlove-subscribe-button:active, #podlove-subscribe-button:hover, .podlove-subscribe-button:hover { background-color: "+this.backgroundHoverColor+"; color: "+this.fontHoverColor+"; } #podlove-subscribe-button.outline { border-color: "+this.buttonColor+"; color: "+this.buttonColor+"; } #podlove-subscribe-button.outline:active, #podlove-subscribe-button.outline:hover { background-color: "+this.buttonColor+"; color: "+this.fontColor+"; } #podlove-subscribe-button.frameless { color: "+this.buttonColor+"; } #podlove-subscribe-button.frameless:active, #podlove-subscribe-button.frameless:hover { color: "+this.backgroundHoverColor+"; } #podlove-subscribe-popup #podlove-subscribe-popup-close-button, #podlove-subscribe-popup #podlove-subscribe-popup-help-button, #podlove-subscribe-popup .podlove-subscribe-back-button { color: "+this.isolatedColor+"; } #podlove-subscribe-popup #podlove-subscribe-popup-close-button:active, #podlove-subscribe-popup #podlove-subscribe-popup-help-button:active, #podlove-subscribe-popup .podlove-subscribe-back-button:active, #podlove-subscribe-popup #podlove-subscribe-popup-close-button:hover, #podlove-subscribe-popup #podlove-subscribe-popup-help-button:hover, #podlove-subscribe-popup .podlove-subscribe-back-button:hover { color: "+this.isolatedHoverColor+"; } #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button .podlove-subscribe-tab-active { background-color: "+this.buttonColor+"; } #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button:active, #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button:hover, #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button.active { color: "+this.isolatedColor+"; } #podlove-subscribe-popup #podlove-subscribe-panel-clients li:active, #podlove-subscribe-popup #podlove-subscribe-panel-clients li:hover { background-color: "+this.buttonColor+"; color: "+this.fontColor+"; } #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-popup-finish-register { color: "+this.isolatedColor+"; } #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-popup-finish-register:active, #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-popup-finish-register:hover { color: "+this.isolatedHoverColor+"; } #podlove-subscribe-popup #podlove-subscribe-button-help-panel { background-color: "+this.buttonColor+"; color: "+this.fontColor+"; } #podlove-subscribe-popup h1::selection, #podlove-subscribe-popup p::selection, #podlove-subscribe-popup input::selection, #podlove-subscribe-popup span::selection, #podlove-subscribe-popup img::selection { background-color: "+this.alphaColor+"; } #podlove-subscribe-popup h1::-moz-selection, #podlove-subscribe-popup p::-moz-selection, #podlove-subscribe-popup input::-moz-selection, #podlove-subscribe-popup span::-moz-selection, #podlove-subscribe-popup img::-moz-selection { background-color: "+this.alphaColor+"; }",i=n("<style></style>"),i.append(e),i},t.prototype._setDefaults=function(){return o(t.colorDefaults).each(function(t){return function(e){return t[e.name]=e["default"]}}(this))},t.colorDefaults=[{name:"buttonColor","default":"#75ad91"}],t.prototype._extractColors=function(t){var e;if(t)return e=t.split(";"),this._setColor("buttonColor",e[0])},t.prototype._setColor=function(t,e){return""!==e?this[t]=e:void 0},t.encode=function(t){return encodeURIComponent(t)},t.decode=function(t){return decodeURIComponent(t)},t.getContrastColor=function(t){return this.newColor=t.clone(),this.newColor=t.getBrightness()>=190?t.darken(70):t.getBrightness()>=155&&t.getBrightness()<190?t.darken(45):t.getBrightness()<155&&t.getBrightness()>=50?t.lighten(45):t.lighten(70),this.newColor},t.getHoverColor=function(t){return this.newColor=t.clone(),this.newColor=t.getBrightness()<50?t.lighten(15):t.darken(10),this.newColor},t.getIsolatedColor=function(t){return this.newColor=t.clone(),t.getBrightness()>=170&&(this.newColor=t.darken(35)),this.newColor},t}(),e.exports=i},{"../../vendor/tinycolor-min.js":16,"../../vendor/underscore-min.js":17,"../../vendor/zepto-browserify.js":18}],6:[function(t,e){var n,i,r,o,s=function(t,e){function n(){this.constructor=t}for(var i in e)a.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},a={}.hasOwnProperty;n=t("../../vendor/zepto-browserify.js").Zepto,r=t("../../vendor/handlebars.min.js").Handlebars,o=t("./panel.coffee"),i=function(t){function e(t,e){this.container=t,this.parent=e}return s(e,t),e.prototype.context=function(t,e){return{client:t,podcast:e,scriptPath:this.parent.options.scriptPath,platform:this.parent.platform}},e.prototype.render=function(t,e){var i,r,o;return this.container.empty(),this.elem=n(this.template(this.context(t,e))),this.container.append(this.elem),this.elem.find("input").on("click",function(){return this.select()}),r=this.elem.find(".copy-url-button"),r.hide(),o=this.elem.find(".copy-url-field"),i=this.elem.find(".copy-notification"),i.hide(),this.attachCopyFunctionality(r,o,i)},e.prototype.attachCopyFunctionality=function(t,e,n){return document.queryCommandSupported("copy")&&document.queryCommandSupported("selectAll")?(e.on("focus",function(){return function(){return document.execCommand("selectAll",!1,null)}}(this)),t.show(),t.on("click",function(){return function(){return e.attr("contenteditable",!0),e.focus(),document.execCommand("copy",!1,null),e.blur(),e.attr("contenteditable",!1),n.show()}}(this))):void 0},e.prototype.template=r.compile('<div> <img class="podcast-cover" src="{{client.icon}}"> {{#if client.scheme}} <h1>{{t "finish_panel.handing_over_to" client=client.title}}...</h1> <p>{{t "finish_panel.something_went_wrong"}}</p> <p> {{#if client.post}} <form method="post" action="{{client.url}}" target="_blank"> <input type="hidden" name="url" value="{{client.url}}"> <input type="hidden" name="title" value="{{podcast.title}}"> <input type="hidden" name="subtitle" value="{{podcast.subtitle}}"> <input type="hidden" name="image" value="{{podcast.cover}}"> <button class="podlove-subscribe-button"> {{t "finish_panel.try_again"}} </button> </form> {{else}} <a href="{{client.url}}" class="podlove-subscribe-button" target="_blank"> {{t "finish_panel.try_again"}} </a> {{/if}} {{#if client.store}} {{t "finish_panel.or_install"}} <br> <a href="{{client.store}}" target="_blank"> <img src="{{scriptPath}}/images/stores/{{platform}}.png" class="store-button"> </a> {{/if}} {{#if client.install}} <a class="podlove-subscribe-popup-finish-register" href="{{client.install}}" target="_blank"> {{t "finish_panel.install" client=client.title}} </a> {{/if}} {{#if client.register}} <a class="podlove-subscribe-popup-finish-register" href="{{client.register}}" target="_blank"> {{t "finish_panel.register_an_account"}} {{client.title}} </a> {{/if}} </p> {{else}} <p> {{t "finish_panel.please_copy_url"}} </p> <a href="{{client.originalUrl}}" target="_blank" class="copy-url-link">{{client.originalUrl}}</a> <button class="copy-url-button podlove-subscribe-button">{{t "finish_panel.copy_button_text"}}</button> <div class="copy-url-field">{{client.originalUrl}}</div> <div class="copy-notification">{{t "finish_panel.copy_success"}}<div> {{/if}} </div>'),e}(o),e.exports=i},{"../../vendor/handlebars.min.js":15,"../../vendor/zepto-browserify.js":18,"./panel.coffee":9}],7:[function(t,e){var n,i,r;n=t("../../vendor/zepto-browserify.js").Zepto,r=t("../../vendor/underscore-min.js"),i=function(){function t(){}return t.listen=function(t,e,n){var i;return i=n.id,null==window.podloveSubscribeButtonStoredOptions&&(window.podloveSubscribeButtonStoredOptions={}),window.podloveSubscribeButtonStoredOptions[i]=r.clone(n),window.addEventListener("message",function(){return function(t){return t.data==="clicked_"+i?(n=window.podloveSubscribeButtonStoredOptions[i],e(n)):void 0}}(this),!1)},t}(),e.exports=i},{"../../vendor/underscore-min.js":17,"../../vendor/zepto-browserify.js":18}],8:[function(t,e){var n;n=function(){function t(){}return t.listen=function(t,e,n,i){return null==n&&(n={}),window.addEventListener("message",function(){return function(r){var o,s,a;try{s=JSON.parse(r.data)}catch(l){return}if(s.id===e.attr("id")&&s.listenTo===t)return o=s.height+(n.height||0),a=/%$/.test(s.width)?s.width:s.width+(n.width||0),e.height(o),e.width(a),null!=i?i(e):void 0}}(this),!1)},t}(),e.exports=n},{}],9:[function(t,e){var n;n=function(){function t(){}return t}(),e.exports=n},{}],10:[function(t,e){var n,i,r,o,s,a=function(t,e){function n(){this.constructor=t}for(var i in e)l.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},l={}.hasOwnProperty;n=t("../../vendor/zepto-browserify.js").Zepto,i=t("../../vendor/handlebars.min.js").Handlebars,s=t("./translations.coffee"),r=t("./panel.coffee"),o=function(t){function e(t,e){this.container=t,this.parent=e,this.podcast=this.parent.podcast,this.podcast.subtitle&&""!==this.podcast.subtitle&&(this.podcast.subtitle=new i.SafeString(this.podcast.subtitle)),this.render()}return a(e,t),e.prototype.context=function(){return{cover:this.podcast.cover,title:new i.SafeString(this.podcast.title),subtitle:this.podcast.subtitle,scriptPath:this.parent.options.scriptPath}},e.prototype.render=function(){return this.elem=n(this.template(this.context())),this.container.append(this.elem),this.elem.find("button").on("click",function(t){return function(){return t.parent.movePanels(1)}}(this))},e.prototype.template=i.compile('<div{{#if subtitle}} class="podcast-has-subtitles"{{/if}}> {{#if cover}} <img class="podcast-cover" src="{{cover}}" alt="Logo of {{title}}"> {{else}} <div class="podcast-cover-placeholder"></div> {{/if}} <div class="podlove-subscribe-popup-podcast-text"> <h1>{{title}}</h1> {{#if subtitle}} <p>{{subtitle}}</p> {{/if}} </div> <button class="podlove-subscribe-button">{{t "podcast_panel.choose_client"}}</button> </div>'),e}(r),e.exports=o},{"../../vendor/handlebars.min.js":15,"../../vendor/zepto-browserify.js":18,"./panel.coffee":9,"./translations.coffee":12}],11:[function(t,e){var n,i,r,o,s,a,l,c,u,p;n=t("../../vendor/zepto-browserify.js").Zepto,o=t("../../vendor/handlebars.min.js").Handlebars,p=t("./utils.coffee"),c=t("./translations.coffee"),s=t("./iframe_resizer.coffee"),u=t("./user_agent.coffee"),a=t("./podcast_panel.coffee"),i=t("./clients_panel.coffee"),r=t("./finish_panel.coffee"),l=function(){function t(t,e){this.podcast=t,this.options=e,this.I18n=new c(this.options.language),this.platform=(new u).detect(),this.render(),this.initPanels()}return t.prototype.context=function(){return{scriptPath:this.options.scriptPath}},t.prototype.render=function(){return this.elem=n(this.template(this.context())),this.body=n("body"),this.html=n("html"),this.body.append(this.elem),this.disableBackgroundScrolling(),window.setTimeout(function(t){return function(){return t.elem.removeClass("podlove-subscribe-popup-animate")}}(this),500),this.elem.find("#podlove-subscribe-popup-close-button").on("click",function(t){return function(){return t.closePopup()}}(this)),this.elem.on("click",function(t){return function(){return t.closePopup()}}(this)),this.elem.find("#podlove-subscribe-popup-modal").on("click",function(){return function(t){return t.stopPropagation()}}(this)),this.elem.find("#podlove-subscribe-popup-help-button").on("click",function(t){return function(e){return t.elem.find("#podlove-subscribe-button-help-panel").toggleClass("visible"),n(e.currentTarget).toggleClass("active")}}(this)),this.elem.find("#podlove-help-close-button").on("click",function(t){return function(e){return t.elem.find("#podlove-subscribe-button-help-panel").toggleClass("visible"),n(e.currentTarget).toggleClass("active")}}(this)),this.elem.find(".podlove-subscribe-back-button").on("click",function(t){return function(){return t.container=t.elem.find("#podlove-subscribe-popup-modal-inner"),t.container.hasClass("swiped-left-2")?t.movePanels(1):t.container.hasClass("swiped-left-1")?t.movePanels(0):void 0}}(this))},t.prototype.disableBackgroundScrolling=function(){return this.oldHtmlOverflow=this.html.css("overflow"),this.oldBodyOverflow=this.body.css("overflow"),this.html.css("overflow","hidden"),this.body.css("overflow","hidden")
},t.prototype.enableBackgroundScrolling=function(){return this.html.css("overflow",this.oldHtmlOverflow),this.body.css("overflow",this.oldBodyOverflow)},t.prototype.closePopup=function(){return this.enableBackgroundScrolling(),this.elem.addClass("podlove-subscribe-popup-animate"),window.setTimeout(function(t){return function(){return t.elem.removeClass("podlove-subscribe-popup-animate"),t.elem.remove()}}(this),500)},t.prototype.template=o.compile('<div id="podlove-subscribe-popup" class="podlove-subscribe podlove-subscribe-popup-animate"> <div id="podlove-subscribe-popup-modal"> <div id="podlove-subscribe-popup-modal-inner" class="show-left"> <div class="top-bar"> <span id="podlove-subscribe-popup-help-button"></span> <span class="podlove-subscribe-back-button"></span> <span class="panel-title">{{t "panels.title"}}</span> <span id="podlove-subscribe-popup-close-button" class="podlove-subscribe-install-button"></span> </div> <div id="podlove-subscribe-panel-container"> <div id="podlove-subscribe-panel-podcast"></div> <div id="podlove-subscribe-panel-clients"></div> <div id="podlove-subscribe-panel-finish"></div> </div> </div> <a href="https://podlove.org" title="Podlove" target="_blank" class="podlove-logo"><img src="{{scriptPath}}/images/podlove.svg"></a> <div id="podlove-subscribe-button-help-panel"> <span id="podlove-help-close-button" class="podlove-help-close-button"></span> <div class="podlove-subscribe-button-help-panel-content"> <h2>{{t "help_panel.title"}}</h2> <p>{{t "help_panel.paragraph1"}}</p> <p>{{t "help_panel.paragraph2"}}</p> <p>{{t "help_panel.paragraph3"}}</p> </div> </div> </div> </div>'),t.prototype.initPanels=function(){var t;return t="#podlove-subscribe-panel",this.podcastPanel=new a(this.elem.find(t+"-podcast"),this),this.clientsPanel=new i(this.elem.find(t+"-clients"),this),this.finishPanel=new r(this.elem.find(t+"-finish"),this)},t.prototype.movePanels=function(t){return this.container=this.elem.find("#podlove-subscribe-popup-modal-inner"),this.container.removeClass("swiped-left-0"),this.container.removeClass("swiped-left-1"),this.container.removeClass("swiped-left-2"),this.container.addClass("swiped-left-"+t)},t}(),e.exports=l},{"../../vendor/handlebars.min.js":15,"../../vendor/zepto-browserify.js":18,"./clients_panel.coffee":4,"./finish_panel.coffee":6,"./iframe_resizer.coffee":8,"./podcast_panel.coffee":10,"./translations.coffee":12,"./user_agent.coffee":13,"./utils.coffee":14}],12:[function(t,e){var n,i,r,o=function(t,e){return function(){return t.apply(e,arguments)}};r=t("../../vendor/underscore-min.js"),n=t("../../vendor/handlebars.min.js").Handlebars,i=function(){function t(t){this.interpolate=o(this.interpolate,this),this.locale=t.split("-")[0],n.registerHelper("t",function(t){return function(e,i){return new n.SafeString(t.t(e,i.hash))}}(this))}return t.prototype.t=function(t,e){return null==e&&(e={}),this.translate(t,e)},t.prototype.translate=function(t,e){var n,i,o,s,a;return null==e&&(e={}),i=t.split("."),n=this._translations[this.locale],s=null,o=null,r.each(i,function(t){return o=t,s=s?s[t]:n[t]}),null==s&&(a=[],r.forEach(o.split("_"),function(t){return a.push(t.charAt(0).toUpperCase()+t.slice(1))}),s=a.join(" ")),this.interpolate(s,e)},t.prototype.interpolate=function(t,e){return t=t.replace(/%{([^{}]*)}/g,function(t,n){var i;return i=e[n],"string"==typeof i||"number"==typeof i?i:t})},t.defaultLanguage="en",t.prototype.supportsLanguage=function(){var t;return t=Object.keys(this._translations),-1!==t.indexOf(this.locale)?!0:!1},t.prototype._translations={de:{button:"Abonnieren",panels:{title:"Abonnieren"},podcast_panel:{choose_client:"Weiter"},help_panel:{title:"Abonnieren?",paragraph1:"Ein Abonnement erlaubt einer Podcast-App neue Folgen automatisch herunterzuladen oder das Podcast-Archiv mit alten Episoden zu durchsuchen.",paragraph2:"Der Podlove Subscribe Button hilft dir dabei. Wähle deine favorisierte Podcast-App aus der Liste der verfügbaren Apps oder wähle einen Podcast-Cloud-Service den du benutzt.",paragraph3:"Beim Start sollte die Podcast-App den Podcast zur Liste der Abonnements hinzufügen. Benutze den Download-Link, um die App zu installieren, falls sie es noch nicht ist."},clients_panel:{app:"App",cloud:"Cloud",other_client:"Andere App"},finish_panel:{handing_over_to:"Übergebe an<br> %{client}",something_went_wrong:"Funktioniert etwas nicht wie erwartet?",try_again:"Nochmal versuchen",install:"%{client} installieren",register_an_account:"Einen Account registrieren bei ",please_copy_url:"Bitte die URL kopieren und in deine Podcast- oder RSS-App einfügen.",copy_button_text:"URL kopieren",copy_success:"URL in die Zwischenablage kopiert.",or_install:"oder App installieren"}},en:{button:"Subscribe",panels:{title:"Subscribe"},podcast_panel:{choose_client:"Continue"},help_panel:{title:"Subscribe?",paragraph1:"You are about to subscribe to a podcast. This will allow your podcast app to automatically download new episodes or access the archive of previously released episodes.",paragraph2:"The Podlove Subscribe Button helps you to do this. Select your favorite podcast app from a list of potential apps on your device or pick a podcast cloud service on the web that you use.",paragraph3:"Upon launch, the podcast client should offer you to add the podcast to your list of subscriptions. Use the download link to get the app if not yet available."},clients_panel:{app:"App",cloud:"Cloud",other_client:"Other App"},finish_panel:{handing_over_to:"Handing over to %{client}",something_went_wrong:"Did something go wrong?",try_again:"Try again",install:"Install %{client}",register_an_account:"Register an account with ",please_copy_url:"Please copy the URL below and add it to your podcast or RSS app.",copy_button_text:"Copy URL",copy_success:"URL copied to clipboard",or_install:"or install app"}},eo:{button:"Aboni",panels:{title:"Aboni"},podcast_panel:{choose_client:"Elekti aplikaĵon"},help_panel:{title:"Ĉu aboni?",paragraph1:"Per abono de podkasto vi permesos al via podkasta aplikaĵo aŭtomate elŝuti novajn aŭ arkivajn epizodojn.",paragraph2:"La Podlove Abonbutono helpas vin fari tion. Elektu vian plej ŝatatan podkastan aplikaĵon el listo de eblaj aplikaĵoj sur via aparato aŭ elektu vian uzatan nuban servon en la reto.",paragraph3:"Lanĉate la podkasta aplikaĵo ebligu al vi aldoni la podkaston al via abonlisto. Uzu la elŝut-ligilon, se la aplikaĵo ankoraŭ ne estas instalita."},clients_panel:{app:"Aplikaĵo",cloud:"Nubo",other_client:"Alia aplikaĵo"},finish_panel:{handing_over_to:"Transdonanta al %{client}",something_went_wrong:"Ĉu io misfunkciis?",try_again:"Reprovi",install:"Viziti la retejon de %{client}",register_an_account:"Registriĝi ĉe ",please_copy_url:"Bonvolu kopii la suban URLn kaj aldoni ĝin al via podkasta aplikaĵo aŭ RSS-legilo.",copy_button_text:"Copy URL",copy_success:"URL copied to clipboard",or_install:"aŭ instali la aplikaĵon"}},fi:{button:"Tilaa",panels:{title:"Tilaa"},podcast_panel:{choose_client:"Valitse ohjelma"},help_panel:{title:"Haluatko tilata?",paragraph1:"You are about to subscribe to a podcast. This will allow your podcast app to automatically download new episodes or access the archive of previously released episodes.",paragraph2:"The Podlove Subscribe Button helps you to do this. Select your favorite podcast app from a list of potential apps on your device or pick a podcast cloud service on the web that you use.",paragraph3:"Upon launch, the podcast client should offer you to add the podcast to your list of subscriptions. Use the download link to get the app if not yet available."},clients_panel:{app:"App",cloud:"Cloud",other_client:"Eri ohjelma"},finish_panel:{handing_over_to:"Annetaan %{client}:lle",something_went_wrong:"Menikö jotain väärin?",try_again:"Kokeile uudestaan",install:"Mene %{client}:n sivustolle",register_an_account:"Rekisteröidy",please_copy_url:"Ole hyvä ja kopioi alla olevan linkin ja syötä se sinuun podcast tai RSS ohjelmaan.",copy_button_text:"Copy URL",copy_success:"URL copied to clipboard",or_install:"tai installoi ohjelma"}},fr:{button:"Souscrire",panels:{title:"Souscrire"},podcast_panel:{choose_client:"Choisir App"},help_panel:{title:"Souscrire?",paragraph1:"Vous êtes sur le point de souscrire à un podcast. Ceci permettra à votre application podcast de télécharger automatiquement de nouveaux épisodes ou d’accéder aux archives d’épisodes préalablement diffusés.",paragraph2:"Le bouton souscrire au Podlove vous aide à faire cela. Sélectionnez votre application podcast favorite à partir d’une liste d’applications potentielles sur votre appareil ou choisissez un service de « podcast cloud » sur internet que vous utilisez",paragraph3:"Durant le lancement, le client podcast devrait vous offrir la possibilité d’ajouter le podcast à votre liste de souscriptions. Utilisez le lien de téléchargement pour obtenir l’application si celle-ci n’est pas encore présente."},clients_panel:{app:"App",cloud:"Cloud",other_client:"Autre App"},finish_panel:{handing_over_to:"Transfert vers %{client}",something_went_wrong:"Y a-t-il eut des problèmes ?",try_again:"Essayer à nouveau",install:"Visite %{client} du site internet",register_an_account:"Enregistrer un compte avec",please_copy_url:"Veuillez copier l’URL ci-dessous et ajoutez le à votre podcast ou application RSS.",copy_button_text:"Copy URL",copy_success:"URL copied to clipboard",or_install:"ou installer l‘application"}},nl:{button:"Abonneren",panels:{title:"Abonneren"},podcast_panel:{choose_client:"App kiezen"},help_panel:{title:"Abonneren?",paragraph1:"U staat op het punt een podcast te abonneren. Hierdoor kan uw podcast app nieuwe afleveringen automatisch downloaden of toegang tot het archief van eerder uitgebrachte afleveringen geven.",paragraph2:"De Podlove Abonneren Button helpt u om dit te doen. Kies uw favoriete podcast app van een lijst van potentiële apps op uw apparaat of kies een podcast cloud service op het web die u gebruikt.",paragraph3:"Bij de lancering moet de podcast client u aanbieden om de podcast toe te voegen aan uw lijst met abonnementen. Gebruik de download link naar de app, indien nog niet beschikbaar."},clients_panel:{app:"App",cloud:"Cloud",other_client:"Ander app"},finish_panel:{handing_over_to:"Overhandigen aan %{client}",something_went_wrong:"Is er iets mis gegaan?",try_again:"Probeer opnieuw",install:"Bezoek %{client} website",register_an_account:"Registreren op ",please_copy_url:"Kopieer de URL hieronder en voeg deze toe aan uw podcast of RSS-app.",copy_button_text:"Copy URL",copy_success:"URL copied to clipboard",or_install:"Of installeer de app"}},ja:{button:"登録する",panels:{title:"登録する"},podcast_panel:{choose_client:"クライアントを選ぶ"},help_panel:{title:"登録がよろしいですか？",paragraph1:"今新しいポットキャストを登録しています。それでポットキャストクライアントアプリケーションで新しいエピソードを自動でダウンロードできる、またはポットキャストアーカイブで過去のエピソードを探せます。",paragraph2:"ポットラブ登録ボタンは登録を支援します。気に入り、使っているポットキャストクライアントがポットキャストクラウドサービスを使用可能なもののリストを選んで下さい。",paragraph3:"スタートアップでポットキャストクライアントがポットキャストを登録はずです。アプリがまだインストールしなかったら、ダウンロードリンクをインストールために使って下さい。"},clients_panel:{app:"アプリ",cloud:"クラウド",other_client:"他のクライアント"},finish_panel:{handing_over_to:"%{client}に渡す",something_went_wrong:"何が失敗しましたか？",try_again:"もう一度試してください",install:"Visit %{client} website",register_an_account:"%{client}にアカウントを登録する",please_copy_url:"URLをコピーして、ポットキャストがRSSクライアントに貼り付けて下さい。",copy_button_text:"Copy URL",copy_success:"URL copied to clipboard",or_install:"or install app"}},zh:{button:"订阅",panels:{title:"订阅"},podcast_panel:{choose_client:"Choose App"},help_panel:{title:"订阅？",paragraph1:"你在订阅一个播客，它会自动下载新的广播节目或进入以前的下载目录。",paragraph2:"这个订阅键将协助你完成。从你的设备或者播客云服务上选择你喜欢的应用。",paragraph3:"启动时，播客客户端会提醒你将播客加入你的订阅列表中。如还未安装，也可通过链接下载安装此应用。"},clients_panel:{app:"应用",cloud:"云",other_client:"其他应用"},finish_panel:{handing_over_to:"提交给%{client}",something_went_wrong:"有错误？",try_again:"重试",install:"访问%{client}网站",register_an_account:"注册账号 ",please_copy_url:"请复制下面的链接，添加到你的播客或RSS应用中。",copy_button_text:"Copy URL",copy_success:"URL copied to clipboard",or_install:"或安装应用"}}},t}(),e.exports=i},{"../../vendor/handlebars.min.js":15,"../../vendor/underscore-min.js":17}],13:[function(t,e){var n,i,r={}.hasOwnProperty;i=function(){function t(){}return t.prototype.detect=function(){var t,e,i;i=window.navigator&&navigator.userAgent||"";for(e in n)if(r.call(n,e)&&(t=n[e],t.test(i)))return e},t}(),n={windows7:/Windows NT 6.1/,windows8:/Windows NT 6.2/,windows81:/Windows NT 6.3/,windows10:/Windows NT 10.0/,windowsphone:/trident/i,android:/android/i,ios:/(ipad|iphone|ipod)/i,linux:/linux/i,osx:/macintosh/i},e.exports=i},{}],14:[function(t,e){var n;n=function(){function t(){}return t.locationToOptions=function(){var t,e,n,i,r,o;for(i={},o=window.location.search.replace(/^\?/,""),r=o.split("&"),e=0,n=r.length;n>e;e++)o=r[e],t=o.split("="),i[t[0]]=decodeURIComponent(t[1]);return i},t.fixIconPath=function(t,e){return t.icon?-1===t.icon.indexOf(e)?t.icon=e+"/images/"+t.icon:void 0:void 0},t}(),e.exports=n},{}],15:[function(){this.Handlebars=function(){var t=function(){"use strict";function t(t){this.string=t}var e;return t.prototype.toString=function(){return""+this.string},e=t}(),e=function(t){"use strict";function e(t){return l[t]||"&amp;"}function n(t){for(var e=1;e<arguments.length;e++)for(var n in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],n)&&(t[n]=arguments[e][n]);return t}function i(t){return t instanceof a?t.toString():t||0===t?(t=""+t,u.test(t)?t.replace(c,e):t):""}function r(t){return t||0===t?f(t)&&0===t.length?!0:!1:!0}function o(t,e){return(t?t+".":"")+e}var s={},a=t,l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/[&<>"'`]/g,u=/[&<>"'`]/;s.extend=n;var p=Object.prototype.toString;s.toString=p;var h=function(t){return"function"==typeof t};h(/x/)&&(h=function(t){return"function"==typeof t&&"[object Function]"===p.call(t)});var h;s.isFunction=h;var f=Array.isArray||function(t){return t&&"object"==typeof t?"[object Array]"===p.call(t):!1};return s.isArray=f,s.escapeExpression=i,s.isEmpty=r,s.appendContextPath=o,s}(t),n=function(){"use strict";function t(t,e){var i;e&&e.firstLine&&(i=e.firstLine,t+=" - "+i+":"+e.firstColumn);for(var r=Error.prototype.constructor.call(this,t),o=0;o<n.length;o++)this[n[o]]=r[n[o]];i&&(this.lineNumber=i,this.column=e.firstColumn)}var e,n=["description","fileName","lineNumber","message","name","number","stack"];return t.prototype=new Error,e=t}(),i=function(t,e){"use strict";function n(t,e){this.helpers=t||{},this.partials=e||{},i(this)}function i(t){t.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new a("Missing helper: '"+arguments[arguments.length-1].name+"'")}),t.registerHelper("blockHelperMissing",function(e,n){var i=n.inverse||function(){},r=n.fn;if(h(e)&&(e=e.call(this)),e===!0)return r(this);if(e===!1||null==e)return i(this);if(p(e))return e.length>0?(n.ids&&(n.ids=[n.name]),t.helpers.each(e,n)):i(this);if(n.data&&n.ids){var o=m(n.data);o.contextPath=s.appendContextPath(n.data.contextPath,n.name),n={data:o}}return r(e,n)}),t.registerHelper("each",function(t,e){e||(e=t,t=this);var n,i,r=e.fn,o=e.inverse,a=0,l="";if(e.data&&e.ids&&(i=s.appendContextPath(e.data.contextPath,e.ids[0])+"."),h(t)&&(t=t.call(this)),e.data&&(n=m(e.data)),t&&"object"==typeof t)if(p(t))for(var c=t.length;c>a;a++)n&&(n.index=a,n.first=0===a,n.last=a===t.length-1,i&&(n.contextPath=i+a)),l+=r(t[a],{data:n});else for(var u in t)t.hasOwnProperty(u)&&(n&&(n.key=u,n.index=a,n.first=0===a,i&&(n.contextPath=i+u)),l+=r(t[u],{data:n}),a++);return 0===a&&(l=o(this)),l}),t.registerHelper("if",function(t,e){return h(t)&&(t=t.call(this)),!e.hash.includeZero&&!t||s.isEmpty(t)?e.inverse(this):e.fn(this)}),t.registerHelper("unless",function(e,n){return t.helpers["if"].call(this,e,{fn:n.inverse,inverse:n.fn,hash:n.hash})}),t.registerHelper("with",function(t,e){h(t)&&(t=t.call(this));var n=e.fn;if(!s.isEmpty(t)){if(e.data&&e.ids){var i=m(e.data);i.contextPath=s.appendContextPath(e.data.contextPath,e.ids[0]),e={data:i}}return n(t,e)}}),t.registerHelper("log",function(e,n){var i=n.data&&null!=n.data.level?parseInt(n.data.level,10):1;t.log(i,e)}),t.registerHelper("lookup",function(t,e){return t&&t[e]})}function r(t,e){g.log(t,e)}var o={},s=t,a=e,l="2.0.0-alpha.4";o.VERSION=l;var c=5;o.COMPILER_REVISION=c;var u={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:">= 2.0.0"};o.REVISION_CHANGES=u;var p=s.isArray,h=s.isFunction,f=s.toString,d="[object Object]";o.HandlebarsEnvironment=n,n.prototype={constructor:n,logger:g,log:r,registerHelper:function(t,e,n){if(f.call(t)===d){if(n||e)throw new a("Arg not supported with multiple helpers");s.extend(this.helpers,t)}else n&&(e.not=n),this.helpers[t]=e},unregisterHelper:function(t){delete this.helpers[t]},registerPartial:function(t,e){f.call(t)===d?s.extend(this.partials,t):this.partials[t]=e},unregisterPartial:function(t){delete this.partials[t]}};var g={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(t,e){if(g.level<=t){var n=g.methodMap[t];"undefined"!=typeof console&&console[n]&&console[n].call(console,e)}}};o.logger=g,o.log=r;var m=function(t){var e=s.extend({},t);return e._parent=t,e};return o.createFrame=m,o}(e,n),r=function(t,e,n){"use strict";function i(t){var e=t&&t[0]||1,n=f;if(e!==n){if(n>e){var i=d[n],r=d[e];throw new h("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+i+") or downgrade your runtime to an older version ("+r+").")}throw new h("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+t[1]+").")}}function r(t,e){if(!e)throw new h("No environment passed to template");e.VM.checkRevision(t.compiler);var n=function(t,n,i,r,o,s,a){r&&(i=p.extend({},i,r));var l=e.VM.invokePartial.call(this,t,n,i,o,s,a);if(null!=l)return l;if(e.compile){var c={helpers:o,partials:s,data:a};return s[n]=e.compile(t,{data:void 0!==a},e),s[n](i,c)}throw new h("The partial "+n+" could not be compiled when running in runtime-only mode")},i={escapeExpression:p.escapeExpression,invokePartial:n,fn:function(e){return t[e]},programs:[],program:function(t,e){var n=this.programs[t],i=this.fn(t);return e?n=s(this,t,i,e):n||(n=this.programs[t]=s(this,t,i)),n},programWithDepth:e.VM.programWithDepth,data:function(t,e){for(;t&&e--;)t=t._parent;return t},merge:function(t,e){var n=t||e;return t&&e&&t!==e&&(n=p.extend({},e,t)),n},noop:e.VM.noop,compilerInfo:t.compiler},r=function(e,n){n=n||{};var o=n.data;return r._setup(n),!n.partial&&t.useData&&(o=c(e,o)),t.main.call(i,e,i.helpers,i.partials,o)};return r._setup=function(n){n.partial?(i.helpers=n.helpers,i.partials=n.partials):(i.helpers=i.merge(n.helpers,e.helpers),t.usePartial&&(i.partials=i.merge(n.partials,e.partials)))},r._child=function(t){return i.programWithDepth(t)},r}function o(t,e){var n=Array.prototype.slice.call(arguments,2),i=this,r=i.fn(t),o=function(t,o){return o=o||{},r.apply(i,[t,i.helpers,i.partials,o.data||e].concat(n))};return o.program=t,o.depth=n.length,o}function s(t,e,n,i){var r=function(e,r){return r=r||{},n.call(t,e,t.helpers,t.partials,r.data||i)};return r.program=e,r.depth=0,r}function a(t,e,n,i,r,o){var s={partial:!0,helpers:i,partials:r,data:o};if(void 0===t)throw new h("The partial "+e+" could not be found");return t instanceof Function?t(n,s):void 0}function l(){return""}function c(t,e){return e&&"root"in e||(e=e?g(e):{},e.root=t),e}var u={},p=t,h=e,f=n.COMPILER_REVISION,d=n.REVISION_CHANGES,g=n.createFrame;return u.checkRevision=i,u.template=r,u.programWithDepth=o,u.program=s,u.invokePartial=a,u.noop=l,u}(e,n,i),o=function(t,e,n,i,r){"use strict";var o,s=t,a=e,l=n,c=i,u=r,p=function(){var t=new s.HandlebarsEnvironment;return c.extend(t,s),t.SafeString=a,t.Exception=l,t.Utils=c,t.VM=u,t.template=function(e){return u.template(e,t)},t},h=p();return h.create=p,o=h}(i,t,n,e,r),s=function(t){"use strict";function e(t){t=t||{},this.firstLine=t.first_line,this.firstColumn=t.first_column,this.lastColumn=t.last_column,this.lastLine=t.last_line}var n,i=t,r={ProgramNode:function(t,n,i,o){var s,a;3===arguments.length?(o=i,i=null):2===arguments.length&&(o=n,n=null),e.call(this,o),this.type="program",this.statements=t,this.strip={},i?(a=i[0],a?(s={first_line:a.firstLine,last_line:a.lastLine,last_column:a.lastColumn,first_column:a.firstColumn},this.inverse=new r.ProgramNode(i,n,s)):this.inverse=new r.ProgramNode(i,n),this.strip.right=n.left):n&&(this.strip.left=n.right)},MustacheNode:function(t,n,i,o,s){if(e.call(this,s),this.type="mustache",this.strip=o,null!=i&&i.charAt){var a=i.charAt(3)||i.charAt(2);this.escaped="{"!==a&&"&"!==a}else this.escaped=!!i;this.sexpr=t instanceof r.SexprNode?t:new r.SexprNode(t,n),this.sexpr.isRoot=!0,this.id=this.sexpr.id,this.params=this.sexpr.params,this.hash=this.sexpr.hash,this.eligibleHelper=this.sexpr.eligibleHelper,this.isHelper=this.sexpr.isHelper},SexprNode:function(t,n,i){e.call(this,i),this.type="sexpr",this.hash=n;var r=this.id=t[0],o=this.params=t.slice(1);this.isHelper=!(!o.length&&!n),this.eligibleHelper=this.isHelper||r.isSimple},PartialNode:function(t,n,i,r,o){e.call(this,o),this.type="partial",this.partialName=t,this.context=n,this.hash=i,this.strip=r},BlockNode:function(t,n,r,o,s){if(e.call(this,s),t.sexpr.id.original!==o.path.original)throw new i(t.sexpr.id.original+" doesn't match "+o.path.original,this);this.type="block",this.mustache=t,this.program=n,this.inverse=r,this.strip={left:t.strip.left,right:o.strip.right},(n||r).strip.left=t.strip.right,(r||n).strip.right=o.strip.left,r&&!n&&(this.isInverse=!0)},RawBlockNode:function(t,n,o,s){if(e.call(this,s),t.sexpr.id.original!==o)throw new i(t.sexpr.id.original+" doesn't match "+o,this);n=new r.ContentNode(n,s),this.type="block",this.mustache=t,this.program=new r.ProgramNode([n],s)},ContentNode:function(t,n){e.call(this,n),this.type="content",this.string=t},HashNode:function(t,n){e.call(this,n),this.type="hash",this.pairs=t},IdNode:function(t,n){e.call(this,n),this.type="ID";for(var r="",o=[],s=0,a="",l=0,c=t.length;c>l;l++){var u=t[l].part;if(r+=(t[l].separator||"")+u,".."===u||"."===u||"this"===u){if(o.length>0)throw new i("Invalid path: "+r,this);".."===u?(s++,a+="../"):this.isScoped=!0}else o.push(u)}this.original=r,this.parts=o,this.string=o.join("."),this.depth=s,this.idName=a+this.string,this.isSimple=1===t.length&&!this.isScoped&&0===s,this.stringModeValue=this.string},PartialNameNode:function(t,n){e.call(this,n),this.type="PARTIAL_NAME",this.name=t.original},DataNode:function(t,n){e.call(this,n),this.type="DATA",this.id=t,this.stringModeValue=t.stringModeValue,this.idName="@"+t.stringModeValue},StringNode:function(t,n){e.call(this,n),this.type="STRING",this.original=this.string=this.stringModeValue=t},NumberNode:function(t,n){e.call(this,n),this.type="NUMBER",this.original=this.number=t,this.stringModeValue=Number(t)},BooleanNode:function(t,n){e.call(this,n),this.type="BOOLEAN",this.bool=t,this.stringModeValue="true"===t},CommentNode:function(t,n){e.call(this,n),this.type="comment",this.comment=t}};return n=r}(n),a=function(){"use strict";var t,e=function(){function t(t,e){return{left:"~"===t.charAt(2),right:"~"===e.charAt(0)||"~"===e.charAt(1)}}function e(){this.yy={}}var n={trace:function(){},yy:{},symbols_:{error:2,root:3,statements:4,EOF:5,program:6,simpleInverse:7,statement:8,openRawBlock:9,CONTENT:10,END_RAW_BLOCK:11,openInverse:12,closeBlock:13,openBlock:14,mustache:15,partial:16,COMMENT:17,OPEN_RAW_BLOCK:18,sexpr:19,CLOSE_RAW_BLOCK:20,OPEN_BLOCK:21,CLOSE:22,OPEN_INVERSE:23,OPEN_ENDBLOCK:24,path:25,OPEN:26,OPEN_UNESCAPED:27,CLOSE_UNESCAPED:28,OPEN_PARTIAL:29,partialName:30,param:31,partial_option0:32,partial_option1:33,sexpr_repetition0:34,sexpr_option0:35,dataName:36,STRING:37,NUMBER:38,BOOLEAN:39,OPEN_SEXPR:40,CLOSE_SEXPR:41,hash:42,hash_repetition_plus0:43,hashSegment:44,ID:45,EQUALS:46,DATA:47,pathSegments:48,SEP:49,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",10:"CONTENT",11:"END_RAW_BLOCK",17:"COMMENT",18:"OPEN_RAW_BLOCK",20:"CLOSE_RAW_BLOCK",21:"OPEN_BLOCK",22:"CLOSE",23:"OPEN_INVERSE",24:"OPEN_ENDBLOCK",26:"OPEN",27:"OPEN_UNESCAPED",28:"CLOSE_UNESCAPED",29:"OPEN_PARTIAL",37:"STRING",38:"NUMBER",39:"BOOLEAN",40:"OPEN_SEXPR",41:"CLOSE_SEXPR",45:"ID",46:"EQUALS",47:"DATA",49:"SEP"},productions_:[0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[9,3],[14,3],[12,3],[13,3],[15,3],[15,3],[16,5],[16,4],[7,2],[19,3],[19,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[42,1],[44,3],[30,1],[30,1],[30,1],[36,2],[25,1],[48,3],[48,1],[32,0],[32,1],[33,0],[33,1],[34,0],[34,2],[35,0],[35,1],[43,1],[43,2]],performAction:function(e,n,i,r,o,s){var a=s.length-1;switch(o){case 1:return new r.ProgramNode(s[a-1],this._$);case 2:return new r.ProgramNode([],this._$);case 3:this.$=new r.ProgramNode([],s[a-1],s[a],this._$);break;case 4:this.$=new r.ProgramNode(s[a-2],s[a-1],s[a],this._$);break;case 5:this.$=new r.ProgramNode(s[a-1],s[a],[],this._$);break;case 6:this.$=new r.ProgramNode(s[a],this._$);break;case 7:this.$=new r.ProgramNode([],this._$);break;case 8:this.$=new r.ProgramNode([],this._$);break;case 9:this.$=[s[a]];break;case 10:s[a-1].push(s[a]),this.$=s[a-1];break;case 11:this.$=new r.RawBlockNode(s[a-2],s[a-1],s[a],this._$);break;case 12:this.$=new r.BlockNode(s[a-2],s[a-1].inverse,s[a-1],s[a],this._$);break;case 13:this.$=new r.BlockNode(s[a-2],s[a-1],s[a-1].inverse,s[a],this._$);break;case 14:this.$=s[a];break;case 15:this.$=s[a];break;case 16:this.$=new r.ContentNode(s[a],this._$);break;case 17:this.$=new r.CommentNode(s[a],this._$);break;case 18:this.$=new r.MustacheNode(s[a-1],null,"","",this._$);break;case 19:this.$=new r.MustacheNode(s[a-1],null,s[a-2],t(s[a-2],s[a]),this._$);break;case 20:this.$=new r.MustacheNode(s[a-1],null,s[a-2],t(s[a-2],s[a]),this._$);break;case 21:this.$={path:s[a-1],strip:t(s[a-2],s[a])};break;case 22:this.$=new r.MustacheNode(s[a-1],null,s[a-2],t(s[a-2],s[a]),this._$);break;case 23:this.$=new r.MustacheNode(s[a-1],null,s[a-2],t(s[a-2],s[a]),this._$);break;case 24:this.$=new r.PartialNode(s[a-3],s[a-2],s[a-1],t(s[a-4],s[a]),this._$);break;case 25:this.$=new r.PartialNode(s[a-2],void 0,s[a-1],t(s[a-3],s[a]),this._$);break;case 26:this.$=t(s[a-1],s[a]);break;case 27:this.$=new r.SexprNode([s[a-2]].concat(s[a-1]),s[a],this._$);break;case 28:this.$=new r.SexprNode([s[a]],null,this._$);break;case 29:this.$=s[a];break;case 30:this.$=new r.StringNode(s[a],this._$);break;case 31:this.$=new r.NumberNode(s[a],this._$);break;case 32:this.$=new r.BooleanNode(s[a],this._$);break;case 33:this.$=s[a];break;case 34:s[a-1].isHelper=!0,this.$=s[a-1];break;case 35:this.$=new r.HashNode(s[a],this._$);break;case 36:this.$=[s[a-2],s[a]];break;case 37:this.$=new r.PartialNameNode(s[a],this._$);break;case 38:this.$=new r.PartialNameNode(new r.StringNode(s[a],this._$),this._$);break;case 39:this.$=new r.PartialNameNode(new r.NumberNode(s[a],this._$));break;case 40:this.$=new r.DataNode(s[a],this._$);break;case 41:this.$=new r.IdNode(s[a],this._$);break;case 42:s[a-2].push({part:s[a],separator:s[a-1]}),this.$=s[a-2];break;case 43:this.$=[{part:s[a]}];break;case 48:this.$=[];break;case 49:s[a-1].push(s[a]);break;case 52:this.$=[s[a]];break;case 53:s[a-1].push(s[a])}},table:[{3:1,4:2,5:[1,3],8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],26:[1,15],27:[1,16],29:[1,17]},{1:[3]},{5:[1,18],8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],26:[1,15],27:[1,16],29:[1,17]},{1:[2,2]},{5:[2,9],10:[2,9],17:[2,9],18:[2,9],21:[2,9],23:[2,9],24:[2,9],26:[2,9],27:[2,9],29:[2,9]},{10:[1,20]},{4:23,6:21,7:22,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,24],24:[2,8],26:[1,15],27:[1,16],29:[1,17]},{4:23,6:25,7:22,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,24],24:[2,8],26:[1,15],27:[1,16],29:[1,17]},{5:[2,14],10:[2,14],17:[2,14],18:[2,14],21:[2,14],23:[2,14],24:[2,14],26:[2,14],27:[2,14],29:[2,14]},{5:[2,15],10:[2,15],17:[2,15],18:[2,15],21:[2,15],23:[2,15],24:[2,15],26:[2,15],27:[2,15],29:[2,15]},{5:[2,16],10:[2,16],17:[2,16],18:[2,16],21:[2,16],23:[2,16],24:[2,16],26:[2,16],27:[2,16],29:[2,16]},{5:[2,17],10:[2,17],17:[2,17],18:[2,17],21:[2,17],23:[2,17],24:[2,17],26:[2,17],27:[2,17],29:[2,17]},{19:26,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:32,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:33,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:34,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:35,25:27,36:28,45:[1,31],47:[1,30],48:29},{25:37,30:36,37:[1,38],38:[1,39],45:[1,31],48:29},{1:[2,1]},{5:[2,10],10:[2,10],17:[2,10],18:[2,10],21:[2,10],23:[2,10],24:[2,10],26:[2,10],27:[2,10],29:[2,10]},{11:[1,40]},{13:41,24:[1,42]},{4:43,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,7],26:[1,15],27:[1,16],29:[1,17]},{7:44,8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,24],24:[2,6],26:[1,15],27:[1,16],29:[1,17]},{19:32,22:[1,45],25:27,36:28,45:[1,31],47:[1,30],48:29},{13:46,24:[1,42]},{20:[1,47]},{20:[2,48],22:[2,48],28:[2,48],34:48,37:[2,48],38:[2,48],39:[2,48],40:[2,48],41:[2,48],45:[2,48],47:[2,48]},{20:[2,28],22:[2,28],28:[2,28],41:[2,28]},{20:[2,41],22:[2,41],28:[2,41],37:[2,41],38:[2,41],39:[2,41],40:[2,41],41:[2,41],45:[2,41],47:[2,41],49:[1,49]},{25:50,45:[1,31],48:29},{20:[2,43],22:[2,43],28:[2,43],37:[2,43],38:[2,43],39:[2,43],40:[2,43],41:[2,43],45:[2,43],47:[2,43],49:[2,43]},{22:[1,51]},{22:[1,52]},{22:[1,53]},{28:[1,54]},{22:[2,46],25:57,31:55,33:56,36:61,37:[1,58],38:[1,59],39:[1,60],40:[1,62],42:63,43:64,44:66,45:[1,65],47:[1,30],48:29},{22:[2,37],37:[2,37],38:[2,37],39:[2,37],40:[2,37],45:[2,37],47:[2,37]},{22:[2,38],37:[2,38],38:[2,38],39:[2,38],40:[2,38],45:[2,38],47:[2,38]},{22:[2,39],37:[2,39],38:[2,39],39:[2,39],40:[2,39],45:[2,39],47:[2,39]},{5:[2,11],10:[2,11],17:[2,11],18:[2,11],21:[2,11],23:[2,11],24:[2,11],26:[2,11],27:[2,11],29:[2,11]},{5:[2,12],10:[2,12],17:[2,12],18:[2,12],21:[2,12],23:[2,12],24:[2,12],26:[2,12],27:[2,12],29:[2,12]},{25:67,45:[1,31],48:29},{8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,3],26:[1,15],27:[1,16],29:[1,17]},{4:68,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,5],26:[1,15],27:[1,16],29:[1,17]},{10:[2,26],17:[2,26],18:[2,26],21:[2,26],23:[2,26],24:[2,26],26:[2,26],27:[2,26],29:[2,26]},{5:[2,13],10:[2,13],17:[2,13],18:[2,13],21:[2,13],23:[2,13],24:[2,13],26:[2,13],27:[2,13],29:[2,13]},{10:[2,18]},{20:[2,50],22:[2,50],25:57,28:[2,50],31:70,35:69,36:61,37:[1,58],38:[1,59],39:[1,60],40:[1,62],41:[2,50],42:71,43:64,44:66,45:[1,65],47:[1,30],48:29},{45:[1,72]},{20:[2,40],22:[2,40],28:[2,40],37:[2,40],38:[2,40],39:[2,40],40:[2,40],41:[2,40],45:[2,40],47:[2,40]},{10:[2,20],17:[2,20],18:[2,20],21:[2,20],23:[2,20],24:[2,20],26:[2,20],27:[2,20],29:[2,20]},{10:[2,19],17:[2,19],18:[2,19],21:[2,19],23:[2,19],24:[2,19],26:[2,19],27:[2,19],29:[2,19]},{5:[2,22],10:[2,22],17:[2,22],18:[2,22],21:[2,22],23:[2,22],24:[2,22],26:[2,22],27:[2,22],29:[2,22]},{5:[2,23],10:[2,23],17:[2,23],18:[2,23],21:[2,23],23:[2,23],24:[2,23],26:[2,23],27:[2,23],29:[2,23]},{22:[2,44],32:73,42:74,43:64,44:66,45:[1,75]},{22:[1,76]},{20:[2,29],22:[2,29],28:[2,29],37:[2,29],38:[2,29],39:[2,29],40:[2,29],41:[2,29],45:[2,29],47:[2,29]},{20:[2,30],22:[2,30],28:[2,30],37:[2,30],38:[2,30],39:[2,30],40:[2,30],41:[2,30],45:[2,30],47:[2,30]},{20:[2,31],22:[2,31],28:[2,31],37:[2,31],38:[2,31],39:[2,31],40:[2,31],41:[2,31],45:[2,31],47:[2,31]},{20:[2,32],22:[2,32],28:[2,32],37:[2,32],38:[2,32],39:[2,32],40:[2,32],41:[2,32],45:[2,32],47:[2,32]},{20:[2,33],22:[2,33],28:[2,33],37:[2,33],38:[2,33],39:[2,33],40:[2,33],41:[2,33],45:[2,33],47:[2,33]},{19:77,25:27,36:28,45:[1,31],47:[1,30],48:29},{22:[2,47]},{20:[2,35],22:[2,35],28:[2,35],41:[2,35],44:78,45:[1,75]},{20:[2,43],22:[2,43],28:[2,43],37:[2,43],38:[2,43],39:[2,43],40:[2,43],41:[2,43],45:[2,43],46:[1,79],47:[2,43],49:[2,43]},{20:[2,52],22:[2,52],28:[2,52],41:[2,52],45:[2,52]},{22:[1,80]},{8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,4],26:[1,15],27:[1,16],29:[1,17]},{20:[2,27],22:[2,27],28:[2,27],41:[2,27]},{20:[2,49],22:[2,49],28:[2,49],37:[2,49],38:[2,49],39:[2,49],40:[2,49],41:[2,49],45:[2,49],47:[2,49]},{20:[2,51],22:[2,51],28:[2,51],41:[2,51]},{20:[2,42],22:[2,42],28:[2,42],37:[2,42],38:[2,42],39:[2,42],40:[2,42],41:[2,42],45:[2,42],47:[2,42],49:[2,42]},{22:[1,81]},{22:[2,45]},{46:[1,79]},{5:[2,25],10:[2,25],17:[2,25],18:[2,25],21:[2,25],23:[2,25],24:[2,25],26:[2,25],27:[2,25],29:[2,25]},{41:[1,82]},{20:[2,53],22:[2,53],28:[2,53],41:[2,53],45:[2,53]},{25:57,31:83,36:61,37:[1,58],38:[1,59],39:[1,60],40:[1,62],45:[1,31],47:[1,30],48:29},{5:[2,21],10:[2,21],17:[2,21],18:[2,21],21:[2,21],23:[2,21],24:[2,21],26:[2,21],27:[2,21],29:[2,21]},{5:[2,24],10:[2,24],17:[2,24],18:[2,24],21:[2,24],23:[2,24],24:[2,24],26:[2,24],27:[2,24],29:[2,24]},{20:[2,34],22:[2,34],28:[2,34],37:[2,34],38:[2,34],39:[2,34],40:[2,34],41:[2,34],45:[2,34],47:[2,34]},{20:[2,36],22:[2,36],28:[2,36],41:[2,36],45:[2,36]}],defaultActions:{3:[2,2],18:[2,1],47:[2,18],63:[2,47],74:[2,45]},parseError:function(t){throw new Error(t)
},parse:function(t){function e(){var t;return t=n.lexer.lex()||1,"number"!=typeof t&&(t=n.symbols_[t]||t),t}var n=this,i=[0],r=[null],o=[],s=this.table,a="",l=0,c=0,u=0;this.lexer.setInput(t),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var p=this.lexer.yylloc;o.push(p);var h=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var f,d,g,m,v,b,y,w,_,x={};;){if(g=i[i.length-1],this.defaultActions[g]?m=this.defaultActions[g]:((null===f||"undefined"==typeof f)&&(f=e()),m=s[g]&&s[g][f]),"undefined"==typeof m||!m.length||!m[0]){var k="";if(!u){_=[];for(b in s[g])this.terminals_[b]&&b>2&&_.push("'"+this.terminals_[b]+"'");k=this.lexer.showPosition?"Parse error on line "+(l+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+_.join(", ")+", got '"+(this.terminals_[f]||f)+"'":"Parse error on line "+(l+1)+": Unexpected "+(1==f?"end of input":"'"+(this.terminals_[f]||f)+"'"),this.parseError(k,{text:this.lexer.match,token:this.terminals_[f]||f,line:this.lexer.yylineno,loc:p,expected:_})}}if(m[0]instanceof Array&&m.length>1)throw new Error("Parse Error: multiple actions possible at state: "+g+", token: "+f);switch(m[0]){case 1:i.push(f),r.push(this.lexer.yytext),o.push(this.lexer.yylloc),i.push(m[1]),f=null,d?(f=d,d=null):(c=this.lexer.yyleng,a=this.lexer.yytext,l=this.lexer.yylineno,p=this.lexer.yylloc,u>0&&u--);break;case 2:if(y=this.productions_[m[1]][1],x.$=r[r.length-y],x._$={first_line:o[o.length-(y||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(y||1)].first_column,last_column:o[o.length-1].last_column},h&&(x._$.range=[o[o.length-(y||1)].range[0],o[o.length-1].range[1]]),v=this.performAction.call(x,a,c,l,this.yy,m[1],r,o),"undefined"!=typeof v)return v;y&&(i=i.slice(0,-1*y*2),r=r.slice(0,-1*y),o=o.slice(0,-1*y)),i.push(this.productions_[m[1]][0]),r.push(x.$),o.push(x._$),w=s[i[i.length-2]][i[i.length-1]],i.push(w);break;case 3:return!0}}return!0}},i=function(){var t={EOF:1,parseError:function(t,e){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,e)},setInput:function(t){return this._input=t,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t;var e=t.match(/(?:\r\n?|\n).*/g);return e?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,n=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e-1),this.offset-=e;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===i.length?this.yylloc.first_column:0)+i[i.length-n.length].length-n[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this},more:function(){return this._more=!0,this},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var t,e,n,i,r;this._more||(this.yytext="",this.match="");for(var o=this._currentRules(),s=0;s<o.length&&(n=this._input.match(this.rules[o[s]]),!n||e&&!(n[0].length>e[0].length)||(e=n,i=s,this.options.flex));s++);return e?(r=e[0].match(/(?:\r\n?|\n).*/g),r&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-r[r.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],t=this.performAction.call(this,this.yy,this,o[i],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),t?t:void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return"undefined"!=typeof t?t:this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(t){this.begin(t)}};return t.options={},t.performAction=function(t,e,n){function i(t,n){return e.yytext=e.yytext.substr(t,e.yyleng-n)}switch(n){case 0:if("\\\\"===e.yytext.slice(-2)?(i(0,1),this.begin("mu")):"\\"===e.yytext.slice(-1)?(i(0,1),this.begin("emu")):this.begin("mu"),e.yytext)return 10;break;case 1:return 10;case 2:return this.popState(),10;case 3:return e.yytext=e.yytext.substr(5,e.yyleng-9),this.popState(),11;case 4:return 10;case 5:return i(0,4),this.popState(),17;case 6:return 40;case 7:return 41;case 8:return 18;case 9:return this.popState(),this.begin("raw"),20;case 10:return e.yytext=e.yytext.substr(4,e.yyleng-8),this.popState(),"RAW_BLOCK";case 11:return 29;case 12:return 21;case 13:return 24;case 14:return 23;case 15:return 23;case 16:return 27;case 17:return 26;case 18:this.popState(),this.begin("com");break;case 19:return i(3,5),this.popState(),17;case 20:return 26;case 21:return 46;case 22:return 45;case 23:return 45;case 24:return 49;case 25:break;case 26:return this.popState(),28;case 27:return this.popState(),22;case 28:return e.yytext=i(1,2).replace(/\\"/g,'"'),37;case 29:return e.yytext=i(1,2).replace(/\\'/g,"'"),37;case 30:return 47;case 31:return 39;case 32:return 39;case 33:return 38;case 34:return 45;case 35:return e.yytext=i(1,2),45;case 36:return"INVALID";case 37:return 5}},t.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{\{\{[^\x00]*\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],t.conditions={mu:{rules:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[5],inclusive:!1},raw:{rules:[3,4],inclusive:!1},INITIAL:{rules:[0,1,37],inclusive:!0}},t}();return n.lexer=i,e.prototype=n,n.Parser=e,new e}();return t=e}(),l=function(t,e){"use strict";function n(t){return t.constructor===o.ProgramNode?t:(r.yy=o,r.parse(t))}var i={},r=t,o=e;return i.parser=r,i.parse=n,i}(a,s),c=function(t){"use strict";function e(){}function n(t,e,n){if(null==t||"string"!=typeof t&&t.constructor!==n.AST.ProgramNode)throw new o("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+t);e=e||{},"data"in e||(e.data=!0);var i=n.parse(t),r=(new n.Compiler).compile(i,e);return(new n.JavaScriptCompiler).compile(r,e)}function i(t,e,n){function i(){var i=n.parse(t),r=(new n.Compiler).compile(i,e),o=(new n.JavaScriptCompiler).compile(r,e,void 0,!0);return n.template(o)}if(null==t||"string"!=typeof t&&t.constructor!==n.AST.ProgramNode)throw new o("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+t);e=e||{},"data"in e||(e.data=!0);var r,s=function(t,e){return r||(r=i()),r.call(this,t,e)};return s._setup=function(t){return r||(r=i()),r._setup(t)},s._child=function(t){return r||(r=i()),r._child(t)},s}var r={},o=t;return r.Compiler=e,e.prototype={compiler:e,disassemble:function(){for(var t,e,n,i=this.opcodes,r=[],o=0,s=i.length;s>o;o++)if(t=i[o],"DECLARE"===t.opcode)r.push("DECLARE "+t.name+"="+t.value);else{e=[];for(var a=0;a<t.args.length;a++)n=t.args[a],"string"==typeof n&&(n='"'+n.replace("\n","\\n")+'"'),e.push(n);r.push(t.opcode+" "+e.join(" "))}return r.join("\n")},equals:function(t){var e=this.opcodes.length;if(t.opcodes.length!==e)return!1;for(var n=0;e>n;n++){var i=this.opcodes[n],r=t.opcodes[n];if(i.opcode!==r.opcode||i.args.length!==r.args.length)return!1;for(var o=0;o<i.args.length;o++)if(i.args[o]!==r.args[o])return!1}if(e=this.children.length,t.children.length!==e)return!1;for(n=0;e>n;n++)if(!this.children[n].equals(t.children[n]))return!1;return!0},guid:0,compile:function(t,e){this.opcodes=[],this.children=[],this.depths={list:[]},this.options=e,this.stringParams=e.stringParams,this.trackIds=e.trackIds;var n=this.options.knownHelpers;if(this.options.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0,lookup:!0},n)for(var i in n)this.options.knownHelpers[i]=n[i];return this.accept(t)},accept:function(t){var e,n=t.strip||{};return n.left&&this.opcode("strip"),e=this[t.type](t),n.right&&this.opcode("strip"),e},program:function(t){for(var e=t.statements,n=0,i=e.length;i>n;n++)this.accept(e[n]);return this.isSimple=1===i,this.depths.list=this.depths.list.sort(function(t,e){return t-e}),this},compileProgram:function(t){var e,n=(new this.compiler).compile(t,this.options),i=this.guid++;this.usePartial=this.usePartial||n.usePartial,this.children[i]=n;for(var r=0,o=n.depths.list.length;o>r;r++)e=n.depths.list[r],2>e||this.addDepth(e-1);return i},block:function(t){var e=t.mustache,n=t.program,i=t.inverse;n&&(n=this.compileProgram(n)),i&&(i=this.compileProgram(i));var r=e.sexpr,o=this.classifySexpr(r);"helper"===o?this.helperSexpr(r,n,i):"simple"===o?(this.simpleSexpr(r),this.opcode("pushProgram",n),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("blockValue",r.id.original)):(this.ambiguousSexpr(r,n,i),this.opcode("pushProgram",n),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},hash:function(t){var e,n,i=t.pairs;for(this.opcode("pushHash"),e=0,n=i.length;n>e;e++)this.pushParam(i[e][1]);for(;e--;)this.opcode("assignToHash",i[e][0]);this.opcode("popHash")},partial:function(t){var e=t.partialName;this.usePartial=!0,t.hash?this.accept(t.hash):this.opcode("push","undefined"),t.context?this.accept(t.context):this.opcode("push","depth0"),this.opcode("invokePartial",e.name),this.opcode("append")},content:function(t){this.opcode("appendContent",t.string)},mustache:function(t){this.sexpr(t.sexpr),t.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},ambiguousSexpr:function(t,e,n){var i=t.id,r=i.parts[0],o=null!=e||null!=n;this.opcode("getContext",i.depth),this.opcode("pushProgram",e),this.opcode("pushProgram",n),this.opcode("invokeAmbiguous",r,o)},simpleSexpr:function(t){var e=t.id;"DATA"===e.type?this.DATA(e):e.parts.length?this.ID(e):(this.addDepth(e.depth),this.opcode("getContext",e.depth),this.opcode("pushContext")),this.opcode("resolvePossibleLambda")},helperSexpr:function(t,e,n){var i=this.setupFullMustacheParams(t,e,n),r=t.id,s=r.parts[0];if(this.options.knownHelpers[s])this.opcode("invokeKnownHelper",i.length,s);else{if(this.options.knownHelpersOnly)throw new o("You specified knownHelpersOnly, but used the unknown helper "+s,t);this.ID(r),this.opcode("invokeHelper",i.length,r.original,t.isRoot)}},sexpr:function(t){var e=this.classifySexpr(t);"simple"===e?this.simpleSexpr(t):"helper"===e?this.helperSexpr(t):this.ambiguousSexpr(t)},ID:function(t){this.addDepth(t.depth),this.opcode("getContext",t.depth);var e=t.parts[0];e?this.opcode("lookupOnContext",t.parts[0]):this.opcode("pushContext");for(var n=1,i=t.parts.length;i>n;n++)this.opcode("lookup",t.parts[n])},DATA:function(t){this.options.data=!0,this.opcode("lookupData",t.id.depth);for(var e=t.id.parts,n=0,i=e.length;i>n;n++)this.opcode("lookup",e[n])},STRING:function(t){this.opcode("pushString",t.string)},NUMBER:function(t){this.opcode("pushLiteral",t.number)},BOOLEAN:function(t){this.opcode("pushLiteral",t.bool)},comment:function(){},opcode:function(t){this.opcodes.push({opcode:t,args:[].slice.call(arguments,1)})},declare:function(t,e){this.opcodes.push({opcode:"DECLARE",name:t,value:e})},addDepth:function(t){0!==t&&(this.depths[t]||(this.depths[t]=!0,this.depths.list.push(t)))},classifySexpr:function(t){var e=t.isHelper,n=t.eligibleHelper,i=this.options;if(n&&!e){var r=t.id.parts[0];i.knownHelpers[r]?e=!0:i.knownHelpersOnly&&(n=!1)}return e?"helper":n?"ambiguous":"simple"},pushParams:function(t){for(var e=0,n=t.length;n>e;e++)this.pushParam(t[e])},pushParam:function(t){this.stringParams?(t.depth&&this.addDepth(t.depth),this.opcode("getContext",t.depth||0),this.opcode("pushStringParam",t.stringModeValue,t.type),"sexpr"===t.type&&this.sexpr(t)):(this.trackIds&&this.opcode("pushId",t.type,t.idName||t.stringModeValue),this.accept(t))},setupFullMustacheParams:function(t,e,n){var i=t.params;return this.pushParams(i),this.opcode("pushProgram",e),this.opcode("pushProgram",n),t.hash?this.hash(t.hash):this.opcode("emptyHash"),i}},r.precompile=n,r.compile=i,r}(n),u=function(t,e){"use strict";function n(t){this.value=t}function i(){}var r,o=t.COMPILER_REVISION,s=t.REVISION_CHANGES,a=t.log,l=e;i.prototype={nameLookup:function(t,e){var n,r;return 0===t.indexOf("depth")&&(n=!0),r=i.isValidJavaScriptVariableName(e)?t+"."+e:t+"['"+e+"']",n?"("+t+" && "+r+")":r},compilerInfo:function(){var t=o,e=s[t];return[t,e]},appendToBuffer:function(t){return this.environment.isSimple?"return "+t+";":{appendToBuffer:!0,content:t,toString:function(){return"buffer += "+t+";"}}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(t,e,n,i){this.environment=t,this.options=e||{},this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!i,a("debug",this.environment.disassemble()+"\n\n"),this.name=this.environment.name,this.isChild=!!n,this.context=n||{programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.compileChildren(t,e);var r,o,s,c=t.opcodes;for(o=0,s=c.length;s>o;o++)r=c[o],"DECLARE"===r.opcode?this[r.name]=r.value:this[r.opcode].apply(this,r.args),r.opcode!==this.stripNext&&(this.stripNext=!1);if(this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new l("Compile completed with content left on stack");var u=this.createFunctionContext(i);if(this.isChild)return u;var p={compiler:this.compilerInfo(),main:u},h=this.context.programs;for(o=0,s=h.length;s>o;o++)h[o]&&(p[o]=h[o]);return this.environment.usePartial&&(p.usePartial=!0),this.options.data&&(p.useData=!0),i||(p.compiler=JSON.stringify(p.compiler),p=this.objectLiteral(p)),p},preamble:function(){this.lastContext=0,this.source=[]},createFunctionContext:function(t){var e="",n=this.stackVars.concat(this.registers.list);n.length>0&&(e+=", "+n.join(", "));for(var i in this.aliases)this.aliases.hasOwnProperty(i)&&(e+=", "+i+"="+this.aliases[i]);for(var r=["depth0","helpers","partials","data"],o=0,s=this.environment.depths.list.length;s>o;o++)r.push("depth"+this.environment.depths.list[o]);var a=this.mergeSource(e);return t?(r.push(a),Function.apply(this,r)):"function("+r.join(",")+") {\n  "+a+"}"},mergeSource:function(t){for(var e,n,i="",r=!this.forceBuffer,o=0,s=this.source.length;s>o;o++){var a=this.source[o];a.appendToBuffer?e=e?e+"\n    + "+a.content:a.content:(e&&(i?i+="buffer += "+e+";\n  ":(n=!0,i=e+";\n  "),e=void 0),i+=a+"\n  ",this.environment.isSimple||(r=!1))}return r?(e||!i)&&(i+="return "+(e||'""')+";\n"):(t+=", buffer = "+(n?"":this.initializeBuffer()),i+=e?"return buffer + "+e+";\n":"return buffer;\n"),t&&(i="var "+t.substring(2)+(n?"":";\n  ")+i),i},blockValue:function(t){this.aliases.blockHelperMissing="helpers.blockHelperMissing";var e=["depth0"];this.setupParams(t,0,e),this.replaceStack(function(t){return e.splice(1,0,t),"blockHelperMissing.call("+e.join(", ")+")"})},ambiguousBlockValue:function(){this.aliases.blockHelperMissing="helpers.blockHelperMissing";var t=["depth0"];this.setupParams("",0,t,!0),this.flushInline();var e=this.topStack();t.splice(1,0,e),this.pushSource("if (!"+this.lastHelper+") { "+e+" = blockHelperMissing.call("+t.join(", ")+"); }")},appendContent:function(t){this.pendingContent&&(t=this.pendingContent+t),this.stripNext&&(t=t.replace(/^\s+/,"")),this.pendingContent=t},strip:function(){this.pendingContent&&(this.pendingContent=this.pendingContent.replace(/\s+$/,"")),this.stripNext="strip"},append:function(){this.flushInline();var t=this.popStack();this.pushSource("if("+t+" || "+t+" === 0) { "+this.appendToBuffer(t)+" }"),this.environment.isSimple&&this.pushSource("else { "+this.appendToBuffer("''")+" }")},appendEscaped:function(){this.aliases.escapeExpression="this.escapeExpression",this.pushSource(this.appendToBuffer("escapeExpression("+this.popStack()+")"))},getContext:function(t){this.lastContext!==t&&(this.lastContext=t)},lookupOnContext:function(t){this.push(this.nameLookup("depth"+this.lastContext,t,"context"))},pushContext:function(){this.pushStackLiteral("depth"+this.lastContext)},resolvePossibleLambda:function(){this.aliases.functionType='"function"',this.replaceStack(function(t){return"typeof "+t+" === functionType ? "+t+".apply(depth0) : "+t})},lookup:function(t){this.replaceStack(function(e){return e+" == null || "+e+" === false ? "+e+" : "+this.nameLookup(e,t,"context")})},lookupData:function(t){t?this.pushStackLiteral("this.data(data, "+t+")"):this.pushStackLiteral("data")},pushStringParam:function(t,e){this.pushStackLiteral("depth"+this.lastContext),this.pushString(e),"sexpr"!==e&&("string"==typeof t?this.pushString(t):this.pushStackLiteral(t))},emptyHash:function(){this.pushStackLiteral("{}"),this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),this.push("{}"))},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var t=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push("{"+t.ids.join(",")+"}"),this.stringParams&&(this.push("{"+t.contexts.join(",")+"}"),this.push("{"+t.types.join(",")+"}")),this.push("{\n    "+t.values.join(",\n    ")+"\n  }")},pushString:function(t){this.pushStackLiteral(this.quotedString(t))},push:function(t){return this.inlineStack.push(t),t},pushLiteral:function(t){this.pushStackLiteral(t)},pushProgram:function(t){null!=t?this.pushStackLiteral(this.programExpression(t)):this.pushStackLiteral(null)},invokeHelper:function(t,e,n){this.aliases.helperMissing="helpers.helperMissing",this.useRegister("helper");var i=this.popStack(),r=this.setupHelper(t,e),o="helper = "+r.name+" || "+i+" || helperMissing";r.paramsInit&&(o+=","+r.paramsInit),this.push("("+o+",helper.call("+r.callParams+"))"),n||this.flushInline()},invokeKnownHelper:function(t,e){var n=this.setupHelper(t,e);this.push(n.name+".call("+n.callParams+")")},invokeAmbiguous:function(t,e){this.aliases.functionType='"function"',this.useRegister("helper"),this.emptyHash();var n=this.setupHelper(0,t,e),i=this.lastHelper=this.nameLookup("helpers",t,"helper"),r=this.nameLookup("depth"+this.lastContext,t,"context");this.push("((helper = "+i+" || "+r+(n.paramsInit?"),("+n.paramsInit:"")+"),(typeof helper === functionType ? helper.call("+n.callParams+") : helper))")},invokePartial:function(t){var e=[this.nameLookup("partials",t,"partial"),"'"+t+"'",this.popStack(),this.popStack(),"helpers","partials"];this.options.data&&e.push("data"),this.push("this.invokePartial("+e.join(", ")+")")},assignToHash:function(t){var e,n,i,r=this.popStack();this.trackIds&&(i=this.popStack()),this.stringParams&&(n=this.popStack(),e=this.popStack());var o=this.hash;e&&o.contexts.push("'"+t+"': "+e),n&&o.types.push("'"+t+"': "+n),i&&o.ids.push("'"+t+"': "+i),o.values.push("'"+t+"': ("+r+")")},pushId:function(t,e){"ID"===t||"DATA"===t?this.pushString(e):"sexpr"===t?this.pushStackLiteral("true"):this.pushStackLiteral("null")},compiler:i,compileChildren:function(t,e){for(var n,i,r=t.children,o=0,s=r.length;s>o;o++){n=r[o],i=new this.compiler;var a=this.matchExistingProgram(n);null==a?(this.context.programs.push(""),a=this.context.programs.length,n.index=a,n.name="program"+a,this.context.programs[a]=i.compile(n,e,this.context,!this.precompile),this.context.environments[a]=n):(n.index=a,n.name="program"+a)}},matchExistingProgram:function(t){for(var e=0,n=this.context.environments.length;n>e;e++){var i=this.context.environments[e];if(i&&i.equals(t))return e}},programExpression:function(t){if(null==t)return"this.noop";for(var e,n=this.environment.children[t],i=n.depths.list,r=[n.index,"data"],o=0,s=i.length;s>o;o++)e=i[o],r.push("depth"+(e-1));return(0===i.length?"this.program(":"this.programWithDepth(")+r.join(", ")+")"},register:function(t,e){this.useRegister(t),this.pushSource(t+" = "+e+";")},useRegister:function(t){this.registers[t]||(this.registers[t]=!0,this.registers.list.push(t))},pushStackLiteral:function(t){return this.push(new n(t))},pushSource:function(t){this.pendingContent&&(this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))),this.pendingContent=void 0),t&&this.source.push(t)},pushStack:function(t){this.flushInline();var e=this.incrStack();return t&&this.pushSource(e+" = "+t+";"),this.compileStack.push(e),e},replaceStack:function(t){var e,i,r,o="",s=this.isInline();if(s){var a=this.popStack(!0);if(a instanceof n)e=a.value,r=!0;else{i=!this.stackSlot;var l=i?this.incrStack():this.topStackName();o="("+this.push(l)+" = "+a+"),",e=this.topStack()}}else e=this.topStack();var c=t.call(this,e);return s?(r||this.popStack(),i&&this.stackSlot--,this.push("("+o+c+")")):(/^stack/.test(e)||(e=this.nextStack()),this.pushSource(e+" = ("+o+c+");")),e},nextStack:function(){return this.pushStack()},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var t=this.inlineStack;if(t.length){this.inlineStack=[];for(var e=0,i=t.length;i>e;e++){var r=t[e];r instanceof n?this.compileStack.push(r):this.pushStack(r)}}},isInline:function(){return this.inlineStack.length},popStack:function(t){var e=this.isInline(),i=(e?this.inlineStack:this.compileStack).pop();if(!t&&i instanceof n)return i.value;if(!e){if(!this.stackSlot)throw new l("Invalid stack pop");this.stackSlot--}return i},topStack:function(t){var e=this.isInline()?this.inlineStack:this.compileStack,i=e[e.length-1];return!t&&i instanceof n?i.value:i},quotedString:function(t){return'"'+t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(this.quotedString(n)+":"+t[n]);return"{"+e.join(",")+"}"},setupHelper:function(t,e,n){var i=[],r=this.setupParams(e,t,i,n),o=this.nameLookup("helpers",e,"helper");return{params:i,paramsInit:r,name:o,callParams:["depth0"].concat(i).join(", ")}},setupOptions:function(t,e,n){var i,r,o,s={},a=[],l=[],c=[];s.name=this.quotedString(t),s.hash=this.popStack(),this.trackIds&&(s.hashIds=this.popStack()),this.stringParams&&(s.hashTypes=this.popStack(),s.hashContexts=this.popStack()),r=this.popStack(),o=this.popStack(),(o||r)&&(o||(o="this.noop"),r||(r="this.noop"),s.fn=o,s.inverse=r);for(var u=e;u--;)i=this.popStack(),n[u]=i,this.trackIds&&(c[u]=this.popStack()),this.stringParams&&(l[u]=this.popStack(),a[u]=this.popStack());return this.trackIds&&(s.ids="["+c.join(",")+"]"),this.stringParams&&(s.types="["+l.join(",")+"]",s.contexts="["+a.join(",")+"]"),this.options.data&&(s.data="data"),s},setupParams:function(t,e,n,i){var r=this.objectLiteral(this.setupOptions(t,e,n));return i?(this.useRegister("options"),n.push("options"),"options="+r):(n.push(r),"")}};for(var c="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),u=i.RESERVED_WORDS={},p=0,h=c.length;h>p;p++)u[c[p]]=!0;return i.isValidJavaScriptVariableName=function(t){return!i.RESERVED_WORDS[t]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t)},r=i}(i,n),p=function(t,e,n,i,r){"use strict";var o,s=t,a=e,l=n.parser,c=n.parse,u=i.Compiler,p=i.compile,h=i.precompile,f=r,d=s.create,g=function(){var t=d();return t.compile=function(e,n){return p(e,n,t)},t.precompile=function(e,n){return h(e,n,t)},t.AST=a,t.Compiler=u,t.JavaScriptCompiler=f,t.Parser=l,t.parse=c,t};return s=g(),s.create=g,o=s}(o,s,l,c,u);return p}()},{}],16:[function(t,e){!function(){function t(e,i){if(e=e?e:"",i=i||{},e instanceof t)return e;if(!(this instanceof t))return new t(e,i);var r=n(e);this._originalInput=e,this._r=r.r,this._g=r.g,this._b=r.b,this._a=r.a,this._roundA=B(100*this._a)/100,this._format=i.format||r.format,this._gradientType=i.gradientType,this._r<1&&(this._r=B(this._r)),this._g<1&&(this._g=B(this._g)),this._b<1&&(this._b=B(this._b)),this._ok=r.ok,this._tc_id=D++}function n(t){var e={r:0,g:0,b:0},n=1,r=!1,s=!1;return"string"==typeof t&&(t=T(t)),"object"==typeof t&&(t.hasOwnProperty("r")&&t.hasOwnProperty("g")&&t.hasOwnProperty("b")?(e=i(t.r,t.g,t.b),r=!0,s="%"===String(t.r).substr(-1)?"prgb":"rgb"):t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("v")?(t.s=j(t.s),t.v=j(t.v),e=a(t.h,t.s,t.v),r=!0,s="hsv"):t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("l")&&(t.s=j(t.s),t.l=j(t.l),e=o(t.h,t.s,t.l),r=!0,s="hsl"),t.hasOwnProperty("a")&&(n=t.a)),n=S(n),{ok:r,format:t.format||s,r:z(255,F(e.r,0)),g:z(255,F(e.g,0)),b:z(255,F(e.b,0)),a:n}}function i(t,e,n){return{r:255*C(t,255),g:255*C(e,255),b:255*C(n,255)}}function r(t,e,n){t=C(t,255),e=C(e,255),n=C(n,255);var i,r,o=F(t,e,n),s=z(t,e,n),a=(o+s)/2;if(o==s)i=r=0;else{var l=o-s;switch(r=a>.5?l/(2-o-s):l/(o+s),o){case t:i=(e-n)/l+(n>e?6:0);break;case e:i=(n-t)/l+2;break;case n:i=(t-e)/l+4}i/=6}return{h:i,s:r,l:a}}function o(t,e,n){function i(t,e,n){return 0>n&&(n+=1),n>1&&(n-=1),1/6>n?t+6*(e-t)*n:.5>n?e:2/3>n?t+6*(e-t)*(2/3-n):t}var r,o,s;if(t=C(t,360),e=C(e,100),n=C(n,100),0===e)r=o=s=n;else{var a=.5>n?n*(1+e):n+e-n*e,l=2*n-a;r=i(l,a,t+1/3),o=i(l,a,t),s=i(l,a,t-1/3)}return{r:255*r,g:255*o,b:255*s}}function s(t,e,n){t=C(t,255),e=C(e,255),n=C(n,255);var i,r,o=F(t,e,n),s=z(t,e,n),a=o,l=o-s;if(r=0===o?0:l/o,o==s)i=0;else{switch(o){case t:i=(e-n)/l+(n>e?6:0);break;case e:i=(n-t)/l+2;break;case n:i=(t-e)/l+4}i/=6}return{h:i,s:r,v:a}}function a(t,e,n){t=6*C(t,360),e=C(e,100),n=C(n,100);var i=M.floor(t),r=t-i,o=n*(1-e),s=n*(1-r*e),a=n*(1-(1-r)*e),l=i%6,c=[n,s,o,o,a,n][l],u=[a,n,n,s,o,o][l],p=[o,o,a,n,n,s][l];return{r:255*c,g:255*u,b:255*p}}function l(t,e,n,i){var r=[O(B(t).toString(16)),O(B(e).toString(16)),O(B(n).toString(16))];return i&&r[0].charAt(0)==r[0].charAt(1)&&r[1].charAt(0)==r[1].charAt(1)&&r[2].charAt(0)==r[2].charAt(1)?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0):r.join("")}function c(t,e,n,i){var r=[O(R(i)),O(B(t).toString(16)),O(B(e).toString(16)),O(B(n).toString(16))];return r.join("")}function u(e,n){n=0===n?0:n||10;var i=t(e).toHsl();return i.s-=n/100,i.s=P(i.s),t(i)}function p(e,n){n=0===n?0:n||10;var i=t(e).toHsl();return i.s+=n/100,i.s=P(i.s),t(i)}function h(e){return t(e).desaturate(100)}function f(e,n){n=0===n?0:n||10;var i=t(e).toHsl();return i.l+=n/100,i.l=P(i.l),t(i)}function d(e,n){n=0===n?0:n||10;var i=t(e).toRgb();return i.r=F(0,z(255,i.r-B(255*-(n/100)))),i.g=F(0,z(255,i.g-B(255*-(n/100)))),i.b=F(0,z(255,i.b-B(255*-(n/100)))),t(i)}function g(e,n){n=0===n?0:n||10;var i=t(e).toHsl();return i.l-=n/100,i.l=P(i.l),t(i)}function m(e,n){var i=t(e).toHsl(),r=(B(i.h)+n)%360;return i.h=0>r?360+r:r,t(i)}function v(e){var n=t(e).toHsl();return n.h=(n.h+180)%360,t(n)}function b(e){var n=t(e).toHsl(),i=n.h;return[t(e),t({h:(i+120)%360,s:n.s,l:n.l}),t({h:(i+240)%360,s:n.s,l:n.l})]}function y(e){var n=t(e).toHsl(),i=n.h;return[t(e),t({h:(i+90)%360,s:n.s,l:n.l}),t({h:(i+180)%360,s:n.s,l:n.l}),t({h:(i+270)%360,s:n.s,l:n.l})]}function w(e){var n=t(e).toHsl(),i=n.h;return[t(e),t({h:(i+72)%360,s:n.s,l:n.l}),t({h:(i+216)%360,s:n.s,l:n.l})]}function _(e,n,i){n=n||6,i=i||30;var r=t(e).toHsl(),o=360/i,s=[t(e)];for(r.h=(r.h-(o*n>>1)+720)%360;--n;)r.h=(r.h+o)%360,s.push(t(r));return s}function x(e,n){n=n||6;for(var i=t(e).toHsv(),r=i.h,o=i.s,s=i.v,a=[],l=1/n;n--;)a.push(t({h:r,s:o,v:s})),s=(s+l)%1;return a}function k(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[t[n]]=n);return e}function S(t){return t=parseFloat(t),(isNaN(t)||0>t||t>1)&&(t=1),t}function C(t,e){A(t)&&(t="100%");var n=N(t);return t=z(e,F(0,parseFloat(t))),n&&(t=parseInt(t*e,10)/100),M.abs(t-e)<1e-6?1:t%e/parseFloat(e)}function P(t){return z(1,F(0,t))}function E(t){return parseInt(t,16)}function A(t){return"string"==typeof t&&-1!=t.indexOf(".")&&1===parseFloat(t)}function N(t){return"string"==typeof t&&-1!=t.indexOf("%")}function O(t){return 1==t.length?"0"+t:""+t}function j(t){return 1>=t&&(t=100*t+"%"),t}function R(t){return Math.round(255*parseFloat(t)).toString(16)}function L(t){return E(t)/255}function T(t){t=t.replace(H,"").replace($,"").toLowerCase();var e=!1;if(V[t])t=V[t],e=!0;else if("transparent"==t)return{r:0,g:0,b:0,a:0,format:"name"};var n;return(n=W.rgb.exec(t))?{r:n[1],g:n[2],b:n[3]}:(n=W.rgba.exec(t))?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=W.hsl.exec(t))?{h:n[1],s:n[2],l:n[3]}:(n=W.hsla.exec(t))?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=W.hsv.exec(t))?{h:n[1],s:n[2],v:n[3]}:(n=W.hsva.exec(t))?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=W.hex8.exec(t))?{a:L(n[1]),r:E(n[2]),g:E(n[3]),b:E(n[4]),format:e?"name":"hex8"}:(n=W.hex6.exec(t))?{r:E(n[1]),g:E(n[2]),b:E(n[3]),format:e?"name":"hex"}:(n=W.hex3.exec(t))?{r:E(n[1]+""+n[1]),g:E(n[2]+""+n[2]),b:E(n[3]+""+n[3]),format:e?"name":"hex"}:!1}function I(t){var e,n;return t=t||{level:"AA",size:"small"},e=(t.level||"AA").toUpperCase(),n=(t.size||"small").toLowerCase(),"AA"!==e&&"AAA"!==e&&(e="AA"),"small"!==n&&"large"!==n&&(n="small"),{level:e,size:n}}var H=/^\s+/,$=/\s+$/,D=0,M=Math,B=M.round,z=M.min,F=M.max,U=M.random;t.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var t=this.toRgb();
return(299*t.r+587*t.g+114*t.b)/1e3},getLuminance:function(){var t,e,n,i,r,o,s=this.toRgb();return t=s.r/255,e=s.g/255,n=s.b/255,i=.03928>=t?t/12.92:Math.pow((t+.055)/1.055,2.4),r=.03928>=e?e/12.92:Math.pow((e+.055)/1.055,2.4),o=.03928>=n?n/12.92:Math.pow((n+.055)/1.055,2.4),.2126*i+.7152*r+.0722*o},setAlpha:function(t){return this._a=S(t),this._roundA=B(100*this._a)/100,this},toHsv:function(){var t=s(this._r,this._g,this._b);return{h:360*t.h,s:t.s,v:t.v,a:this._a}},toHsvString:function(){var t=s(this._r,this._g,this._b),e=B(360*t.h),n=B(100*t.s),i=B(100*t.v);return 1==this._a?"hsv("+e+", "+n+"%, "+i+"%)":"hsva("+e+", "+n+"%, "+i+"%, "+this._roundA+")"},toHsl:function(){var t=r(this._r,this._g,this._b);return{h:360*t.h,s:t.s,l:t.l,a:this._a}},toHslString:function(){var t=r(this._r,this._g,this._b),e=B(360*t.h),n=B(100*t.s),i=B(100*t.l);return 1==this._a?"hsl("+e+", "+n+"%, "+i+"%)":"hsla("+e+", "+n+"%, "+i+"%, "+this._roundA+")"},toHex:function(t){return l(this._r,this._g,this._b,t)},toHexString:function(t){return"#"+this.toHex(t)},toHex8:function(){return c(this._r,this._g,this._b,this._a)},toHex8String:function(){return"#"+this.toHex8()},toRgb:function(){return{r:B(this._r),g:B(this._g),b:B(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+B(this._r)+", "+B(this._g)+", "+B(this._b)+")":"rgba("+B(this._r)+", "+B(this._g)+", "+B(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:B(100*C(this._r,255))+"%",g:B(100*C(this._g,255))+"%",b:B(100*C(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+B(100*C(this._r,255))+"%, "+B(100*C(this._g,255))+"%, "+B(100*C(this._b,255))+"%)":"rgba("+B(100*C(this._r,255))+"%, "+B(100*C(this._g,255))+"%, "+B(100*C(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":this._a<1?!1:q[l(this._r,this._g,this._b,!0)]||!1},toFilter:function(e){var n="#"+c(this._r,this._g,this._b,this._a),i=n,r=this._gradientType?"GradientType = 1, ":"";if(e){var o=t(e);i=o.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+r+"startColorstr="+n+",endColorstr="+i+")"},toString:function(t){var e=!!t;t=t||this._format;var n=!1,i=this._a<1&&this._a>=0,r=!e&&i&&("hex"===t||"hex6"===t||"hex3"===t||"name"===t);return r?"name"===t&&0===this._a?this.toName():this.toRgbString():("rgb"===t&&(n=this.toRgbString()),"prgb"===t&&(n=this.toPercentageRgbString()),("hex"===t||"hex6"===t)&&(n=this.toHexString()),"hex3"===t&&(n=this.toHexString(!0)),"hex8"===t&&(n=this.toHex8String()),"name"===t&&(n=this.toName()),"hsl"===t&&(n=this.toHslString()),"hsv"===t&&(n=this.toHsvString()),n||this.toHexString())},clone:function(){return t(this.toString())},_applyModification:function(t,e){var n=t.apply(null,[this].concat([].slice.call(e)));return this._r=n._r,this._g=n._g,this._b=n._b,this.setAlpha(n._a),this},lighten:function(){return this._applyModification(f,arguments)},brighten:function(){return this._applyModification(d,arguments)},darken:function(){return this._applyModification(g,arguments)},desaturate:function(){return this._applyModification(u,arguments)},saturate:function(){return this._applyModification(p,arguments)},greyscale:function(){return this._applyModification(h,arguments)},spin:function(){return this._applyModification(m,arguments)},_applyCombination:function(t,e){return t.apply(null,[this].concat([].slice.call(e)))},analogous:function(){return this._applyCombination(_,arguments)},complement:function(){return this._applyCombination(v,arguments)},monochromatic:function(){return this._applyCombination(x,arguments)},splitcomplement:function(){return this._applyCombination(w,arguments)},triad:function(){return this._applyCombination(b,arguments)},tetrad:function(){return this._applyCombination(y,arguments)}},t.fromRatio=function(e,n){if("object"==typeof e){var i={};for(var r in e)e.hasOwnProperty(r)&&(i[r]="a"===r?e[r]:j(e[r]));e=i}return t(e,n)},t.equals=function(e,n){return e&&n?t(e).toRgbString()==t(n).toRgbString():!1},t.random=function(){return t.fromRatio({r:U(),g:U(),b:U()})},t.mix=function(e,n,i){i=0===i?0:i||50;var r,o=t(e).toRgb(),s=t(n).toRgb(),a=i/100,l=2*a-1,c=s.a-o.a;r=-1==l*c?l:(l+c)/(1+l*c),r=(r+1)/2;var u=1-r,p={r:s.r*r+o.r*u,g:s.g*r+o.g*u,b:s.b*r+o.b*u,a:s.a*a+o.a*(1-a)};return t(p)},t.readability=function(e,n){var i=t(e),r=t(n);return(Math.max(i.getLuminance(),r.getLuminance())+.05)/(Math.min(i.getLuminance(),r.getLuminance())+.05)},t.isReadable=function(e,n,i){var r,o,s=t.readability(e,n);switch(o=!1,r=I(i),r.level+r.size){case"AAsmall":case"AAAlarge":o=s>=4.5;break;case"AAlarge":o=s>=3;break;case"AAAsmall":o=s>=7}return o},t.mostReadable=function(e,n,i){var r,o,s,a,l=null,c=0;i=i||{},o=i.includeFallbackColors,s=i.level,a=i.size;for(var u=0;u<n.length;u++)r=t.readability(e,n[u]),r>c&&(c=r,l=t(n[u]));return t.isReadable(e,l,{level:s,size:a})||!o?l:(i.includeFallbackColors=!1,t.mostReadable(e,["#fff","#000"],i))};var V=t.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},q=t.hexNames=k(V),W=function(){var t="[-\\+]?\\d+%?",e="[-\\+]?\\d*\\.\\d+%?",n="(?:"+e+")|(?:"+t+")",i="[\\s|\\(]+("+n+")[,|\\s]+("+n+")[,|\\s]+("+n+")\\s*\\)?",r="[\\s|\\(]+("+n+")[,|\\s]+("+n+")[,|\\s]+("+n+")[,|\\s]+("+n+")\\s*\\)?";return{rgb:new RegExp("rgb"+i),rgba:new RegExp("rgba"+r),hsl:new RegExp("hsl"+i),hsla:new RegExp("hsla"+r),hsv:new RegExp("hsv"+i),hsva:new RegExp("hsva"+r),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();"undefined"!=typeof e&&e.exports?e.exports=t:"function"==typeof define&&define.amd?define(function(){return t}):window.tinycolor=t}()},{}],17:[function(t,e,n){(function(){var t=this,i=t._,r={},o=Array.prototype,s=Object.prototype,a=Function.prototype,l=o.push,c=o.slice,u=o.concat,p=s.toString,h=s.hasOwnProperty,f=o.forEach,d=o.map,g=o.reduce,m=o.reduceRight,v=o.filter,b=o.every,y=o.some,w=o.indexOf,_=o.lastIndexOf,x=Array.isArray,k=Object.keys,S=a.bind,C=function(t){return t instanceof C?t:this instanceof C?void(this._wrapped=t):new C(t)};"undefined"!=typeof n?("undefined"!=typeof e&&e.exports&&(n=e.exports=C),n._=C):t._=C,C.VERSION="1.6.0";var P=C.each=C.forEach=function(t,e,n){if(null==t)return t;if(f&&t.forEach===f)t.forEach(e,n);else if(t.length===+t.length){for(var i=0,o=t.length;o>i;i++)if(e.call(n,t[i],i,t)===r)return}else for(var s=C.keys(t),i=0,o=s.length;o>i;i++)if(e.call(n,t[s[i]],s[i],t)===r)return;return t};C.map=C.collect=function(t,e,n){var i=[];return null==t?i:d&&t.map===d?t.map(e,n):(P(t,function(t,r,o){i.push(e.call(n,t,r,o))}),i)};var E="Reduce of empty array with no initial value";C.reduce=C.foldl=C.inject=function(t,e,n,i){var r=arguments.length>2;if(null==t&&(t=[]),g&&t.reduce===g)return i&&(e=C.bind(e,i)),r?t.reduce(e,n):t.reduce(e);if(P(t,function(t,o,s){r?n=e.call(i,n,t,o,s):(n=t,r=!0)}),!r)throw new TypeError(E);return n},C.reduceRight=C.foldr=function(t,e,n,i){var r=arguments.length>2;if(null==t&&(t=[]),m&&t.reduceRight===m)return i&&(e=C.bind(e,i)),r?t.reduceRight(e,n):t.reduceRight(e);var o=t.length;if(o!==+o){var s=C.keys(t);o=s.length}if(P(t,function(a,l,c){l=s?s[--o]:--o,r?n=e.call(i,n,t[l],l,c):(n=t[l],r=!0)}),!r)throw new TypeError(E);return n},C.find=C.detect=function(t,e,n){var i;return A(t,function(t,r,o){return e.call(n,t,r,o)?(i=t,!0):void 0}),i},C.filter=C.select=function(t,e,n){var i=[];return null==t?i:v&&t.filter===v?t.filter(e,n):(P(t,function(t,r,o){e.call(n,t,r,o)&&i.push(t)}),i)},C.reject=function(t,e,n){return C.filter(t,function(t,i,r){return!e.call(n,t,i,r)},n)},C.every=C.all=function(t,e,n){e||(e=C.identity);var i=!0;return null==t?i:b&&t.every===b?t.every(e,n):(P(t,function(t,o,s){return(i=i&&e.call(n,t,o,s))?void 0:r}),!!i)};var A=C.some=C.any=function(t,e,n){e||(e=C.identity);var i=!1;return null==t?i:y&&t.some===y?t.some(e,n):(P(t,function(t,o,s){return i||(i=e.call(n,t,o,s))?r:void 0}),!!i)};C.contains=C.include=function(t,e){return null==t?!1:w&&t.indexOf===w?-1!=t.indexOf(e):A(t,function(t){return t===e})},C.invoke=function(t,e){var n=c.call(arguments,2),i=C.isFunction(e);return C.map(t,function(t){return(i?e:t[e]).apply(t,n)})},C.pluck=function(t,e){return C.map(t,C.property(e))},C.where=function(t,e){return C.filter(t,C.matches(e))},C.findWhere=function(t,e){return C.find(t,C.matches(e))},C.max=function(t,e,n){if(!e&&C.isArray(t)&&t[0]===+t[0]&&t.length<65535)return Math.max.apply(Math,t);var i=-1/0,r=-1/0;return P(t,function(t,o,s){var a=e?e.call(n,t,o,s):t;a>r&&(i=t,r=a)}),i},C.min=function(t,e,n){if(!e&&C.isArray(t)&&t[0]===+t[0]&&t.length<65535)return Math.min.apply(Math,t);var i=1/0,r=1/0;return P(t,function(t,o,s){var a=e?e.call(n,t,o,s):t;r>a&&(i=t,r=a)}),i},C.shuffle=function(t){var e,n=0,i=[];return P(t,function(t){e=C.random(n++),i[n-1]=i[e],i[e]=t}),i},C.sample=function(t,e,n){return null==e||n?(t.length!==+t.length&&(t=C.values(t)),t[C.random(t.length-1)]):C.shuffle(t).slice(0,Math.max(0,e))};var N=function(t){return null==t?C.identity:C.isFunction(t)?t:C.property(t)};C.sortBy=function(t,e,n){return e=N(e),C.pluck(C.map(t,function(t,i,r){return{value:t,index:i,criteria:e.call(n,t,i,r)}}).sort(function(t,e){var n=t.criteria,i=e.criteria;if(n!==i){if(n>i||void 0===n)return 1;if(i>n||void 0===i)return-1}return t.index-e.index}),"value")};var O=function(t){return function(e,n,i){var r={};return n=N(n),P(e,function(o,s){var a=n.call(i,o,s,e);t(r,a,o)}),r}};C.groupBy=O(function(t,e,n){C.has(t,e)?t[e].push(n):t[e]=[n]}),C.indexBy=O(function(t,e,n){t[e]=n}),C.countBy=O(function(t,e){C.has(t,e)?t[e]++:t[e]=1}),C.sortedIndex=function(t,e,n,i){n=N(n);for(var r=n.call(i,e),o=0,s=t.length;s>o;){var a=o+s>>>1;n.call(i,t[a])<r?o=a+1:s=a}return o},C.toArray=function(t){return t?C.isArray(t)?c.call(t):t.length===+t.length?C.map(t,C.identity):C.values(t):[]},C.size=function(t){return null==t?0:t.length===+t.length?t.length:C.keys(t).length},C.first=C.head=C.take=function(t,e,n){return null==t?void 0:null==e||n?t[0]:0>e?[]:c.call(t,0,e)},C.initial=function(t,e,n){return c.call(t,0,t.length-(null==e||n?1:e))},C.last=function(t,e,n){return null==t?void 0:null==e||n?t[t.length-1]:c.call(t,Math.max(t.length-e,0))},C.rest=C.tail=C.drop=function(t,e,n){return c.call(t,null==e||n?1:e)},C.compact=function(t){return C.filter(t,C.identity)};var j=function(t,e,n){return e&&C.every(t,C.isArray)?u.apply(n,t):(P(t,function(t){C.isArray(t)||C.isArguments(t)?e?l.apply(n,t):j(t,e,n):n.push(t)}),n)};C.flatten=function(t,e){return j(t,e,[])},C.without=function(t){return C.difference(t,c.call(arguments,1))},C.partition=function(t,e){var n=[],i=[];return P(t,function(t){(e(t)?n:i).push(t)}),[n,i]},C.uniq=C.unique=function(t,e,n,i){C.isFunction(e)&&(i=n,n=e,e=!1);var r=n?C.map(t,n,i):t,o=[],s=[];return P(r,function(n,i){(e?i&&s[s.length-1]===n:C.contains(s,n))||(s.push(n),o.push(t[i]))}),o},C.union=function(){return C.uniq(C.flatten(arguments,!0))},C.intersection=function(t){var e=c.call(arguments,1);return C.filter(C.uniq(t),function(t){return C.every(e,function(e){return C.contains(e,t)})})},C.difference=function(t){var e=u.apply(o,c.call(arguments,1));return C.filter(t,function(t){return!C.contains(e,t)})},C.zip=function(){for(var t=C.max(C.pluck(arguments,"length").concat(0)),e=new Array(t),n=0;t>n;n++)e[n]=C.pluck(arguments,""+n);return e},C.object=function(t,e){if(null==t)return{};for(var n={},i=0,r=t.length;r>i;i++)e?n[t[i]]=e[i]:n[t[i][0]]=t[i][1];return n},C.indexOf=function(t,e,n){if(null==t)return-1;var i=0,r=t.length;if(n){if("number"!=typeof n)return i=C.sortedIndex(t,e),t[i]===e?i:-1;i=0>n?Math.max(0,r+n):n}if(w&&t.indexOf===w)return t.indexOf(e,n);for(;r>i;i++)if(t[i]===e)return i;return-1},C.lastIndexOf=function(t,e,n){if(null==t)return-1;var i=null!=n;if(_&&t.lastIndexOf===_)return i?t.lastIndexOf(e,n):t.lastIndexOf(e);for(var r=i?n:t.length;r--;)if(t[r]===e)return r;return-1},C.range=function(t,e,n){arguments.length<=1&&(e=t||0,t=0),n=arguments[2]||1;for(var i=Math.max(Math.ceil((e-t)/n),0),r=0,o=new Array(i);i>r;)o[r++]=t,t+=n;return o};var R=function(){};C.bind=function(t,e){var n,i;if(S&&t.bind===S)return S.apply(t,c.call(arguments,1));if(!C.isFunction(t))throw new TypeError;return n=c.call(arguments,2),i=function(){if(!(this instanceof i))return t.apply(e,n.concat(c.call(arguments)));R.prototype=t.prototype;var r=new R;R.prototype=null;var o=t.apply(r,n.concat(c.call(arguments)));return Object(o)===o?o:r}},C.partial=function(t){var e=c.call(arguments,1);return function(){for(var n=0,i=e.slice(),r=0,o=i.length;o>r;r++)i[r]===C&&(i[r]=arguments[n++]);for(;n<arguments.length;)i.push(arguments[n++]);return t.apply(this,i)}},C.bindAll=function(t){var e=c.call(arguments,1);if(0===e.length)throw new Error("bindAll must be passed function names");return P(e,function(e){t[e]=C.bind(t[e],t)}),t},C.memoize=function(t,e){var n={};return e||(e=C.identity),function(){var i=e.apply(this,arguments);return C.has(n,i)?n[i]:n[i]=t.apply(this,arguments)}},C.delay=function(t,e){var n=c.call(arguments,2);return setTimeout(function(){return t.apply(null,n)},e)},C.defer=function(t){return C.delay.apply(C,[t,1].concat(c.call(arguments,1)))},C.throttle=function(t,e,n){var i,r,o,s=null,a=0;n||(n={});var l=function(){a=n.leading===!1?0:C.now(),s=null,o=t.apply(i,r),i=r=null};return function(){var c=C.now();a||n.leading!==!1||(a=c);var u=e-(c-a);return i=this,r=arguments,0>=u?(clearTimeout(s),s=null,a=c,o=t.apply(i,r),i=r=null):s||n.trailing===!1||(s=setTimeout(l,u)),o}},C.debounce=function(t,e,n){var i,r,o,s,a,l=function(){var c=C.now()-s;e>c?i=setTimeout(l,e-c):(i=null,n||(a=t.apply(o,r),o=r=null))};return function(){o=this,r=arguments,s=C.now();var c=n&&!i;return i||(i=setTimeout(l,e)),c&&(a=t.apply(o,r),o=r=null),a}},C.once=function(t){var e,n=!1;return function(){return n?e:(n=!0,e=t.apply(this,arguments),t=null,e)}},C.wrap=function(t,e){return C.partial(e,t)},C.compose=function(){var t=arguments;return function(){for(var e=arguments,n=t.length-1;n>=0;n--)e=[t[n].apply(this,e)];return e[0]}},C.after=function(t,e){return function(){return--t<1?e.apply(this,arguments):void 0}},C.keys=function(t){if(!C.isObject(t))return[];if(k)return k(t);var e=[];for(var n in t)C.has(t,n)&&e.push(n);return e},C.values=function(t){for(var e=C.keys(t),n=e.length,i=new Array(n),r=0;n>r;r++)i[r]=t[e[r]];return i},C.pairs=function(t){for(var e=C.keys(t),n=e.length,i=new Array(n),r=0;n>r;r++)i[r]=[e[r],t[e[r]]];return i},C.invert=function(t){for(var e={},n=C.keys(t),i=0,r=n.length;r>i;i++)e[t[n[i]]]=n[i];return e},C.functions=C.methods=function(t){var e=[];for(var n in t)C.isFunction(t[n])&&e.push(n);return e.sort()},C.extend=function(t){return P(c.call(arguments,1),function(e){if(e)for(var n in e)t[n]=e[n]}),t},C.pick=function(t){var e={},n=u.apply(o,c.call(arguments,1));return P(n,function(n){n in t&&(e[n]=t[n])}),e},C.omit=function(t){var e={},n=u.apply(o,c.call(arguments,1));for(var i in t)C.contains(n,i)||(e[i]=t[i]);return e},C.defaults=function(t){return P(c.call(arguments,1),function(e){if(e)for(var n in e)void 0===t[n]&&(t[n]=e[n])}),t},C.clone=function(t){return C.isObject(t)?C.isArray(t)?t.slice():C.extend({},t):t},C.tap=function(t,e){return e(t),t};var L=function(t,e,n,i){if(t===e)return 0!==t||1/t==1/e;if(null==t||null==e)return t===e;t instanceof C&&(t=t._wrapped),e instanceof C&&(e=e._wrapped);var r=p.call(t);if(r!=p.call(e))return!1;switch(r){case"[object String]":return t==String(e);case"[object Number]":return t!=+t?e!=+e:0==t?1/t==1/e:t==+e;case"[object Date]":case"[object Boolean]":return+t==+e;case"[object RegExp]":return t.source==e.source&&t.global==e.global&&t.multiline==e.multiline&&t.ignoreCase==e.ignoreCase}if("object"!=typeof t||"object"!=typeof e)return!1;for(var o=n.length;o--;)if(n[o]==t)return i[o]==e;var s=t.constructor,a=e.constructor;if(s!==a&&!(C.isFunction(s)&&s instanceof s&&C.isFunction(a)&&a instanceof a)&&"constructor"in t&&"constructor"in e)return!1;n.push(t),i.push(e);var l=0,c=!0;if("[object Array]"==r){if(l=t.length,c=l==e.length)for(;l--&&(c=L(t[l],e[l],n,i)););}else{for(var u in t)if(C.has(t,u)&&(l++,!(c=C.has(e,u)&&L(t[u],e[u],n,i))))break;if(c){for(u in e)if(C.has(e,u)&&!l--)break;c=!l}}return n.pop(),i.pop(),c};C.isEqual=function(t,e){return L(t,e,[],[])},C.isEmpty=function(t){if(null==t)return!0;if(C.isArray(t)||C.isString(t))return 0===t.length;for(var e in t)if(C.has(t,e))return!1;return!0},C.isElement=function(t){return!(!t||1!==t.nodeType)},C.isArray=x||function(t){return"[object Array]"==p.call(t)},C.isObject=function(t){return t===Object(t)},P(["Arguments","Function","String","Number","Date","RegExp"],function(t){C["is"+t]=function(e){return p.call(e)=="[object "+t+"]"}}),C.isArguments(arguments)||(C.isArguments=function(t){return!(!t||!C.has(t,"callee"))}),"function"!=typeof/./&&(C.isFunction=function(t){return"function"==typeof t}),C.isFinite=function(t){return isFinite(t)&&!isNaN(parseFloat(t))},C.isNaN=function(t){return C.isNumber(t)&&t!=+t},C.isBoolean=function(t){return t===!0||t===!1||"[object Boolean]"==p.call(t)},C.isNull=function(t){return null===t},C.isUndefined=function(t){return void 0===t},C.has=function(t,e){return h.call(t,e)},C.noConflict=function(){return t._=i,this},C.identity=function(t){return t},C.constant=function(t){return function(){return t}},C.property=function(t){return function(e){return e[t]}},C.matches=function(t){return function(e){if(e===t)return!0;for(var n in t)if(t[n]!==e[n])return!1;return!0}},C.times=function(t,e,n){for(var i=Array(Math.max(0,t)),r=0;t>r;r++)i[r]=e.call(n,r);return i},C.random=function(t,e){return null==e&&(e=t,t=0),t+Math.floor(Math.random()*(e-t+1))},C.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=C.invert(T.escape);var I={escape:new RegExp("["+C.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+C.keys(T.unescape).join("|")+")","g")};C.each(["escape","unescape"],function(t){C[t]=function(e){return null==e?"":(""+e).replace(I[t],function(e){return T[t][e]})}}),C.result=function(t,e){if(null==t)return void 0;var n=t[e];return C.isFunction(n)?n.call(t):n},C.mixin=function(t){P(C.functions(t),function(e){var n=C[e]=t[e];C.prototype[e]=function(){var t=[this._wrapped];return l.apply(t,arguments),B.call(this,n.apply(C,t))}})};var H=0;C.uniqueId=function(t){var e=++H+"";return t?t+e:e},C.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var $=/(.)^/,D={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},M=/\\|'|\r|\n|\t|\u2028|\u2029/g;C.template=function(t,e,n){var i;n=C.defaults({},n,C.templateSettings);var r=new RegExp([(n.escape||$).source,(n.interpolate||$).source,(n.evaluate||$).source].join("|")+"|$","g"),o=0,s="__p+='";t.replace(r,function(e,n,i,r,a){return s+=t.slice(o,a).replace(M,function(t){return"\\"+D[t]}),n&&(s+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),i&&(s+="'+\n((__t=("+i+"))==null?'':__t)+\n'"),r&&(s+="';\n"+r+"\n__p+='"),o=a+e.length,e}),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{i=new Function(n.variable||"obj","_",s)}catch(a){throw a.source=s,a}if(e)return i(e,C);var l=function(t){return i.call(this,t,C)};return l.source="function("+(n.variable||"obj")+"){\n"+s+"}",l},C.chain=function(t){return C(t).chain()};var B=function(t){return this._chain?C(t).chain():t};C.mixin(C),P(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var e=o[t];C.prototype[t]=function(){var n=this._wrapped;return e.apply(n,arguments),"shift"!=t&&"splice"!=t||0!==n.length||delete n[0],B.call(this,n)}}),P(["concat","join","slice"],function(t){var e=o[t];C.prototype[t]=function(){return B.call(this,e.apply(this._wrapped,arguments))}}),C.extend(C.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return C})}).call(this)},{}],18:[function(t,e,n){var i=function(){function t(t){return null==t?String(t):W[Z.call(t)]||"object"}function e(e){return"function"==t(e)}function n(t){return null!=t&&t==t.window}function i(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function r(e){return"object"==t(e)}function o(t){return r(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype}function s(t){return"number"==typeof t.length}function a(t){return N.call(t,function(t){return null!=t})}function l(t){return t.length>0?k.fn.concat.apply([],t):t}function c(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function u(t){return t in R?R[t]:R[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function p(t,e){return"number"!=typeof e||L[c(t)]?e:e+"px"}function h(t){var e,n;return j[t]||(e=O.createElement(t),O.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),j[t]=n),j[t]}function f(t){return"children"in t?A.call(t.children):k.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function d(t,e,n){for(x in e)n&&(o(e[x])||X(e[x]))?(o(e[x])&&!o(t[x])&&(t[x]={}),X(e[x])&&!X(t[x])&&(t[x]=[]),d(t[x],e[x],n)):e[x]!==_&&(t[x]=e[x])}function g(t,e){return null==e?k(t):k(t).filter(e)}function m(t,n,i,r){return e(n)?n.call(t,i,r):n}function v(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function b(t,e){var n=t.className,i=n&&n.baseVal!==_;return e===_?i?n.baseVal:n:(i?n.baseVal=e:t.className=e,void 0)}function y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?k.parseJSON(t):t:e):t}catch(n){return t}}function w(t,e){e(t);for(var n in t.childNodes)w(t.childNodes[n],e)}var _,x,k,S,C,P,E=[],A=E.slice,N=E.filter,O=window.document,j={},R={},L={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},T=/^\s*<(\w+|!)[^>]*>/,I=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,H=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,$=/^(?:body|html)$/i,D=/([A-Z])/g,M=["val","css","html","text","data","width","height","offset"],B=["after","prepend","before","append"],z=O.createElement("table"),F=O.createElement("tr"),U={tr:O.createElement("tbody"),tbody:z,thead:z,tfoot:z,td:F,th:F,"*":O.createElement("div")},V=/complete|loaded|interactive/,q=/^[\w-]*$/,W={},Z=W.toString,J={},K=O.createElement("div"),G={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},X=Array.isArray||function(t){return t instanceof Array};return J.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=K).appendChild(t),i=~J.qsa(r,e).indexOf(t),o&&K.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return N.call(t,function(e,n){return t.indexOf(e)==n})},J.fragment=function(t,e,n){var i,r,s;return I.test(t)&&(i=k(O.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(H,"<$1></$2>")),e===_&&(e=T.test(t)&&RegExp.$1),e in U||(e="*"),s=U[e],s.innerHTML=""+t,i=k.each(A.call(s.childNodes),function(){s.removeChild(this)})),o(n)&&(r=k(i),k.each(n,function(t,e){M.indexOf(t)>-1?r[t](e):r.attr(t,e)})),i},J.Z=function(t,e){return t=t||[],t.__proto__=k.fn,t.selector=e||"",t},J.isZ=function(t){return t instanceof J.Z},J.init=function(t,n){var i;if(!t)return J.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&T.test(t))i=J.fragment(t,RegExp.$1,n),t=null;else{if(n!==_)return k(n).find(t);i=J.qsa(O,t)}else{if(e(t))return k(O).ready(t);if(J.isZ(t))return t;if(X(t))i=a(t);else if(r(t))i=[t],t=null;else if(T.test(t))i=J.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==_)return k(n).find(t);i=J.qsa(O,t)}}return J.Z(i,t)},k=function(t,e){return J.init(t,e)},k.extend=function(t){var e,n=A.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){d(t,n,e)}),t},J.qsa=function(t,e){var n,r="#"==e[0],o=!r&&"."==e[0],s=r||o?e.slice(1):e,a=q.test(s);return i(t)&&a&&r?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:A.call(a&&!r?o?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},k.contains=function(t,e){return t!==e&&t.contains(e)},k.type=t,k.isFunction=e,k.isWindow=n,k.isArray=X,k.isPlainObject=o,k.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},k.inArray=function(t,e,n){return E.indexOf.call(e,t,n)},k.camelCase=C,k.trim=function(t){return null==t?"":String.prototype.trim.call(t)},k.uuid=0,k.support={},k.expr={},k.map=function(t,e){var n,i,r,o=[];if(s(t))for(i=0;i<t.length;i++)n=e(t[i],i),null!=n&&o.push(n);else for(r in t)n=e(t[r],r),null!=n&&o.push(n);return l(o)},k.each=function(t,e){var n,i;if(s(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},k.grep=function(t,e){return N.call(t,e)},window.JSON&&(k.parseJSON=JSON.parse),k.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){W["[object "+e+"]"]=e.toLowerCase()}),k.fn={forEach:E.forEach,reduce:E.reduce,push:E.push,sort:E.sort,indexOf:E.indexOf,concat:E.concat,map:function(t){return k(k.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return k(A.apply(this,arguments))},ready:function(t){return V.test(O.readyState)&&O.body?t(k):O.addEventListener("DOMContentLoaded",function(){t(k)},!1),this},get:function(t){return t===_?A.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return E.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return e(t)?this.not(this.not(t)):k(N.call(this,function(e){return J.matches(e,t)}))},add:function(t,e){return k(P(this.concat(k(t,e))))},is:function(t){return this.length>0&&J.matches(this[0],t)},not:function(t){var n=[];if(e(t)&&t.call!==_)this.each(function(e){t.call(this,e)||n.push(this)});else{var i="string"==typeof t?this.filter(t):s(t)&&e(t.item)?A.call(t):k(t);this.forEach(function(t){i.indexOf(t)<0&&n.push(t)})}return k(n)},has:function(t){return this.filter(function(){return r(t)?k.contains(this,t):k(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!r(t)?t:k(t)},last:function(){var t=this[this.length-1];return t&&!r(t)?t:k(t)},find:function(t){var e,n=this;return e="object"==typeof t?k(t).filter(function(){var t=this;return E.some.call(n,function(e){return k.contains(e,t)})}):1==this.length?k(J.qsa(this[0],t)):this.map(function(){return J.qsa(this,t)})},closest:function(t,e){var n=this[0],r=!1;for("object"==typeof t&&(r=k(t));n&&!(r?r.indexOf(n)>=0:J.matches(n,t));)n=n!==e&&!i(n)&&n.parentNode;return k(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=k.map(n,function(t){return(t=t.parentNode)&&!i(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return g(e,t)},parent:function(t){return g(P(this.pluck("parentNode")),t)},children:function(t){return g(this.map(function(){return f(this)}),t)},contents:function(){return this.map(function(){return A.call(this.childNodes)})},siblings:function(t){return g(this.map(function(t,e){return N.call(f(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return k.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=h(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=e(t);if(this[0]&&!n)var i=k(t).get(0),r=i.parentNode||this.length>1;return this.each(function(e){k(this).wrapAll(n?t.call(this,e):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){k(this[0]).before(t=k(t));for(var e;(e=t.children()).length;)t=e.first();k(t).append(this)}return this},wrapInner:function(t){var n=e(t);return this.each(function(e){var i=k(this),r=i.contents(),o=n?t.call(this,e):t;r.length?r.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){k(this).replaceWith(k(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=k(this);(t===_?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return k(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return k(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var n=this.innerHTML;
k(this).empty().append(m(this,t,e,n))})},text:function(t){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=t===_?"":""+t})},attr:function(t,e){var n;return"string"==typeof t&&e===_?0==this.length||1!==this[0].nodeType?_:"value"==t&&"INPUT"==this[0].nodeName?this.val():!(n=this[0].getAttribute(t))&&t in this[0]?this[0][t]:n:this.each(function(n){if(1===this.nodeType)if(r(t))for(x in t)v(this,x,t[x]);else v(this,t,m(this,e,n,this.getAttribute(t)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&v(this,t)})},prop:function(t,e){return t=G[t]||t,e===_?this[0]&&this[0][t]:this.each(function(n){this[t]=m(this,e,n,this[t])})},data:function(t,e){var n=this.attr("data-"+t.replace(D,"-$1").toLowerCase(),e);return null!==n?y(n):_},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?k(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=m(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var n=k(this),i=m(this,t,e,n.offset()),r=n.offsetParent().offset(),o={top:i.top-r.top,left:i.left-r.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(e,n){if(arguments.length<2){var i=this[0],r=getComputedStyle(i,"");if(!i)return;if("string"==typeof e)return i.style[C(e)]||r.getPropertyValue(e);if(X(e)){var o={};return k.each(X(e)?e:[e],function(t,e){o[e]=i.style[C(e)]||r.getPropertyValue(e)}),o}}var s="";if("string"==t(e))n||0===n?s=c(e)+":"+p(e,n):this.each(function(){this.style.removeProperty(c(e))});else for(x in e)e[x]||0===e[x]?s+=c(x)+":"+p(x,e[x])+";":this.each(function(){this.style.removeProperty(c(x))});return this.each(function(){this.style.cssText+=";"+s})},index:function(t){return t?this.indexOf(k(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?E.some.call(this,function(t){return this.test(b(t))},u(t)):!1},addClass:function(t){return t?this.each(function(e){S=[];var n=b(this),i=m(this,t,e,n);i.split(/\s+/g).forEach(function(t){k(this).hasClass(t)||S.push(t)},this),S.length&&b(this,n+(n?" ":"")+S.join(" "))}):this},removeClass:function(t){return this.each(function(e){return t===_?b(this,""):(S=b(this),m(this,t,e,S).split(/\s+/g).forEach(function(t){S=S.replace(u(t)," ")}),b(this,S.trim()),void 0)})},toggleClass:function(t,e){return t?this.each(function(n){var i=k(this),r=m(this,t,n,b(this));r.split(/\s+/g).forEach(function(t){(e===_?!i.hasClass(t):e)?i.addClass(t):i.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===_?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===_?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=$.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(k(t).css("margin-top"))||0,n.left-=parseFloat(k(t).css("margin-left"))||0,i.top+=parseFloat(k(e[0]).css("border-top-width"))||0,i.left+=parseFloat(k(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||O.body;t&&!$.test(t.nodeName)&&"static"==k(t).css("position");)t=t.offsetParent;return t})}},k.fn.detach=k.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});k.fn[t]=function(r){var o,s=this[0];return r===_?n(s)?s["inner"+e]:i(s)?s.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){s=k(this),s.css(t,m(this,r,e,s[t]()))})}}),B.forEach(function(e,n){var i=n%2;k.fn[e]=function(){var e,r,o=k.map(arguments,function(n){return e=t(n),"object"==e||"array"==e||null==n?n:J.fragment(n)}),s=this.length>1;return o.length<1?this:this.each(function(t,e){r=i?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null,o.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!r)return k(t).remove();w(r.insertBefore(t,e),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},k.fn[i?e+"To":"insert"+(n?"Before":"After")]=function(t){return k(t)[e](this),this}}),J.Z.prototype=k.fn,J.uniq=P,J.deserializeValue=y,k.zepto=J,k}();n.$=n.Zepto=i,function(t){function e(t){return t._zid||(t._zid=h++)}function n(t,n,o,s){if(n=i(n),n.ns)var a=r(n.ns);return(m[e(t)]||[]).filter(function(t){return!(!t||n.e&&t.e!=n.e||n.ns&&!a.test(t.ns)||o&&e(t.fn)!==e(o)||s&&t.sel!=s)})}function i(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function r(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,e){return t.del&&!b&&t.e in y||!!e}function s(t){return w[t]||b&&y[t]||t}function a(n,r,a,l,u,h,f){var d=e(n),g=m[d]||(m[d]=[]);r.split(/\s/).forEach(function(e){if("ready"==e)return t(document).ready(a);var r=i(e);r.fn=a,r.sel=u,r.e in w&&(a=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?r.fn.apply(this,arguments):void 0}),r.del=h;var d=h||a;r.proxy=function(t){if(t=c(t),!t.isImmediatePropagationStopped()){t.data=l;var e=d.apply(n,t._args==p?[t]:[t].concat(t._args));return e===!1&&(t.preventDefault(),t.stopPropagation()),e}},r.i=g.length,g.push(r),"addEventListener"in n&&n.addEventListener(s(r.e),r.proxy,o(r,f))})}function l(t,i,r,a,l){var c=e(t);(i||"").split(/\s/).forEach(function(e){n(t,e,r,a).forEach(function(e){delete m[c][e.i],"removeEventListener"in t&&t.removeEventListener(s(e.e),e.proxy,o(e,l))})})}function c(e,n){return(n||!e.isDefaultPrevented)&&(n||(n=e),t.each(S,function(t,i){var r=n[t];e[t]=function(){return this[i]=_,r&&r.apply(n,arguments)},e[i]=x}),(n.defaultPrevented!==p?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=_)),e}function u(t){var e,n={originalEvent:t};for(e in t)k.test(e)||t[e]===p||(n[e]=t[e]);return c(n,t)}var p,h=1,f=Array.prototype.slice,d=t.isFunction,g=function(t){return"string"==typeof t},m={},v={},b="onfocusin"in window,y={focus:"focusin",blur:"focusout"},w={mouseenter:"mouseover",mouseleave:"mouseout"};v.click=v.mousedown=v.mouseup=v.mousemove="MouseEvents",t.event={add:a,remove:l},t.proxy=function(n,i){if(d(n)){var r=function(){return n.apply(i,arguments)};return r._zid=e(n),r}if(g(i))return t.proxy(n[i],n);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var _=function(){return!0},x=function(){return!1},k=/^([A-Z]|returnValue$|layer[XY]$)/,S={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,n,i,r,o){var s,c,h=this;return e&&!g(e)?(t.each(e,function(t,e){h.on(t,n,i,e,o)}),h):(g(n)||d(r)||r===!1||(r=i,i=n,n=p),(d(i)||i===!1)&&(r=i,i=p),r===!1&&(r=x),h.each(function(p,h){o&&(s=function(t){return l(h,t.type,r),r.apply(this,arguments)}),n&&(c=function(e){var i,o=t(e.target).closest(n,h).get(0);return o&&o!==h?(i=t.extend(u(e),{currentTarget:o,liveFired:h}),(s||r).apply(o,[i].concat(f.call(arguments,1)))):void 0}),a(h,e,r,i,n,c||s)}))},t.fn.off=function(e,n,i){var r=this;return e&&!g(e)?(t.each(e,function(t,e){r.off(t,n,e)}),r):(g(n)||d(i)||i===!1||(i=n,n=p),i===!1&&(i=x),r.each(function(){l(this,e,i,n)}))},t.fn.trigger=function(e,n){return e=g(e)||t.isPlainObject(e)?t.Event(e):c(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,i){var r,o;return this.each(function(s,a){r=u(g(e)?t.Event(e):e),r._args=i,r.target=a,t.each(n(a,e.type||e),function(t,e){return o=e.proxy(r),r.isImmediatePropagationStopped()?!1:void 0})}),o},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){g(t)||(e=t,t=e.type);var n=document.createEvent(v[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),c(n)}}(i),function(t){function e(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function n(t,n,i,r){return t.global?e(n||b,i,r):void 0}function i(e){e.global&&0===t.active++&&n(e,null,"ajaxStart")}function r(e){e.global&&!--t.active&&n(e,null,"ajaxStop")}function o(t,e){var i=e.context;return e.beforeSend.call(i,t,e)===!1||n(e,i,"ajaxBeforeSend",[t,e])===!1?!1:(n(e,i,"ajaxSend",[t,e]),void 0)}function s(t,e,i,r){var o=i.context,s="success";i.success.call(o,t,s,e),r&&r.resolveWith(o,[t,s,e]),n(i,o,"ajaxSuccess",[e,i,t]),l(s,e,i)}function a(t,e,i,r,o){var s=r.context;r.error.call(s,i,e,t),o&&o.rejectWith(s,[i,e,t]),n(r,s,"ajaxError",[i,r,t||e]),l(e,i,r)}function l(t,e,i){var o=i.context;i.complete.call(o,e,t),n(i,o,"ajaxComplete",[e,i]),r(i)}function c(){}function u(t){return t&&(t=t.split(";",2)[0]),t&&(t==k?"html":t==x?"json":w.test(t)?"script":_.test(t)&&"xml")||"text"}function p(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function h(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=p(e.url,e.data),e.data=void 0)}function f(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function d(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,l){o=t.type(l),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(l.name,l.value):"array"==o||!i&&"object"==o?d(e,l,i,n):e.add(n,l)})}var g,m,v=0,b=window.document,y=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,w=/^(?:text|application)\/javascript/i,_=/^(?:text|application)\/xml/i,x="application/json",k="text/html",S=/^\s*$/;t.active=0,t.ajaxJSONP=function(e,n){if(!("type"in e))return t.ajax(e);var i,r,l=e.jsonpCallback,c=(t.isFunction(l)?l():l)||"jsonp"+ ++v,u=b.createElement("script"),p=window[c],h=function(e){t(u).triggerHandler("error",e||"abort")},f={abort:h};return n&&n.promise(f),t(u).on("load error",function(o,l){clearTimeout(r),t(u).off().remove(),"error"!=o.type&&i?s(i[0],f,e,n):a(null,l||"error",f,e,n),window[c]=p,i&&t.isFunction(p)&&p(i[0]),p=i=void 0}),o(f,e)===!1?(h("abort"),f):(window[c]=function(){i=arguments},u.src=e.url.replace(/\?(.+)=\?/,"?$1="+c),b.head.appendChild(u),e.timeout>0&&(r=setTimeout(function(){h("timeout")},e.timeout)),f)},t.ajaxSettings={type:"GET",beforeSend:c,success:c,error:c,complete:c,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:x,xml:"application/xml, text/xml",html:k,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),r=t.Deferred&&t.Deferred();for(g in t.ajaxSettings)void 0===n[g]&&(n[g]=t.ajaxSettings[g]);i(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),h(n),n.cache===!1&&(n.url=p(n.url,"_="+Date.now()));var l=n.dataType,f=/\?.+=\?/.test(n.url);if("jsonp"==l||f)return f||(n.url=p(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,r);var d,v=n.accepts[l],b={},y=function(t,e){b[t.toLowerCase()]=[t,e]},w=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,_=n.xhr(),x=_.setRequestHeader;if(r&&r.promise(_),n.crossDomain||y("X-Requested-With","XMLHttpRequest"),y("Accept",v||"*/*"),(v=n.mimeType||v)&&(v.indexOf(",")>-1&&(v=v.split(",",2)[0]),_.overrideMimeType&&_.overrideMimeType(v)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&y("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(m in n.headers)y(m,n.headers[m]);if(_.setRequestHeader=y,_.onreadystatechange=function(){if(4==_.readyState){_.onreadystatechange=c,clearTimeout(d);var e,i=!1;if(_.status>=200&&_.status<300||304==_.status||0==_.status&&"file:"==w){l=l||u(n.mimeType||_.getResponseHeader("content-type")),e=_.responseText;try{"script"==l?(1,eval)(e):"xml"==l?e=_.responseXML:"json"==l&&(e=S.test(e)?null:t.parseJSON(e))}catch(o){i=o}i?a(i,"parsererror",_,n,r):s(e,_,n,r)}else a(_.statusText||null,_.status?"error":"abort",_,n,r)}},o(_,n)===!1)return _.abort(),a(null,"abort",_,n,r),_;if(n.xhrFields)for(m in n.xhrFields)_[m]=n.xhrFields[m];var k="async"in n?n.async:!0;_.open(n.type,n.url,k,n.username,n.password);for(m in b)x.apply(_,b[m]);return n.timeout>0&&(d=setTimeout(function(){_.onreadystatechange=c,_.abort(),a(null,"timeout",_,n,r)},n.timeout)),_.send(n.data?n.data:null),_},t.get=function(){return t.ajax(f.apply(null,arguments))},t.post=function(){var e=f.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=f.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var r,o=this,s=e.split(/\s/),a=f(e,n,i),l=a.success;return s.length>1&&(a.url=s[0],r=s[1]),a.success=function(e){o.html(r?t("<div>").html(e.replace(y,"")).find(r):e),l&&l.apply(o,arguments)},t.ajax(a),this};var C=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(C(t)+"="+C(e))},d(n,t,e),n.join("&").replace(/%20/g,"+")}}(i),function(t){t.fn.serializeArray=function(){var e,n=[];return t([].slice.call(this.get(0).elements)).each(function(){e=t(this);var i=e.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&("radio"!=i&&"checkbox"!=i||this.checked)&&n.push({name:e.attr("name"),value:e.val()})}),n},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(i),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(i)},{}]},{},[1]);
=======
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $, Button, Colors, IframeClick, IframeResizer, Popup, SubscribeButton, Translations, Utils, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$ = require('../../vendor/zepto-browserify.js').Zepto;

_ = require('../../vendor/underscore-min.js');

Button = require('./button.coffee');

Popup = require('./popup.coffee');

Utils = require('./utils.coffee');

IframeResizer = require('./iframe_resizer.coffee');

IframeClick = require('./iframe_click.coffee');

Colors = require('./colors.coffee');

Translations = require('./translations.coffee');

SubscribeButton = (function() {
  SubscribeButton.init = function(selector) {
    var elem, elems, i, len, subscribeButtons;
    if (selector == null) {
      selector = '.podlove-subscribe-button';
    }
    subscribeButtons = [];
    elems = $(selector);
    if (elems.length === 0) {
      return;
    }
    for (i = 0, len = elems.length; i < len; i++) {
      elem = elems[i];
      subscribeButtons.push(new SubscribeButton(elem));
    }
    return window.subscribeButtons = subscribeButtons;
  };

  function SubscribeButton(scriptElem) {
    this.openPopup = bind(this.openPopup, this);
    this.scriptElem = $(scriptElem);
    this.getOptions();
    this.checkForValidLanguage();
    this.getPodcastData();
    this.checkIntegrity();
    this.addCss();
    this.renderButtonIframe();
    return this;
  }

  SubscribeButton.prototype.update = function() {
    return this.getPodcastData();
  };

  SubscribeButton.prototype.getOptions = function() {
    var defaultOptions, options;
    defaultOptions = {
      size: 'medium',
      style: 'filled',
      format: 'rectangle'
    };
    options = {
      scriptPath: this.scriptElem.attr('src').match(/(^.*\/)/)[0].replace(/javascripts\/$/, '').replace(/\/$/, ''),
      language: this.scriptElem.data('language'),
      size: this.scriptElem.data('size'),
      buttonId: this.scriptElem.data('buttonid'),
      hide: this.scriptElem.data('hide'),
      style: this.scriptElem.data('style'),
      format: this.scriptElem.data('format')
    };
    if (this.scriptElem.data('color')) {
      options.color = new Colors(this.scriptElem.data('color'));
    } else {
      options.color = new Colors(this.scriptElem.data('colors'));
    }
    if (options.size.indexOf('-logo') >= 0) {
      options.size = options.size.replace('-logo', '');
      options.format = 'cover';
    }
    return this.options = $.extend(defaultOptions, options);
  };

  SubscribeButton.prototype.checkForValidLanguage = function() {
    var translations;
    translations = new Translations(this.options.language);
    if (!translations.supportsLanguage()) {
      return this.options.language = Translations.defaultLanguage;
    }
  };

  SubscribeButton.prototype.getPodcastData = function() {
    var dataSource, jsonUrl;
    if (jsonUrl = this.scriptElem.data('json-url')) {
      this.fetchPodcastDataFromUrl(jsonUrl);
    }
    if (dataSource = this.scriptElem.data('json-data')) {
      return this.extractPodcastDataFromJson(window[dataSource]);
    }
  };

  SubscribeButton.prototype.fetchPodcastDataFromUrl = function() {};

  SubscribeButton.prototype.extractPodcastDataFromJson = function(data) {
    return this.podcast = data;
  };

  SubscribeButton.prototype.checkIntegrity = function() {
    var text;
    if (this.podcast.feeds.length === 0) {
      text = "Subscribe Button Error. Please add at least one feed.";
      console.warn(text);
      return window.alert(text);
    }
  };

  SubscribeButton.prototype.renderButtonIframe = function() {
    var iframe;
    iframe = this.iframe();
    if (this.options.hide) {
      $(iframe).hide();
    }
    return this.scriptElem.replaceWith(iframe);
  };

  SubscribeButton.prototype.addCss = function() {
    var link;
    link = $("<link rel='stylesheet' href='" + this.options.scriptPath + "/stylesheets/app.css'></script>");
    this.scriptElem.after(link);
    return link.after(this.options.color.toStyles());
  };

  SubscribeButton.prototype.iframe = function() {
    var buttonUrl, iframe, podcastTitle;
    this.options.id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    podcastTitle = escape(this.podcast.title);
    buttonUrl = this.options.scriptPath + "/button.html?id=" + this.options.id + "&language=" + this.options.language + "&size=" + this.options.size + "&style=" + this.options.style + "&format=" + this.options.format + "&podcastTitle=" + podcastTitle + "&podcastCover=" + this.podcast.cover + (this.options.color.toParams());
    iframe = $('<iframe>').attr('src', encodeURI(buttonUrl)).attr('id', this.options.id).addClass('podlove-subscribe-button-iframe').css({
      border: 'none',
      display: 'inline-block',
      overflow: 'hidden'
    });
    IframeResizer.listen('resizeButton', iframe);
    IframeClick.listen(iframe, this.openPopup, this.options);
    if (this.options.buttonId) {
      $(".podlove-subscribe-button-" + this.options.buttonId).on('click', (function(_this) {
        return function() {
          return _this.openPopup(_this.options);
        };
      })(this));
    }
    return iframe;
  };

  SubscribeButton.prototype.openPopup = function(options) {
    return new Popup(this.podcast, options);
  };

  return SubscribeButton;

})();

window.SubscribeButton = SubscribeButton;

window.Button = Button;

$(function() {
  return SubscribeButton.init();
});



},{"../../vendor/underscore-min.js":17,"../../vendor/zepto-browserify.js":18,"./button.coffee":2,"./colors.coffee":5,"./iframe_click.coffee":7,"./iframe_resizer.coffee":8,"./popup.coffee":11,"./translations.coffee":12,"./utils.coffee":14}],2:[function(require,module,exports){
var $, Button, Colors, Translations, Utils;

$ = require('../../vendor/zepto-browserify.js').Zepto;

Utils = require('./utils.coffee');

Translations = require('./translations.coffee');

Colors = require('./colors.coffee');

Button = (function() {
  function Button() {
    this.getOptions();
    this.I18n = new Translations(this.options.language);
    this.elem = $('#podlove-subscribe-button');
    if (/auto/.test(this.options.size)) {
      this.autoSize = true;
    }
    this.addFormat();
    this.addStyle();
    this.render();
    window.setTimeout((function(_this) {
      return function() {
        return _this.resizeIframe();
      };
    })(this), 10);
  }

  Button.prototype.render = function() {
    var image;
    this.elem.addClass(this.options.size.replace('%20', ' '));
    this.elem.prop('title', this.I18n.t('button'));
    this.elem.on('click', (function(_this) {
      return function(event) {
        return window.parent.postMessage("clicked_" + _this.options.id, '*');
      };
    })(this));
    if (this.buttonHtml) {
      this.elem.html(this.buttonHtml);
    }
    if (this.logoElem) {
      image = "<img src='" + this.options.podcastCover + "' alt='Logo of " + this.options.podcastTitle + "'>";
      this.logoElem.html(image);
      this.logoElem.on('click', (function(_this) {
        return function(event) {
          return window.parent.postMessage("clicked_" + _this.options.id, '*');
        };
      })(this));
    }
    return this.setColors();
  };

  Button.prototype.setColors = function() {
    var colors;
    colors = Colors.fromParams(this.options);
    return this.elem.after(colors.toStyles());
  };

  Button.prototype.getOptions = function() {
    return this.options = Utils.locationToOptions(window.location.search);
  };

  Button.prototype.addFormat = function() {
    if (this.options.format !== 'square') {
      this.buttonHtml = "<span>" + (this.I18n.t('button')) + "</span>";
    } else if (this.options.format === 'square') {
      this.elem.addClass('square');
    }
    if (this.options.format === 'cover') {
      return this.logoElem = $('#podlove-subscribe-button-logo');
    }
  };

  Button.prototype.addStyle = function() {
    if (this.options.style === 'frameless') {
      return this.elem.addClass('frameless');
    } else if (this.options.style === 'outline') {
      return this.elem.addClass('outline');
    }
  };

  Button.prototype.resizeIframe = function() {
    var height, img, resize, showImage, width;
    resize = (function(_this) {
      return function(height, width) {
        var resizeData;
        resizeData = JSON.stringify({
          id: _this.options.id,
          listenTo: 'resizeButton',
          height: height,
          width: width
        });
        return window.parent.postMessage(resizeData, '*');
      };
    })(this);
    height = this.elem.height();
    width = this.autoSize && !this.logoElem ? '100%' : this.elem.width();
    if (this.logoElem) {
      img = this.logoElem.find('img');
      showImage = (function(_this) {
        return function() {
          _this.logoElem.height(width);
          height += width;
          _this.logoElem.show();
          return resize(height, width);
        };
      })(this);
      if (!img[0].complete) {
        return img.on('load', showImage);
      } else {
        return showImage();
      }
    } else {
      return resize(height, width);
    }
  };

  return Button;

})();

module.exports = Button;



},{"../../vendor/zepto-browserify.js":18,"./colors.coffee":5,"./translations.coffee":12,"./utils.coffee":14}],3:[function(require,module,exports){
var Clients;

Clients = (function() {
  function Clients(platform, osDefault) {
    if (osDefault == null) {
      osDefault = false;
    }
    if (osDefault) {
      return this['os_defaults'][platform];
    }
    return this[platform];
  }

  Clients.prototype.printClientList = function() {
    var i, item, j, len, len1, platform, ref, ref1, results, url;
    ref = ['Android', 'Cloud', 'iOS', 'Linux', 'OSX', 'WindowsPhone', 'Windows7', 'Windows8', 'Windows81'];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      platform = ref[i];
      console.log("### " + platform);
      ref1 = this[platform.toLowerCase()];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        item = ref1[j];
        url = item.register || item.store || item.install;
        console.log("  * [" + item.title + "](" + url + ")");
      }
      results.push(console.log(""));
    }
    return results;
  };

  Clients.prototype.rss = {
    title: 'Other (Feed URL)',
    icon: 'generic/rss.png'
  };

  Clients.prototype.os_defaults = {
    android: {
      scheme: 'pcast:',
      icon: 'generic/android.png'
    },
    windows8: {
      scheme: 'pcast:',
      icon: 'generic/windows8.png'
    },
    windowsphone: {
      scheme: 'pcast:',
      icon: 'generic/windowsphone.png'
    }
  };

  Clients.prototype.cloud = [
    {
      title: 'gpodder.net',
      scheme: 'http://gpodder.net/subscribe?url=',
      icon: 'cloud/gpoddernet.png',
      register: 'https://gpodder.net/',
      http: true
    }, {
      title: 'Player.fm',
      scheme: 'https://player.fm/subscribe?id=',
      icon: 'cloud/playerfm.png',
      register: 'https://player.fm/',
      http: true
    }, {
      title: 'Pocket Casts',
      scheme: 'http://pcasts.in/feed/',
      icon: 'cloud/pocketcasts.png',
      register: 'https://play.pocketcasts.com/',
      http: false
    }
  ];

  Clients.prototype.android = [
    {
      title: 'AntennaPod',
      scheme: 'antennapod-subscribe://',
      icon: 'android/antennapod.png',
      store: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod'
    }, {
      title: 'BeyondPod',
      scheme: 'beyondpod://',
      icon: 'android/beyondpod.png',
      store: 'https://play.google.com/store/apps/details?id=mobi.beyondpod'
    }, {
      title: 'Player.fm',
      scheme: 'https://player.fm/subscribe?id=',
      icon: 'android/playerfm.png',
      store: 'https://play.google.com/store/apps/details?id=fm.player'
    }, {
      title: 'Podcast Addict',
      scheme: 'podcastaddict://',
      icon: 'android/podcastaddict.png',
      store: 'https://play.google.com/store/apps/details?id=com.bambuna.podcastaddict'
    }, {
      title: 'Podcatcher Deluxe',
      scheme: 'pcd://',
      icon: 'android/podcatcher-deluxe.png',
      store: 'https://play.google.com/store/search?q=pub:Kevin%20Hausmann'
    }, {
      title: 'Podkicker',
      scheme: 'podkicker://subscribe/',
      icon: 'android/podkicker.png',
      store: 'https://play.google.com/store/apps/details?id=ait.podka'
    }, {
      title: 'uPod',
      scheme: 'upod://',
      icon: 'android/upod.png',
      store: 'https://play.google.com/store/apps/details?id=mobi.upod.app'
    }
  ];

  Clients.prototype.ios = [
    {
      title: 'Castro',
      scheme: 'castro://subscribe/',
      icon: 'ios/castro.png',
      store: 'https://itunes.apple.com/de/app/castro-high-fidelity-podcasts/id723142770'
    }, {
      title: 'Downcast',
      scheme: 'downcast://',
      icon: 'ios/downcast.png',
      store: 'https://itunes.apple.com/de/app/downcast/id393858566'
    }, {
      title: 'iCatcher',
      scheme: 'icatcher://',
      icon: 'ios/icatcher.png',
      store: 'https://itunes.apple.com/de/app/icatcher!-podcast-app/id414419105'
    }, {
      title: 'Instacast',
      scheme: 'instacast://',
      icon: 'ios/instacast.png'
    }, {
      title: 'Overcast',
      scheme: 'overcast://x-callback-url/add?url=',
      icon: 'ios/overcast.png',
      store: 'https://itunes.apple.com/de/app/overcast-podcast-player/id888422857'
    }, {
      title: 'PocketCasts',
      scheme: 'pktc://subscribe/',
      icon: 'ios/pocketcasts.png',
      store: 'https://itunes.apple.com/de/app/pocket-casts/id414834813'
    }, {
      title: 'Podcasts',
      scheme: 'pcast://',
      icon: 'ios/podcasts.png',
      store: 'https://itunes.apple.com/de/app/podcasts/id525463029'
    }, {
      title: 'Podcat',
      scheme: 'podcat://',
      icon: 'ios/podcat.png',
      store: 'https://itunes.apple.com/app/podcat/id845960230'
    }, {
      title: 'PodGrasp',
      scheme: 'podgrasp://subscribe/',
      icon: 'ios/podgrasp.png',
      store: 'https://itunes.apple.com/de/app/podgrasp-podcast-player/id531648276'
    }, {
      title: 'RSSRadio',
      scheme: 'rssradio://',
      icon: 'ios/rssradio.png',
      store: 'https://itunes.apple.com/app/rssradio-premium-podcast-downloader/id679025359'
    }
  ];

  Clients.prototype.linux = [
    {
      title: 'Clementine',
      scheme: 'itpc://',
      icon: 'linux/clementine.png'
    }, {
      title: 'gPodder',
      scheme: 'gpodder://',
      icon: 'linux/gpodder.png',
      install: 'http://gpodder.org/downloads'
    }
  ];

  Clients.prototype.osx = [
    {
      title: 'Downcast',
      scheme: 'downcast://',
      icon: 'osx/downcast.png',
      store: 'https://itunes.apple.com/de/app/downcast/id668429425?mt=12&uo=4'
    }, {
      title: 'Instacast',
      scheme: 'instacast://',
      icon: 'osx/instacast.png'
    }, {
      title: 'iTunes',
      scheme: 'itpc://',
      icon: 'osx/itunes.png',
      install: 'http://www.apple.com/itunes/',
      customFeedType: 'itunes'
    }, {
      title: 'PodGrasp',
      scheme: 'podgrasp://subscribe/',
      icon: 'osx/podgrasp.png',
      store: 'https://itunes.apple.com/de/app/podgrasp-podcast-player/id530928805'
    }
  ];

  Clients.prototype.windowsphone = [
    {
      title: 'BringCast',
      scheme: 'bringcast://subscribe/',
      icon: 'windowsphone/bringcast.png',
      store: 'http://windowsphone.com/s?appId=e5abef38-d413-e011-9264-00237de2db9e'
    }, {
      title: 'gramocast',
      scheme: 'gramocast://subscribe/',
      icon: 'windowsphone/gramocast.png',
      store: 'http://windowsphone.com/s?appId=ebb52054-5071-4aa4-9537-00399d06a99e'
    }, {
      title: 'Podcast Lounge',
      scheme: 'podcastlounge://subscribe/',
      icon: 'windowsphone/podcastlounge.png',
      store: 'http://windowsphone.com/s?appId=83bc0329-8e02-410e-b6d2-da3c0c1d971d'
    }, {
      title: 'Podcast Picker',
      scheme: 'podcastpicker://',
      icon: 'windowsphone/podcastpicker.png',
      store: 'http://windowsphone.com/s?appId=79b72069-b656-47d2-bab1-fa2d4061825e'
    }, {
      title: 'Podcasts',
      scheme: 'podcast:',
      icon: 'windowsphone/podcasts.png'
    }
  ];

  Clients.prototype.windows7 = [
    {
      title: 'gPodder',
      scheme: 'gpodder://',
      icon: 'windows/gpodder.png',
      install: 'http://gpodder.org/downloads'
    }, {
      title: 'iTunes',
      scheme: 'itpc://',
      icon: 'osx/itunes.png',
      install: 'http://www.apple.com/itunes/',
      customFeedType: 'itunes-url'
    }
  ];

  Clients.prototype.windows8 = [
    {
      title: 'gPodder',
      scheme: 'gpodder://',
      icon: 'windows/gpodder.png',
      install: 'http://gpodder.org/downloads'
    }, {
      title: 'iTunes',
      scheme: 'itpc://',
      icon: 'osx/itunes.png',
      install: 'http://www.apple.com/itunes/',
      customFeedType: 'itunes-url'
    }, {
      title: 'Podscout',
      scheme: 'podscout://',
      icon: 'windows/podscout.png',
      store: 'http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17'
    }
  ];

  Clients.prototype.windows81 = [
    {
      title: 'gPodder',
      scheme: 'gpodder://',
      icon: 'windows/gpodder.png',
      install: 'http://gpodder.org/downloads'
    }, {
      title: 'iTunes',
      scheme: 'itpc://',
      icon: 'osx/itunes.png',
      install: 'http://www.apple.com/itunes/',
      customFeedType: 'itunes-url'
    }, {
      title: 'Podscout',
      scheme: 'podscout://',
      icon: 'windows/podscout.png',
      store: 'http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17'
    }
  ];

  Clients.prototype.windows10 = [
    {
      title: 'gPodder',
      scheme: 'gpodder://',
      icon: 'windows/gpodder.png',
      install: 'http://gpodder.org/downloads'
    }, {
      title: 'iTunes',
      scheme: 'itpc://',
      icon: 'osx/itunes.png',
      install: 'http://www.apple.com/itunes/',
      customFeedType: 'itunes-url'
    }, {
      title: 'Podscout',
      scheme: 'podscout://',
      icon: 'windows/podscout.png',
      store: 'http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17'
    }
  ];

  Clients.prototype.blackBerry = [];

  return Clients;

})();

module.exports = Clients;



},{}],4:[function(require,module,exports){
var $, Clients, ClientsPanel, Handlebars, Panel, Utils, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('../../vendor/zepto-browserify.js').Zepto;

Handlebars = require('../../vendor/handlebars.min.js').Handlebars;

_ = require('../../vendor/underscore-min.js');

Utils = require('./utils.coffee');

Clients = require('./clients.coffee');

Panel = require('./panel.coffee');

ClientsPanel = (function(superClass) {
  extend(ClientsPanel, superClass);

  function ClientsPanel(container, parent) {
    var text;
    this.container = container;
    this.parent = parent;
    this.findCustomFeed = bind(this.findCustomFeed, this);
    this.podcast = this.parent.podcast;
    this.platform = this.parent.platform;
    this.clients = new Clients(this.platform);
    this.osDefault = new Clients(this.platform, true);
    this.cloudClients = new Clients('cloud');
    if (this.prepareClients(this.parent.options.scriptPath)) {
      this.render();
    } else {
      text = 'No usable feed found. Please add at least one feed.';
      console.warn(text);
    }
  }

  ClientsPanel.prototype.context = function() {
    return {
      cover: this.podcast.cover,
      title: this.podcast.title,
      subtitle: this.podcast.subtitle,
      clients: this.clients,
      platform: this.platform,
      otherClient: this.otherClient,
      cloudClients: this.cloudClients,
      osDefault: this.osDefault,
      scriptPath: this.parent.options.scriptPath,
      podcastTitle: this.podcast.title,
      podcastSubtitle: this.podcast.subtitle,
      podcastCover: this.podcast.cover
    };
  };

  ClientsPanel.prototype.detectBestFormat = function() {
    var capabilities;
    capabilities = this.platform === 'android' ? ['mp3', 'aac', 'ogg', 'opus'] : ['aac', 'mp3', 'ogg', 'opus'];
    return _(capabilities).find((function(_this) {
      return function(cap) {
        return _(_this.podcast.feeds).findWhere({
          format: cap
        });
      };
    })(this));
  };

  ClientsPanel.prototype.chooseFeed = function() {
    var feed, format;
    format = this.detectBestFormat();
    return feed = _(this.podcast.feeds).findWhere({
      format: format
    });
  };

  ClientsPanel.prototype.findCustomFeed = function(type) {
    return (_(this.podcast.feeds).findWhere({
      type: type
    }) || {}).url;
  };

  ClientsPanel.prototype.prepareClients = function(pathPrefix) {
    var client, cloudFeedUrl, customUrl, feed, feedUrlWithOutHttp, i, j, len, len1, ref, ref1, standardUrl, type;
    feed = this.chooseFeed() || {};
    feedUrlWithOutHttp = feed.url.replace(/^(http|https):\/\//, '');
    if (!feed.url) {
      return false;
    }
    ref = this.clients;
    for (i = 0, len = ref.length; i < len; i++) {
      client = ref[i];
      Utils.fixIconPath(client, pathPrefix);
      standardUrl = "" + client.scheme + feedUrlWithOutHttp;
      client.url = (type = client.customFeedType) ? (customUrl = feed["directory-url-" + type]) ? customUrl : standardUrl : standardUrl;
    }
    _(this.clients).shuffle();
    ref1 = this.cloudClients;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      client = ref1[j];
      Utils.fixIconPath(client, pathPrefix);
      cloudFeedUrl = client.http ? feed.url : feedUrlWithOutHttp;
      if (client.post) {
        client.url = client.scheme;
        client.feedUrl = cloudFeedUrl;
      } else {
        client.url = "" + client.scheme + cloudFeedUrl;
      }
    }
    _(this.cloudClients).shuffle();
    Utils.fixIconPath(this.osDefault, pathPrefix);
    this.osDefault.title = 'Let device decide';
    this.osDefault.originalUrl = feed.url;
    if (this.osDefault.scheme !== null) {
      this.osDefault.url = "" + this.osDefault.scheme + feedUrlWithOutHttp;
      this.osDefault.scheme = null;
    }
    this.otherClient = new Clients('rss');
    Utils.fixIconPath(this.otherClient, pathPrefix);
    return this.otherClient.originalUrl = feed.url;
  };

  ClientsPanel.prototype.render = function() {
    var form;
    this.elem = $(this.template(this.context()));
    this.container.append(this.elem);
    this.elem.find('li a').on('click', (function(_this) {
      return function(event) {
        var client, platform, url;
        client = $(event.target).data('client');
        platform = $(event.target).data('platform');
        url = $(event.target).attr('href');
        return _this.showClient(client, platform, url);
      };
    })(this));
    this.elem.find('.podlove-subscribe-local').on('click', (function(_this) {
      return function(event) {
        _this.elem.find('.local-clients').show();
        _this.elem.find('.cloud-clients').hide();
        $(event.target).addClass('active');
        return $(event.target).next().removeClass('active');
      };
    })(this));
    this.elem.find('.podlove-subscribe-cloud').on('click', (function(_this) {
      return function(event) {
        _this.elem.find('.local-clients').hide();
        _this.elem.find('.cloud-clients').show();
        $(event.target).addClass('active');
        return $(event.target).prev().removeClass('active');
      };
    })(this));
    form = this.elem.find('li form');
    if (form.length) {
      form.find('a').off('click');
      return form.find('a').on('click', (function(_this) {
        return function(event) {
          var client, platform, url;
          event.preventDefault();
          form.submit();
          client = $(event.target).data('client');
          platform = $(event.target).data('platform');
          url = $(event.target).attr('href');
          return _this.showClient(client, platform, url);
        };
      })(this));
    }
  };

  ClientsPanel.prototype.showClient = function(clientTitle, platform, url) {
    var client;
    this.parent.movePanels(2);
    client = clientTitle === 'rss' ? this.otherClient : platform === 'cloud' ? _(this.cloudClients).findWhere({
      title: clientTitle
    }) : _(this.clients).findWhere({
      title: clientTitle
    });
    if (client == null) {
      client = this.osDefault;
    }
    return this.parent.finishPanel.render(client, this.podcast);
  };

  ClientsPanel.prototype.template = Handlebars.compile('<div> <div class="device-cloud-switch"> <button class="podlove-subscribe-local active">{{t "clients_panel.app"}}<span class="podlove-subscribe-tab-active"></span></button><!-- --><button class="podlove-subscribe-cloud">{{t "clients_panel.cloud"}}<span class="podlove-subscribe-tab-active"></span></button> </div> <div class="client-list"> <ul class="local-clients"> {{#if osDefault.icon}} <li> <a href="{{osDefault.url}}" data-client="{{osDefault.title}}" target="_blank"> <img src="{{osDefault.icon}}"> {{osDefault.title}} </a> </li> {{/if}} {{#each clients}} <li> <a href="{{url}}" data-client="{{title}}" target="_blank"> <img src="{{icon}}"> {{title}} </a> </li> {{/each}} <li> <a data-client="rss"> <img src="{{otherClient.icon}}"> {{t "clients_panel.other_client"}} </a> </li> </ul> <ul class="cloud-clients"> {{#each cloudClients}} <li> {{#if post}} <form method="post" action="{{url}}" target="_blank"> <input type="hidden" name="url" value="{{feedUrl}}"> <input type="hidden" name="title" value="{{../../podcastTitle}}"> <input type="hidden" name="subtitle" value="{{../../podcastSubtitle}}"> <input type="hidden" name="image" value="{{../../podcastCover}}"> <a href="{{url}}" data-client="{{title}}" data-platform="cloud"> <img src="{{icon}}"> {{title}} </a> </form> {{else}} <a href="{{url}}" data-client="{{title}}" data-platform="cloud" target="_blank"> <img src="{{icon}}"> {{title}} </a> {{/if}} </li> {{/each}} </ul> </div> </div>');

  return ClientsPanel;

})(Panel);

module.exports = ClientsPanel;



},{"../../vendor/handlebars.min.js":15,"../../vendor/underscore-min.js":17,"../../vendor/zepto-browserify.js":18,"./clients.coffee":3,"./panel.coffee":9,"./utils.coffee":14}],5:[function(require,module,exports){
var $, Colors, TinyColor, _;

$ = require('../../vendor/zepto-browserify.js').Zepto;

_ = require('../../vendor/underscore-min.js');

TinyColor = require('../../vendor/tinycolor-min.js');

Colors = (function() {
  function Colors(colorString) {
    this._setDefaults();
    this._extractColors(colorString);
  }

  Colors.fromParams = function(params) {
    var colors;
    colors = new Colors();
    _(Colors.colorDefaults).each((function(_this) {
      return function(color) {
        return colors[color.name] = Colors.decode(params[color.name]);
      };
    })(this));
    return colors;
  };

  Colors.prototype.toParams = function() {
    var string;
    string = '';
    _(Colors.colorDefaults).each((function(_this) {
      return function(color) {
        return string += "&" + color.name + "=" + (Colors.encode(_this[color.name]));
      };
    })(this));
    return string;
  };

  Colors.prototype.toStyles = function() {
    var css, style;
    this.buttonColor = new TinyColor(this.buttonColor);
    this.backgroundHoverColor = Colors.getHoverColor(this.buttonColor.clone());
    this.fontColor = Colors.getContrastColor(this.buttonColor.clone());
    this.fontHoverColor = Colors.getHoverColor(this.fontColor.clone());
    this.isolatedColor = Colors.getIsolatedColor(this.buttonColor.clone());
    this.isolatedHoverColor = Colors.getHoverColor(this.isolatedColor.clone());
    this.alphaColor = this.buttonColor.clone().setAlpha(0.5);
    css = "#podlove-subscribe-button, .podlove-subscribe-button { background-color: " + this.buttonColor + "; color: " + this.fontColor + "; } #podlove-subscribe-button:active, .podlove-subscribe-button:active, #podlove-subscribe-button:hover, .podlove-subscribe-button:hover { background-color: " + this.backgroundHoverColor + "; color: " + this.fontHoverColor + "; } #podlove-subscribe-button.outline { border-color: " + this.buttonColor + "; color: " + this.buttonColor + "; } #podlove-subscribe-button.outline:active, #podlove-subscribe-button.outline:hover { background-color: " + this.buttonColor + "; color: " + this.fontColor + "; } #podlove-subscribe-button.frameless { color: " + this.buttonColor + "; } #podlove-subscribe-button.frameless:active, #podlove-subscribe-button.frameless:hover { color: " + this.backgroundHoverColor + "; } #podlove-subscribe-popup #podlove-subscribe-popup-close-button, #podlove-subscribe-popup #podlove-subscribe-popup-help-button, #podlove-subscribe-popup .podlove-subscribe-back-button { color: " + this.isolatedColor + "; } #podlove-subscribe-popup #podlove-subscribe-popup-close-button:active, #podlove-subscribe-popup #podlove-subscribe-popup-help-button:active, #podlove-subscribe-popup .podlove-subscribe-back-button:active, #podlove-subscribe-popup #podlove-subscribe-popup-close-button:hover, #podlove-subscribe-popup #podlove-subscribe-popup-help-button:hover, #podlove-subscribe-popup .podlove-subscribe-back-button:hover { color: " + this.isolatedHoverColor + "; } #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button .podlove-subscribe-tab-active { background-color: " + this.buttonColor + "; } #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button:active, #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button:hover, #podlove-subscribe-popup #podlove-subscribe-panel-clients .device-cloud-switch button.active { color: " + this.isolatedColor + "; } #podlove-subscribe-popup #podlove-subscribe-panel-clients li:active, #podlove-subscribe-popup #podlove-subscribe-panel-clients li:hover { background-color: " + this.buttonColor + "; color: " + this.fontColor + "; } #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-popup-finish-register { color: " + this.isolatedColor + "; } #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-popup-finish-register:active, #podlove-subscribe-popup #podlove-subscribe-panel-finish .podlove-subscribe-popup-finish-register:hover { color: " + this.isolatedHoverColor + "; } #podlove-subscribe-popup #podlove-subscribe-button-help-panel { background-color: " + this.buttonColor + "; color: " + this.fontColor + "; } #podlove-subscribe-popup h1::selection, #podlove-subscribe-popup p::selection, #podlove-subscribe-popup input::selection, #podlove-subscribe-popup span::selection, #podlove-subscribe-popup img::selection { background-color: " + this.alphaColor + "; } #podlove-subscribe-popup h1::-moz-selection, #podlove-subscribe-popup p::-moz-selection, #podlove-subscribe-popup input::-moz-selection, #podlove-subscribe-popup span::-moz-selection, #podlove-subscribe-popup img::-moz-selection { background-color: " + this.alphaColor + "; }";
    style = $('<style></style>');
    style.append(css);
    return style;
  };

  Colors.prototype._setDefaults = function() {
    return _(Colors.colorDefaults).each((function(_this) {
      return function(color) {
        return _this[color.name] = color["default"];
      };
    })(this));
  };

  Colors.colorDefaults = [
    {
      name: 'buttonColor',
      "default": '#75ad91'
    }
  ];

  Colors.prototype._extractColors = function(string) {
    var colors;
    if (!string) {
      return;
    }
    colors = string.split(';');
    return this._setColor('buttonColor', colors[0]);
  };

  Colors.prototype._setColor = function(id, color) {
    if (color !== '') {
      return this[id] = color;
    }
  };

  Colors.encode = function(color) {
    return encodeURIComponent(color);
  };

  Colors.decode = function(color) {
    return decodeURIComponent(color);
  };

  Colors.getContrastColor = function(color) {
    this.newColor = color.clone();
    if (color.getBrightness() >= 190) {
      this.newColor = color.darken(70);
    } else if (color.getBrightness() >= 155 && color.getBrightness() < 190) {
      this.newColor = color.darken(45);
    } else if (color.getBrightness() < 155 && color.getBrightness() >= 50) {
      this.newColor = color.lighten(45);
    } else {
      this.newColor = color.lighten(70);
    }
    return this.newColor;
  };

  Colors.getHoverColor = function(color) {
    this.newColor = color.clone();
    if (color.getBrightness() < 50) {
      this.newColor = color.lighten(15);
    } else {
      this.newColor = color.darken(10);
    }
    return this.newColor;
  };

  Colors.getIsolatedColor = function(color) {
    this.newColor = color.clone();
    if (color.getBrightness() >= 170) {
      this.newColor = color.darken(35);
    }
    return this.newColor;
  };

  return Colors;

})();

module.exports = Colors;



},{"../../vendor/tinycolor-min.js":16,"../../vendor/underscore-min.js":17,"../../vendor/zepto-browserify.js":18}],6:[function(require,module,exports){
var $, FinishPanel, Handlebars, Panel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('../../vendor/zepto-browserify.js').Zepto;

Handlebars = require('../../vendor/handlebars.min.js').Handlebars;

Panel = require('./panel.coffee');

FinishPanel = (function(superClass) {
  extend(FinishPanel, superClass);

  function FinishPanel(container, parent) {
    this.container = container;
    this.parent = parent;
  }

  FinishPanel.prototype.context = function(client, podcast) {
    return {
      client: client,
      podcast: podcast,
      scriptPath: this.parent.options.scriptPath,
      platform: this.parent.platform
    };
  };

  FinishPanel.prototype.render = function(client, podcast) {
    var copyNotification, copyUrlButton, copyUrlField;
    this.container.empty();
    this.elem = $(this.template(this.context(client, podcast)));
    this.container.append(this.elem);
    this.elem.find('input').on('click', function() {
      return this.select();
    });
    copyUrlButton = this.elem.find('.copy-url-button');
    copyUrlButton.hide();
    copyUrlField = this.elem.find('.copy-url-field');
    copyNotification = this.elem.find('.copy-notification');
    copyNotification.hide();
    return this.attachCopyFunctionality(copyUrlButton, copyUrlField, copyNotification);
  };

  FinishPanel.prototype.attachCopyFunctionality = function(button, field, notification) {
    if (!document.queryCommandSupported('copy') || !document.queryCommandSupported('selectAll')) {
      return;
    }
    field.on('focus', (function(_this) {
      return function() {
        return document.execCommand('selectAll', false, null);
      };
    })(this));
    button.show();
    return button.on('click', (function(_this) {
      return function() {
        field.attr('contenteditable', true);
        field.focus();
        document.execCommand('copy', false, null);
        field.blur();
        field.attr('contenteditable', false);
        return notification.show();
      };
    })(this));
  };

  FinishPanel.prototype.template = Handlebars.compile('<div> <img class="podcast-cover" src="{{client.icon}}"> {{#if client.scheme}} <h1>{{t "finish_panel.handing_over_to" client=client.title}}...</h1> <p>{{t "finish_panel.something_went_wrong"}}</p> <p> {{#if client.post}} <form method="post" action="{{client.url}}" target="_blank"> <input type="hidden" name="url" value="{{client.url}}"> <input type="hidden" name="title" value="{{podcast.title}}"> <input type="hidden" name="subtitle" value="{{podcast.subtitle}}"> <input type="hidden" name="image" value="{{podcast.cover}}"> <button class="podlove-subscribe-button"> {{t "finish_panel.try_again"}} </button> </form> {{else}} <a href="{{client.url}}" class="podlove-subscribe-button" target="_blank"> {{t "finish_panel.try_again"}} </a> {{/if}} {{#if client.store}} {{t "finish_panel.or_install"}} <br> <a href="{{client.store}}" target="_blank"> <img src="{{scriptPath}}/images/stores/{{platform}}.png" class="store-button"> </a> {{/if}} {{#if client.install}} <a class="podlove-subscribe-popup-finish-register" href="{{client.install}}" target="_blank"> {{t "finish_panel.install" client=client.title}} </a> {{/if}} {{#if client.register}} <a class="podlove-subscribe-popup-finish-register" href="{{client.register}}" target="_blank"> {{t "finish_panel.register_an_account"}} {{client.title}} </a> {{/if}} </p> {{else}} <p> {{t "finish_panel.please_copy_url"}} </p> <a href="{{client.originalUrl}}" target="_blank" class="copy-url-link">{{client.originalUrl}}</a> <button class="copy-url-button podlove-subscribe-button">{{t "finish_panel.copy_button_text"}}</button> <div class="copy-url-field">{{client.originalUrl}}</div> <div class="copy-notification">{{t "finish_panel.copy_success"}}<div> {{/if}} </div>');

  return FinishPanel;

})(Panel);

module.exports = FinishPanel;



},{"../../vendor/handlebars.min.js":15,"../../vendor/zepto-browserify.js":18,"./panel.coffee":9}],7:[function(require,module,exports){
var $, IframeClick, _;

$ = require('../../vendor/zepto-browserify.js').Zepto;

_ = require('../../vendor/underscore-min.js');

IframeClick = (function() {
  function IframeClick() {}

  IframeClick.listen = function(iframe, callback, options) {
    var id;
    id = options.id;
    if (window.podloveSubscribeButtonStoredOptions == null) {
      window.podloveSubscribeButtonStoredOptions = {};
    }
    window.podloveSubscribeButtonStoredOptions[id] = _.clone(options);
    return window.addEventListener('message', ((function(_this) {
      return function(event) {
        if (event.data !== ("clicked_" + id)) {
          return;
        }
        options = window.podloveSubscribeButtonStoredOptions[id];
        return callback(options);
      };
    })(this)), false);
  };

  return IframeClick;

})();

module.exports = IframeClick;



},{"../../vendor/underscore-min.js":17,"../../vendor/zepto-browserify.js":18}],8:[function(require,module,exports){
var IframeResizer;

IframeResizer = (function() {
  function IframeResizer() {}

  IframeResizer.listen = function(listenTo, iframe, offset, callback) {
    if (offset == null) {
      offset = {};
    }
    return window.addEventListener('message', ((function(_this) {
      return function(event) {
        var height, resizeData, width;
        try {
          resizeData = JSON.parse(event.data);
        } catch (_error) {
          return;
        }
        if (resizeData.id !== iframe.attr('id')) {
          return;
        }
        if (resizeData.listenTo !== listenTo) {
          return;
        }
        height = resizeData.height + (offset.height || 0);
        width = /%$/.test(resizeData.width) ? resizeData.width : resizeData.width + (offset.width || 0);
        iframe.height(height);
        iframe.width(width);
        if (callback != null) {
          return callback(iframe);
        }
      };
    })(this)), false);
  };

  return IframeResizer;

})();

module.exports = IframeResizer;



},{}],9:[function(require,module,exports){
var Panel;

Panel = (function() {
  function Panel() {}

  return Panel;

})();

module.exports = Panel;



},{}],10:[function(require,module,exports){
var $, Handlebars, Panel, PodcastPanel, Translations,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('../../vendor/zepto-browserify.js').Zepto;

Handlebars = require('../../vendor/handlebars.min.js').Handlebars;

Translations = require('./translations.coffee');

Panel = require('./panel.coffee');

PodcastPanel = (function(superClass) {
  extend(PodcastPanel, superClass);

  function PodcastPanel(container, parent) {
    this.container = container;
    this.parent = parent;
    this.podcast = this.parent.podcast;
    if (this.podcast.subtitle && this.podcast.subtitle !== '') {
      this.podcast.subtitle = new Handlebars.SafeString(this.podcast.subtitle);
    }
    this.render();
  }

  PodcastPanel.prototype.context = function() {
    return {
      cover: this.podcast.cover,
      title: new Handlebars.SafeString(this.podcast.title),
      subtitle: this.podcast.subtitle,
      scriptPath: this.parent.options.scriptPath
    };
  };

  PodcastPanel.prototype.render = function() {
    this.elem = $(this.template(this.context()));
    this.container.append(this.elem);
    return this.elem.find('button').on('click', (function(_this) {
      return function(event) {
        return _this.parent.movePanels(1);
      };
    })(this));
  };

  PodcastPanel.prototype.template = Handlebars.compile('<div{{#if subtitle}} class="podcast-has-subtitles"{{/if}}> {{#if cover}} <img class="podcast-cover" src="{{cover}}" alt="Logo of {{title}}"> {{else}} <div class="podcast-cover-placeholder"></div> {{/if}} <div class="podlove-subscribe-popup-podcast-text"> <h1>{{title}}</h1> {{#if subtitle}} <p>{{subtitle}}</p> {{/if}} </div> <button class="podlove-subscribe-button">{{t "podcast_panel.choose_client"}}</button> </div>');

  return PodcastPanel;

})(Panel);

module.exports = PodcastPanel;



},{"../../vendor/handlebars.min.js":15,"../../vendor/zepto-browserify.js":18,"./panel.coffee":9,"./translations.coffee":12}],11:[function(require,module,exports){
var $, ClientsPanel, FinishPanel, Handlebars, IframeResizer, PodcastPanel, Popup, Translations, UserAgent, Utils;

$ = require('../../vendor/zepto-browserify.js').Zepto;

Handlebars = require('../../vendor/handlebars.min.js').Handlebars;

Utils = require('./utils.coffee');

Translations = require('./translations.coffee');

IframeResizer = require('./iframe_resizer.coffee');

UserAgent = require('./user_agent.coffee');

PodcastPanel = require('./podcast_panel.coffee');

ClientsPanel = require('./clients_panel.coffee');

FinishPanel = require('./finish_panel.coffee');

Popup = (function() {
  function Popup(podcast, options) {
    this.podcast = podcast;
    this.options = options;
    this.I18n = new Translations(this.options.language);
    this.platform = new UserAgent().detect();
    this.render();
    this.initPanels();
  }

  Popup.prototype.context = function() {
    return {
      scriptPath: this.options.scriptPath
    };
  };

  Popup.prototype.render = function() {
    this.elem = $(this.template(this.context()));
    this.body = $('body');
    this.html = $('html');
    this.body.append(this.elem);
    this.disableBackgroundScrolling();
    window.setTimeout((function(_this) {
      return function() {
        return _this.elem.removeClass('podlove-subscribe-popup-animate');
      };
    })(this), 500);
    this.elem.find('#podlove-subscribe-popup-close-button').on('click', (function(_this) {
      return function() {
        return _this.closePopup();
      };
    })(this));
    this.elem.on('click', (function(_this) {
      return function() {
        return _this.closePopup();
      };
    })(this));
    this.elem.find('#podlove-subscribe-popup-modal').on('click', (function(_this) {
      return function(event) {
        return event.stopPropagation();
      };
    })(this));
    this.elem.find('#podlove-subscribe-popup-help-button').on('click', (function(_this) {
      return function(event) {
        _this.elem.find('#podlove-subscribe-button-help-panel').toggleClass('visible');
        return $(event.currentTarget).toggleClass('active');
      };
    })(this));
    this.elem.find('#podlove-help-close-button').on('click', (function(_this) {
      return function(event) {
        _this.elem.find('#podlove-subscribe-button-help-panel').toggleClass('visible');
        return $(event.currentTarget).toggleClass('active');
      };
    })(this));
    return this.elem.find('.podlove-subscribe-back-button').on('click', (function(_this) {
      return function(event) {
        _this.container = _this.elem.find('#podlove-subscribe-popup-modal-inner');
        if (_this.container.hasClass('swiped-left-2')) {
          return _this.movePanels(1);
        } else if (_this.container.hasClass('swiped-left-1')) {
          return _this.movePanels(0);
        }
      };
    })(this));
  };

  Popup.prototype.disableBackgroundScrolling = function() {
    this.oldHtmlOverflow = this.html.css('overflow');
    this.oldBodyOverflow = this.body.css('overflow');
    this.html.css('overflow', 'hidden');
    return this.body.css('overflow', 'hidden');
  };

  Popup.prototype.enableBackgroundScrolling = function(body) {
    this.html.css('overflow', this.oldHtmlOverflow);
    return this.body.css('overflow', this.oldBodyOverflow);
  };

  Popup.prototype.closePopup = function() {
    this.enableBackgroundScrolling();
    this.elem.addClass('podlove-subscribe-popup-animate');
    return window.setTimeout((function(_this) {
      return function() {
        _this.elem.removeClass('podlove-subscribe-popup-animate');
        return _this.elem.remove();
      };
    })(this), 500);
  };

  Popup.prototype.template = Handlebars.compile('<div id="podlove-subscribe-popup" class="podlove-subscribe podlove-subscribe-popup-animate"> <div id="podlove-subscribe-popup-modal"> <div id="podlove-subscribe-popup-modal-inner" class="show-left"> <div class="top-bar"> <span id="podlove-subscribe-popup-help-button"></span> <span class="podlove-subscribe-back-button"></span> <span class="panel-title">{{t "panels.title"}}</span> <span id="podlove-subscribe-popup-close-button" class="podlove-subscribe-install-button"></span> </div> <div id="podlove-subscribe-panel-container"> <div id="podlove-subscribe-panel-podcast"></div> <div id="podlove-subscribe-panel-clients"></div> <div id="podlove-subscribe-panel-finish"></div> </div> </div> <a href="http://www.podlove.org" title="Podlove" target="_blank" class="podlove-logo"><img src="{{scriptPath}}/images/podlove.svg"></a> <div id="podlove-subscribe-button-help-panel"> <span id="podlove-help-close-button" class="podlove-help-close-button"></span> <div class="podlove-subscribe-button-help-panel-content"> <h2>{{t "help_panel.title"}}</h2> <p>{{t "help_panel.paragraph1"}}</p> <p>{{t "help_panel.paragraph2"}}</p> <p>{{t "help_panel.paragraph3"}}</p> </div> </div> </div> </div>');

  Popup.prototype.initPanels = function() {
    var prefix;
    prefix = '#podlove-subscribe-panel';
    this.podcastPanel = new PodcastPanel(this.elem.find(prefix + "-podcast"), this);
    this.clientsPanel = new ClientsPanel(this.elem.find(prefix + "-clients"), this);
    return this.finishPanel = new FinishPanel(this.elem.find(prefix + "-finish"), this);
  };

  Popup.prototype.movePanels = function(step) {
    this.container = this.elem.find('#podlove-subscribe-popup-modal-inner');
    this.container.removeClass('swiped-left-0');
    this.container.removeClass('swiped-left-1');
    this.container.removeClass('swiped-left-2');
    return this.container.addClass('swiped-left-' + step);
  };

  return Popup;

})();

module.exports = Popup;



},{"../../vendor/handlebars.min.js":15,"../../vendor/zepto-browserify.js":18,"./clients_panel.coffee":4,"./finish_panel.coffee":6,"./iframe_resizer.coffee":8,"./podcast_panel.coffee":10,"./translations.coffee":12,"./user_agent.coffee":13,"./utils.coffee":14}],12:[function(require,module,exports){
var Handlebars, Translations, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

_ = require('../../vendor/underscore-min.js');

Handlebars = require('../../vendor/handlebars.min.js').Handlebars;

Translations = (function() {
  function Translations(language) {
    this.interpolate = bind(this.interpolate, this);
    this.locale = language.split('-')[0];
    Handlebars.registerHelper('t', (function(_this) {
      return function(key, options) {
        return new Handlebars.SafeString(_this.t(key, options.hash));
      };
    })(this));
  }

  Translations.prototype.t = function(key, options) {
    if (options == null) {
      options = {};
    }
    return this.translate(key, options);
  };

  Translations.prototype.translate = function(key, options) {
    var _translations, key_array, last_key, value, value_array;
    if (options == null) {
      options = {};
    }
    key_array = key.split('.');
    _translations = this._translations[this.locale];
    value = null;
    last_key = null;
    _.each(key_array, function(key) {
      last_key = key;
      return value = value ? value[key] : _translations[key];
    });
    if (value == null) {
      value_array = [];
      _.forEach(last_key.split('_'), function(split_key) {
        return value_array.push(split_key.charAt(0).toUpperCase() + split_key.slice(1));
      });
      value = value_array.join(' ');
    }
    return this.interpolate(value, options);
  };

  Translations.prototype.interpolate = function(string, interpolations) {
    string = string.replace(/%{([^{}]*)}/g, function(a, b) {
      var r;
      r = interpolations[b];
      if (typeof r === 'string' || typeof r === 'number') {
        return r;
      } else {
        return a;
      }
    });
    return string;
  };

  Translations.defaultLanguage = 'en';

  Translations.prototype.supportsLanguage = function() {
    var keys;
    keys = Object.keys(this._translations);
    if (keys.indexOf(this.locale) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  Translations.prototype._translations = {
    de: {
      button: "Abonnieren",
      panels: {
        title: "Abonnieren"
      },
      podcast_panel: {
        choose_client: "Weiter"
      },
      help_panel: {
        title: "Abonnieren?",
        paragraph1: "Dank eines Abonnements verpasst du keine Episode dieses Podcasts mehr.",
        paragraph2: "Nach dem Abonnieren lädt eine Podcast-App automatisch neue Folgen herunter und gibt dir Zugriff auf das Episoden-Archiv.",
        paragraph3: "Der Podlove Subscribe Button macht das Abonnieren leichter. Wähle eine App oder einen Cloud-Service aus und lasse den Button alles Weitere erledigen. Benutze den Download-Link, um die App falls nötig zu installieren."
      },
      clients_panel: {
        app: "App",
        cloud: "Cloud",
        other_client: "Andere App"
      },
      finish_panel: {
        handing_over_to: "Übergebe an<br> %{client}",
        something_went_wrong: "Funktioniert etwas nicht wie erwartet?",
        try_again: "Nochmal versuchen",
        install: "%{client} installieren",
        register_an_account: "Einen Account registrieren bei ",
        please_copy_url: "Bitte die URL kopieren und in deine Podcast- oder RSS-App einfügen.",
        copy_button_text: "URL kopieren",
        copy_success: "URL in die Zwischenablage kopiert.",
        or_install: "oder App installieren"
      }
    },
    en: {
      button: "Subscribe",
      panels: {
        title: "Subscribe"
      },
      podcast_panel: {
        choose_client: "Continue"
      },
      help_panel: {
        title: "Subscribe?",
        paragraph1: "You are about to subscribe to a podcast. This will allow your podcast app to automatically download new episodes or access the archive of previously released episodes.",
        paragraph2: "The Podlove Subscribe Button helps you to do this. Select your favorite podcast app from a list of potential apps on your device or pick a podcast cloud service on the web that you use.",
        paragraph3: "Upon launch, the podcast client should offer you to add the podcast to your list of subscriptions. Use the download link to get the app if not yet available."
      },
      clients_panel: {
        app: "App",
        cloud: "Cloud",
        other_client: "Other App"
      },
      finish_panel: {
        handing_over_to: "Handing over to %{client}",
        something_went_wrong: "Did something go wrong?",
        try_again: "Try again",
        install: "Install %{client}",
        register_an_account: "Register an account with ",
        please_copy_url: "Please copy the URL below and add it to your podcast or RSS app.",
        copy_button_text: "Copy URL",
        copy_success: "URL copied to clipboard",
        or_install: "or install app"
      }
    },
    eo: {
      button: "Aboni",
      panels: {
        title: "Aboni"
      },
      podcast_panel: {
        choose_client: "Elekti aplikaĵon"
      },
      help_panel: {
        title: "Ĉu aboni?",
        paragraph1: "Per abono de podkasto vi permesos al via podkasta aplikaĵo aŭtomate elŝuti novajn aŭ arkivajn epizodojn.",
        paragraph2: "La Podlove Abonbutono helpas vin fari tion. Elektu vian plej ŝatatan podkastan aplikaĵon el listo de eblaj aplikaĵoj sur via aparato aŭ elektu vian uzatan nuban servon en la reto.",
        paragraph3: "Lanĉate la podkasta aplikaĵo ebligu al vi aldoni la podkaston al via abonlisto. Uzu la elŝut-ligilon, se la aplikaĵo ankoraŭ ne estas instalita."
      },
      clients_panel: {
        app: "Aplikaĵo",
        cloud: "Nubo",
        other_client: "Alia aplikaĵo"
      },
      finish_panel: {
        handing_over_to: "Transdonanta al %{client}",
        something_went_wrong: "Ĉu io misfunkciis?",
        try_again: "Reprovi",
        install: "Viziti la retejon de %{client}",
        register_an_account: "Registriĝi ĉe ",
        please_copy_url: "Bonvolu kopii la suban URLn kaj aldoni ĝin al via podkasta aplikaĵo aŭ RSS-legilo.",
        copy_button_text: "Copy URL",
        copy_success: "URL copied to clipboard",
        or_install: "aŭ instali la aplikaĵon"
      }
    },
    fi: {
      button: "Tilaa",
      panels: {
        title: "Tilaa"
      },
      podcast_panel: {
        choose_client: "Valitse ohjelma"
      },
      help_panel: {
        title: "Haluatko tilata?",
        paragraph1: "You are about to subscribe to a podcast. This will allow your podcast app to automatically download new episodes or access the archive of previously released episodes.",
        paragraph2: "The Podlove Subscribe Button helps you to do this. Select your favorite podcast app from a list of potential apps on your device or pick a podcast cloud service on the web that you use.",
        paragraph3: "Upon launch, the podcast client should offer you to add the podcast to your list of subscriptions. Use the download link to get the app if not yet available."
      },
      clients_panel: {
        app: "App",
        cloud: "Cloud",
        other_client: "Eri ohjelma"
      },
      finish_panel: {
        handing_over_to: "Annetaan %{client}:lle",
        something_went_wrong: "Menikö jotain väärin?",
        try_again: "Kokeile uudestaan",
        install: "Mene %{client}:n sivustolle",
        register_an_account: "Rekisteröidy",
        please_copy_url: "Ole hyvä ja kopioi alla olevan linkin ja syötä se sinuun podcast tai RSS ohjelmaan.",
        copy_button_text: "Copy URL",
        copy_success: "URL copied to clipboard",
        or_install: "tai installoi ohjelma"
      }
    },
    fr: {
      button: "Souscrire",
      panels: {
        title: "Souscrire"
      },
      podcast_panel: {
        choose_client: "Choisir App"
      },
      help_panel: {
        title: "Souscrire?",
        paragraph1: "Vous êtes sur le point de souscrire à un podcast. Ceci permettra à votre application podcast de télécharger automatiquement de nouveaux épisodes ou d’accéder aux archives d’épisodes préalablement diffusés.",
        paragraph2: "Le bouton souscrire au Podlove vous aide à faire cela. Sélectionnez votre application podcast favorite à partir d’une liste d’applications potentielles sur votre appareil ou choisissez un service de « podcast cloud » sur internet que vous utilisez",
        paragraph3: "Durant le lancement, le client podcast devrait vous offrir la possibilité d’ajouter le podcast à votre liste de souscriptions. Utilisez le lien de téléchargement pour obtenir l’application si celle-ci n’est pas encore présente."
      },
      clients_panel: {
        app: "App",
        cloud: "Cloud",
        other_client: "Autre App"
      },
      finish_panel: {
        handing_over_to: "Transfert vers %{client}",
        something_went_wrong: "Y a-t-il eut des problèmes ?",
        try_again: "Essayer à nouveau",
        install: "Visite %{client} du site internet",
        register_an_account: "Enregistrer un compte avec",
        please_copy_url: "Veuillez copier l’URL ci-dessous et ajoutez le à votre podcast ou application RSS.",
        copy_button_text: "Copy URL",
        copy_success: "URL copied to clipboard",
        or_install: "ou installer l‘application"
      }
    },
    nl: {
      button: "Abonneren",
      panels: {
        title: "Abonneren"
      },
      podcast_panel: {
        choose_client: "App kiezen"
      },
      help_panel: {
        title: "Abonneren?",
        paragraph1: "U staat op het punt een podcast te abonneren. Hierdoor kan uw podcast app nieuwe afleveringen automatisch downloaden of toegang tot het archief van eerder uitgebrachte afleveringen geven.",
        paragraph2: "De Podlove Abonneren Button helpt u om dit te doen. Kies uw favoriete podcast app van een lijst van potentiële apps op uw apparaat of kies een podcast cloud service op het web die u gebruikt.",
        paragraph3: "Bij de lancering moet de podcast client u aanbieden om de podcast toe te voegen aan uw lijst met abonnementen. Gebruik de download link naar de app, indien nog niet beschikbaar."
      },
      clients_panel: {
        app: "App",
        cloud: "Cloud",
        other_client: "Ander app"
      },
      finish_panel: {
        handing_over_to: "Overhandigen aan %{client}",
        something_went_wrong: "Is er iets mis gegaan?",
        try_again: "Probeer opnieuw",
        install: "Bezoek %{client} website",
        register_an_account: "Registreren op ",
        please_copy_url: "Kopieer de URL hieronder en voeg deze toe aan uw podcast of RSS-app.",
        copy_button_text: "Copy URL",
        copy_success: "URL copied to clipboard",
        or_install: "Of installeer de app"
      }
    },
    ja: {
      button: "登録する",
      panels: {
        title: "登録する"
      },
      podcast_panel: {
        choose_client: "クライアントを選ぶ"
      },
      help_panel: {
        title: "登録がよろしいですか？",
        paragraph1: "今新しいポットキャストを登録しています。それでポットキャストクライアントアプリケーションで新しいエピソードを自動でダウンロードできる、またはポットキャストアーカイブで過去のエピソードを探せます。",
        paragraph2: "ポットラブ登録ボタンは登録を支援します。気に入り、使っているポットキャストクライアントがポットキャストクラウドサービスを使用可能なもののリストを選んで下さい。",
        paragraph3: "スタートアップでポットキャストクライアントがポットキャストを登録はずです。アプリがまだインストールしなかったら、ダウンロードリンクをインストールために使って下さい。"
      },
      clients_panel: {
        app: "アプリ",
        cloud: "クラウド",
        other_client: "他のクライアント"
      },
      finish_panel: {
        handing_over_to: "%{client}に渡す",
        something_went_wrong: "何が失敗しましたか？",
        try_again: "もう一度試してください",
        install: "Visit %{client} website",
        register_an_account: "%{client}にアカウントを登録する",
        please_copy_url: "URLをコピーして、ポットキャストがRSSクライアントに貼り付けて下さい。",
        copy_button_text: "Copy URL",
        copy_success: "URL copied to clipboard",
        or_install: "or install app"
      }
    },
    zh: {
      button: "订阅",
      panels: {
        title: "订阅"
      },
      podcast_panel: {
        choose_client: "Choose App"
      },
      help_panel: {
        title: "订阅？",
        paragraph1: "你在订阅一个播客，它会自动下载新的广播节目或进入以前的下载目录。",
        paragraph2: "这个订阅键将协助你完成。从你的设备或者播客云服务上选择你喜欢的应用。",
        paragraph3: "启动时，播客客户端会提醒你将播客加入你的订阅列表中。如还未安装，也可通过链接下载安装此应用。"
      },
      clients_panel: {
        app: "应用",
        cloud: "云",
        other_client: "其他应用"
      },
      finish_panel: {
        handing_over_to: "提交给%{client}",
        something_went_wrong: "有错误？",
        try_again: "重试",
        install: "访问%{client}网站",
        register_an_account: "注册账号 ",
        please_copy_url: "请复制下面的链接，添加到你的播客或RSS应用中。",
        copy_button_text: "Copy URL",
        copy_success: "URL copied to clipboard",
        or_install: "或安装应用"
      }
    }
  };

  return Translations;

})();

module.exports = Translations;



},{"../../vendor/handlebars.min.js":15,"../../vendor/underscore-min.js":17}],13:[function(require,module,exports){
var UAs, UserAgent,
  hasProp = {}.hasOwnProperty;

UserAgent = (function() {
  function UserAgent() {}

  UserAgent.prototype.detect = function() {
    var regex, ua, userAgent;
    userAgent = (window.navigator && navigator.userAgent) || "";
    for (ua in UAs) {
      if (!hasProp.call(UAs, ua)) continue;
      regex = UAs[ua];
      if (regex.test(userAgent)) {
        return ua;
      }
    }
  };

  return UserAgent;

})();

UAs = {
  windows7: /Windows NT 6.1/,
  windows8: /Windows NT 6.2/,
  windows81: /Windows NT 6.3/,
  windows10: /Windows NT 10.0/,
  windowsphone: /trident/i,
  android: /android/i,
  ios: /(ipad|iphone|ipod)/i,
  linux: /linux/i,
  osx: /macintosh/i
};

module.exports = UserAgent;



},{}],14:[function(require,module,exports){
var Utils;

Utils = (function() {
  function Utils() {}

  Utils.locationToOptions = function(location) {
    var array, i, len, options, split, string;
    options = {};
    string = window.location.search.replace(/^\?/, '');
    split = string.split('&');
    for (i = 0, len = split.length; i < len; i++) {
      string = split[i];
      array = string.split('=');
      options[array[0]] = decodeURIComponent(array[1]);
    }
    return options;
  };

  Utils.fixIconPath = function(client, prefix) {
    if (!client.icon) {
      return;
    }
    if (client.icon.indexOf(prefix) === -1) {
      return client.icon = prefix + "/images/" + client.icon;
    }
  };

  return Utils;

})();

module.exports = Utils;



},{}],15:[function(require,module,exports){
/*!

 handlebars v2.0.0-alpha.4

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
this.Handlebars=function(){var a=function(){"use strict";function a(a){this.string=a}var b;return a.prototype.toString=function(){return""+this.string},b=a}(),b=function(a){"use strict";function b(a){return i[a]||"&amp;"}function c(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function d(a){return a instanceof h?a.toString():a||0===a?(a=""+a,k.test(a)?a.replace(j,b):a):""}function e(a){return a||0===a?n(a)&&0===a.length?!0:!1:!0}function f(a,b){return(a?a+".":"")+b}var g={},h=a,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},j=/[&<>"'`]/g,k=/[&<>"'`]/;g.extend=c;var l=Object.prototype.toString;g.toString=l;var m=function(a){return"function"==typeof a};m(/x/)&&(m=function(a){return"function"==typeof a&&"[object Function]"===l.call(a)});var m;g.isFunction=m;var n=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===l.call(a):!1};return g.isArray=n,g.escapeExpression=d,g.isEmpty=e,g.appendContextPath=f,g}(a),c=function(){"use strict";function a(a,b){var d;b&&b.firstLine&&(d=b.firstLine,a+=" - "+d+":"+b.firstColumn);for(var e=Error.prototype.constructor.call(this,a),f=0;f<c.length;f++)this[c[f]]=e[c[f]];d&&(this.lineNumber=d,this.column=b.firstColumn)}var b,c=["description","fileName","lineNumber","message","name","number","stack"];return a.prototype=new Error,b=a}(),d=function(a,b){"use strict";function c(a,b){this.helpers=a||{},this.partials=b||{},d(this)}function d(a){a.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new h("Missing helper: '"+arguments[arguments.length-1].name+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse||function(){},e=c.fn;if(m(b)&&(b=b.call(this)),b===!0)return e(this);if(b===!1||null==b)return d(this);if(l(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):d(this);if(c.data&&c.ids){var f=q(c.data);f.contextPath=g.appendContextPath(c.data.contextPath,c.name),c={data:f}}return e(b,c)}),a.registerHelper("each",function(a,b){b||(b=a,a=this);var c,d,e=b.fn,f=b.inverse,h=0,i="";if(b.data&&b.ids&&(d=g.appendContextPath(b.data.contextPath,b.ids[0])+"."),m(a)&&(a=a.call(this)),b.data&&(c=q(b.data)),a&&"object"==typeof a)if(l(a))for(var j=a.length;j>h;h++)c&&(c.index=h,c.first=0===h,c.last=h===a.length-1,d&&(c.contextPath=d+h)),i+=e(a[h],{data:c});else for(var k in a)a.hasOwnProperty(k)&&(c&&(c.key=k,c.index=h,c.first=0===h,d&&(c.contextPath=d+k)),i+=e(a[k],{data:c}),h++);return 0===h&&(i=f(this)),i}),a.registerHelper("if",function(a,b){return m(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||g.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){m(a)&&(a=a.call(this));var c=b.fn;if(!g.isEmpty(a)){if(b.data&&b.ids){var d=q(b.data);d.contextPath=g.appendContextPath(b.data.contextPath,b.ids[0]),b={data:d}}return c(a,b)}}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)}),a.registerHelper("lookup",function(a,b){return a&&a[b]})}function e(a,b){p.log(a,b)}var f={},g=a,h=b,i="2.0.0-alpha.4";f.VERSION=i;var j=5;f.COMPILER_REVISION=j;var k={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:">= 2.0.0"};f.REVISION_CHANGES=k;var l=g.isArray,m=g.isFunction,n=g.toString,o="[object Object]";f.HandlebarsEnvironment=c,c.prototype={constructor:c,logger:p,log:e,registerHelper:function(a,b,c){if(n.call(a)===o){if(c||b)throw new h("Arg not supported with multiple helpers");g.extend(this.helpers,a)}else c&&(b.not=c),this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){n.call(a)===o?g.extend(this.partials,a):this.partials[a]=b},unregisterPartial:function(a){delete this.partials[a]}};var p={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(a,b){if(p.level<=a){var c=p.methodMap[a];"undefined"!=typeof console&&console[c]&&console[c].call(console,b)}}};f.logger=p,f.log=e;var q=function(a){var b=g.extend({},a);return b._parent=a,b};return f.createFrame=q,f}(b,c),e=function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=n;if(b!==c){if(c>b){var d=o[c],e=o[b];throw new m("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new m("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){if(!b)throw new m("No environment passed to template");b.VM.checkRevision(a.compiler);var c=function(a,c,d,e,f,g,h){e&&(d=l.extend({},d,e));var i=b.VM.invokePartial.call(this,a,c,d,f,g,h);if(null!=i)return i;if(b.compile){var j={helpers:f,partials:g,data:h};return g[c]=b.compile(a,{data:void 0!==h},b),g[c](d,j)}throw new m("The partial "+c+" could not be compiled when running in runtime-only mode")},d={escapeExpression:l.escapeExpression,invokePartial:c,fn:function(b){return a[b]},programs:[],program:function(a,b){var c=this.programs[a],d=this.fn(a);return b?c=g(this,a,d,b):c||(c=this.programs[a]=g(this,a,d)),c},programWithDepth:b.VM.programWithDepth,data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c=l.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler},e=function(b,c){c=c||{};var f=c.data;return e._setup(c),!c.partial&&a.useData&&(f=j(b,f)),a.main.call(d,b,d.helpers,d.partials,f)};return e._setup=function(c){c.partial?(d.helpers=c.helpers,d.partials=c.partials):(d.helpers=d.merge(c.helpers,b.helpers),a.usePartial&&(d.partials=d.merge(c.partials,b.partials)))},e._child=function(a){return d.programWithDepth(a)},e}function f(a,b){var c=Array.prototype.slice.call(arguments,2),d=this,e=d.fn(a),f=function(a,f){return f=f||{},e.apply(d,[a,d.helpers,d.partials,f.data||b].concat(c))};return f.program=a,f.depth=c.length,f}function g(a,b,c,d){var e=function(b,e){return e=e||{},c.call(a,b,a.helpers,a.partials,e.data||d)};return e.program=b,e.depth=0,e}function h(a,b,c,d,e,f){var g={partial:!0,helpers:d,partials:e,data:f};if(void 0===a)throw new m("The partial "+b+" could not be found");return a instanceof Function?a(c,g):void 0}function i(){return""}function j(a,b){return b&&"root"in b||(b=b?p(b):{},b.root=a),b}var k={},l=a,m=b,n=c.COMPILER_REVISION,o=c.REVISION_CHANGES,p=c.createFrame;return k.checkRevision=d,k.template=e,k.programWithDepth=f,k.program=g,k.invokePartial=h,k.noop=i,k}(b,c,d),f=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c,j=d,k=e,l=function(){var a=new g.HandlebarsEnvironment;return j.extend(a,g),a.SafeString=h,a.Exception=i,a.Utils=j,a.VM=k,a.template=function(b){return k.template(b,a)},a},m=l();return m.create=l,f=m}(d,a,c,b,e),g=function(a){"use strict";function b(a){a=a||{},this.firstLine=a.first_line,this.firstColumn=a.first_column,this.lastColumn=a.last_column,this.lastLine=a.last_line}var c,d=a,e={ProgramNode:function(a,c,d,f){var g,h;3===arguments.length?(f=d,d=null):2===arguments.length&&(f=c,c=null),b.call(this,f),this.type="program",this.statements=a,this.strip={},d?(h=d[0],h?(g={first_line:h.firstLine,last_line:h.lastLine,last_column:h.lastColumn,first_column:h.firstColumn},this.inverse=new e.ProgramNode(d,c,g)):this.inverse=new e.ProgramNode(d,c),this.strip.right=c.left):c&&(this.strip.left=c.right)},MustacheNode:function(a,c,d,f,g){if(b.call(this,g),this.type="mustache",this.strip=f,null!=d&&d.charAt){var h=d.charAt(3)||d.charAt(2);this.escaped="{"!==h&&"&"!==h}else this.escaped=!!d;this.sexpr=a instanceof e.SexprNode?a:new e.SexprNode(a,c),this.sexpr.isRoot=!0,this.id=this.sexpr.id,this.params=this.sexpr.params,this.hash=this.sexpr.hash,this.eligibleHelper=this.sexpr.eligibleHelper,this.isHelper=this.sexpr.isHelper},SexprNode:function(a,c,d){b.call(this,d),this.type="sexpr",this.hash=c;var e=this.id=a[0],f=this.params=a.slice(1);this.isHelper=!(!f.length&&!c),this.eligibleHelper=this.isHelper||e.isSimple},PartialNode:function(a,c,d,e,f){b.call(this,f),this.type="partial",this.partialName=a,this.context=c,this.hash=d,this.strip=e},BlockNode:function(a,c,e,f,g){if(b.call(this,g),a.sexpr.id.original!==f.path.original)throw new d(a.sexpr.id.original+" doesn't match "+f.path.original,this);this.type="block",this.mustache=a,this.program=c,this.inverse=e,this.strip={left:a.strip.left,right:f.strip.right},(c||e).strip.left=a.strip.right,(e||c).strip.right=f.strip.left,e&&!c&&(this.isInverse=!0)},RawBlockNode:function(a,c,f,g){if(b.call(this,g),a.sexpr.id.original!==f)throw new d(a.sexpr.id.original+" doesn't match "+f,this);c=new e.ContentNode(c,g),this.type="block",this.mustache=a,this.program=new e.ProgramNode([c],g)},ContentNode:function(a,c){b.call(this,c),this.type="content",this.string=a},HashNode:function(a,c){b.call(this,c),this.type="hash",this.pairs=a},IdNode:function(a,c){b.call(this,c),this.type="ID";for(var e="",f=[],g=0,h="",i=0,j=a.length;j>i;i++){var k=a[i].part;if(e+=(a[i].separator||"")+k,".."===k||"."===k||"this"===k){if(f.length>0)throw new d("Invalid path: "+e,this);".."===k?(g++,h+="../"):this.isScoped=!0}else f.push(k)}this.original=e,this.parts=f,this.string=f.join("."),this.depth=g,this.idName=h+this.string,this.isSimple=1===a.length&&!this.isScoped&&0===g,this.stringModeValue=this.string},PartialNameNode:function(a,c){b.call(this,c),this.type="PARTIAL_NAME",this.name=a.original},DataNode:function(a,c){b.call(this,c),this.type="DATA",this.id=a,this.stringModeValue=a.stringModeValue,this.idName="@"+a.stringModeValue},StringNode:function(a,c){b.call(this,c),this.type="STRING",this.original=this.string=this.stringModeValue=a},NumberNode:function(a,c){b.call(this,c),this.type="NUMBER",this.original=this.number=a,this.stringModeValue=Number(a)},BooleanNode:function(a,c){b.call(this,c),this.type="BOOLEAN",this.bool=a,this.stringModeValue="true"===a},CommentNode:function(a,c){b.call(this,c),this.type="comment",this.comment=a}};return c=e}(c),h=function(){"use strict";var a,b=function(){function a(a,b){return{left:"~"===a.charAt(2),right:"~"===b.charAt(0)||"~"===b.charAt(1)}}function b(){this.yy={}}var c={trace:function(){},yy:{},symbols_:{error:2,root:3,statements:4,EOF:5,program:6,simpleInverse:7,statement:8,openRawBlock:9,CONTENT:10,END_RAW_BLOCK:11,openInverse:12,closeBlock:13,openBlock:14,mustache:15,partial:16,COMMENT:17,OPEN_RAW_BLOCK:18,sexpr:19,CLOSE_RAW_BLOCK:20,OPEN_BLOCK:21,CLOSE:22,OPEN_INVERSE:23,OPEN_ENDBLOCK:24,path:25,OPEN:26,OPEN_UNESCAPED:27,CLOSE_UNESCAPED:28,OPEN_PARTIAL:29,partialName:30,param:31,partial_option0:32,partial_option1:33,sexpr_repetition0:34,sexpr_option0:35,dataName:36,STRING:37,NUMBER:38,BOOLEAN:39,OPEN_SEXPR:40,CLOSE_SEXPR:41,hash:42,hash_repetition_plus0:43,hashSegment:44,ID:45,EQUALS:46,DATA:47,pathSegments:48,SEP:49,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",10:"CONTENT",11:"END_RAW_BLOCK",17:"COMMENT",18:"OPEN_RAW_BLOCK",20:"CLOSE_RAW_BLOCK",21:"OPEN_BLOCK",22:"CLOSE",23:"OPEN_INVERSE",24:"OPEN_ENDBLOCK",26:"OPEN",27:"OPEN_UNESCAPED",28:"CLOSE_UNESCAPED",29:"OPEN_PARTIAL",37:"STRING",38:"NUMBER",39:"BOOLEAN",40:"OPEN_SEXPR",41:"CLOSE_SEXPR",45:"ID",46:"EQUALS",47:"DATA",49:"SEP"},productions_:[0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[9,3],[14,3],[12,3],[13,3],[15,3],[15,3],[16,5],[16,4],[7,2],[19,3],[19,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[42,1],[44,3],[30,1],[30,1],[30,1],[36,2],[25,1],[48,3],[48,1],[32,0],[32,1],[33,0],[33,1],[34,0],[34,2],[35,0],[35,1],[43,1],[43,2]],performAction:function(b,c,d,e,f,g){var h=g.length-1;switch(f){case 1:return new e.ProgramNode(g[h-1],this._$);case 2:return new e.ProgramNode([],this._$);case 3:this.$=new e.ProgramNode([],g[h-1],g[h],this._$);break;case 4:this.$=new e.ProgramNode(g[h-2],g[h-1],g[h],this._$);break;case 5:this.$=new e.ProgramNode(g[h-1],g[h],[],this._$);break;case 6:this.$=new e.ProgramNode(g[h],this._$);break;case 7:this.$=new e.ProgramNode([],this._$);break;case 8:this.$=new e.ProgramNode([],this._$);break;case 9:this.$=[g[h]];break;case 10:g[h-1].push(g[h]),this.$=g[h-1];break;case 11:this.$=new e.RawBlockNode(g[h-2],g[h-1],g[h],this._$);break;case 12:this.$=new e.BlockNode(g[h-2],g[h-1].inverse,g[h-1],g[h],this._$);break;case 13:this.$=new e.BlockNode(g[h-2],g[h-1],g[h-1].inverse,g[h],this._$);break;case 14:this.$=g[h];break;case 15:this.$=g[h];break;case 16:this.$=new e.ContentNode(g[h],this._$);break;case 17:this.$=new e.CommentNode(g[h],this._$);break;case 18:this.$=new e.MustacheNode(g[h-1],null,"","",this._$);break;case 19:this.$=new e.MustacheNode(g[h-1],null,g[h-2],a(g[h-2],g[h]),this._$);break;case 20:this.$=new e.MustacheNode(g[h-1],null,g[h-2],a(g[h-2],g[h]),this._$);break;case 21:this.$={path:g[h-1],strip:a(g[h-2],g[h])};break;case 22:this.$=new e.MustacheNode(g[h-1],null,g[h-2],a(g[h-2],g[h]),this._$);break;case 23:this.$=new e.MustacheNode(g[h-1],null,g[h-2],a(g[h-2],g[h]),this._$);break;case 24:this.$=new e.PartialNode(g[h-3],g[h-2],g[h-1],a(g[h-4],g[h]),this._$);break;case 25:this.$=new e.PartialNode(g[h-2],void 0,g[h-1],a(g[h-3],g[h]),this._$);break;case 26:this.$=a(g[h-1],g[h]);break;case 27:this.$=new e.SexprNode([g[h-2]].concat(g[h-1]),g[h],this._$);break;case 28:this.$=new e.SexprNode([g[h]],null,this._$);break;case 29:this.$=g[h];break;case 30:this.$=new e.StringNode(g[h],this._$);break;case 31:this.$=new e.NumberNode(g[h],this._$);break;case 32:this.$=new e.BooleanNode(g[h],this._$);break;case 33:this.$=g[h];break;case 34:g[h-1].isHelper=!0,this.$=g[h-1];break;case 35:this.$=new e.HashNode(g[h],this._$);break;case 36:this.$=[g[h-2],g[h]];break;case 37:this.$=new e.PartialNameNode(g[h],this._$);break;case 38:this.$=new e.PartialNameNode(new e.StringNode(g[h],this._$),this._$);break;case 39:this.$=new e.PartialNameNode(new e.NumberNode(g[h],this._$));break;case 40:this.$=new e.DataNode(g[h],this._$);break;case 41:this.$=new e.IdNode(g[h],this._$);break;case 42:g[h-2].push({part:g[h],separator:g[h-1]}),this.$=g[h-2];break;case 43:this.$=[{part:g[h]}];break;case 48:this.$=[];break;case 49:g[h-1].push(g[h]);break;case 52:this.$=[g[h]];break;case 53:g[h-1].push(g[h])}},table:[{3:1,4:2,5:[1,3],8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],26:[1,15],27:[1,16],29:[1,17]},{1:[3]},{5:[1,18],8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],26:[1,15],27:[1,16],29:[1,17]},{1:[2,2]},{5:[2,9],10:[2,9],17:[2,9],18:[2,9],21:[2,9],23:[2,9],24:[2,9],26:[2,9],27:[2,9],29:[2,9]},{10:[1,20]},{4:23,6:21,7:22,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,24],24:[2,8],26:[1,15],27:[1,16],29:[1,17]},{4:23,6:25,7:22,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,24],24:[2,8],26:[1,15],27:[1,16],29:[1,17]},{5:[2,14],10:[2,14],17:[2,14],18:[2,14],21:[2,14],23:[2,14],24:[2,14],26:[2,14],27:[2,14],29:[2,14]},{5:[2,15],10:[2,15],17:[2,15],18:[2,15],21:[2,15],23:[2,15],24:[2,15],26:[2,15],27:[2,15],29:[2,15]},{5:[2,16],10:[2,16],17:[2,16],18:[2,16],21:[2,16],23:[2,16],24:[2,16],26:[2,16],27:[2,16],29:[2,16]},{5:[2,17],10:[2,17],17:[2,17],18:[2,17],21:[2,17],23:[2,17],24:[2,17],26:[2,17],27:[2,17],29:[2,17]},{19:26,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:32,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:33,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:34,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:35,25:27,36:28,45:[1,31],47:[1,30],48:29},{25:37,30:36,37:[1,38],38:[1,39],45:[1,31],48:29},{1:[2,1]},{5:[2,10],10:[2,10],17:[2,10],18:[2,10],21:[2,10],23:[2,10],24:[2,10],26:[2,10],27:[2,10],29:[2,10]},{11:[1,40]},{13:41,24:[1,42]},{4:43,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,7],26:[1,15],27:[1,16],29:[1,17]},{7:44,8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,24],24:[2,6],26:[1,15],27:[1,16],29:[1,17]},{19:32,22:[1,45],25:27,36:28,45:[1,31],47:[1,30],48:29},{13:46,24:[1,42]},{20:[1,47]},{20:[2,48],22:[2,48],28:[2,48],34:48,37:[2,48],38:[2,48],39:[2,48],40:[2,48],41:[2,48],45:[2,48],47:[2,48]},{20:[2,28],22:[2,28],28:[2,28],41:[2,28]},{20:[2,41],22:[2,41],28:[2,41],37:[2,41],38:[2,41],39:[2,41],40:[2,41],41:[2,41],45:[2,41],47:[2,41],49:[1,49]},{25:50,45:[1,31],48:29},{20:[2,43],22:[2,43],28:[2,43],37:[2,43],38:[2,43],39:[2,43],40:[2,43],41:[2,43],45:[2,43],47:[2,43],49:[2,43]},{22:[1,51]},{22:[1,52]},{22:[1,53]},{28:[1,54]},{22:[2,46],25:57,31:55,33:56,36:61,37:[1,58],38:[1,59],39:[1,60],40:[1,62],42:63,43:64,44:66,45:[1,65],47:[1,30],48:29},{22:[2,37],37:[2,37],38:[2,37],39:[2,37],40:[2,37],45:[2,37],47:[2,37]},{22:[2,38],37:[2,38],38:[2,38],39:[2,38],40:[2,38],45:[2,38],47:[2,38]},{22:[2,39],37:[2,39],38:[2,39],39:[2,39],40:[2,39],45:[2,39],47:[2,39]},{5:[2,11],10:[2,11],17:[2,11],18:[2,11],21:[2,11],23:[2,11],24:[2,11],26:[2,11],27:[2,11],29:[2,11]},{5:[2,12],10:[2,12],17:[2,12],18:[2,12],21:[2,12],23:[2,12],24:[2,12],26:[2,12],27:[2,12],29:[2,12]},{25:67,45:[1,31],48:29},{8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,3],26:[1,15],27:[1,16],29:[1,17]},{4:68,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,5],26:[1,15],27:[1,16],29:[1,17]},{10:[2,26],17:[2,26],18:[2,26],21:[2,26],23:[2,26],24:[2,26],26:[2,26],27:[2,26],29:[2,26]},{5:[2,13],10:[2,13],17:[2,13],18:[2,13],21:[2,13],23:[2,13],24:[2,13],26:[2,13],27:[2,13],29:[2,13]},{10:[2,18]},{20:[2,50],22:[2,50],25:57,28:[2,50],31:70,35:69,36:61,37:[1,58],38:[1,59],39:[1,60],40:[1,62],41:[2,50],42:71,43:64,44:66,45:[1,65],47:[1,30],48:29},{45:[1,72]},{20:[2,40],22:[2,40],28:[2,40],37:[2,40],38:[2,40],39:[2,40],40:[2,40],41:[2,40],45:[2,40],47:[2,40]},{10:[2,20],17:[2,20],18:[2,20],21:[2,20],23:[2,20],24:[2,20],26:[2,20],27:[2,20],29:[2,20]},{10:[2,19],17:[2,19],18:[2,19],21:[2,19],23:[2,19],24:[2,19],26:[2,19],27:[2,19],29:[2,19]},{5:[2,22],10:[2,22],17:[2,22],18:[2,22],21:[2,22],23:[2,22],24:[2,22],26:[2,22],27:[2,22],29:[2,22]},{5:[2,23],10:[2,23],17:[2,23],18:[2,23],21:[2,23],23:[2,23],24:[2,23],26:[2,23],27:[2,23],29:[2,23]},{22:[2,44],32:73,42:74,43:64,44:66,45:[1,75]},{22:[1,76]},{20:[2,29],22:[2,29],28:[2,29],37:[2,29],38:[2,29],39:[2,29],40:[2,29],41:[2,29],45:[2,29],47:[2,29]},{20:[2,30],22:[2,30],28:[2,30],37:[2,30],38:[2,30],39:[2,30],40:[2,30],41:[2,30],45:[2,30],47:[2,30]},{20:[2,31],22:[2,31],28:[2,31],37:[2,31],38:[2,31],39:[2,31],40:[2,31],41:[2,31],45:[2,31],47:[2,31]},{20:[2,32],22:[2,32],28:[2,32],37:[2,32],38:[2,32],39:[2,32],40:[2,32],41:[2,32],45:[2,32],47:[2,32]},{20:[2,33],22:[2,33],28:[2,33],37:[2,33],38:[2,33],39:[2,33],40:[2,33],41:[2,33],45:[2,33],47:[2,33]},{19:77,25:27,36:28,45:[1,31],47:[1,30],48:29},{22:[2,47]},{20:[2,35],22:[2,35],28:[2,35],41:[2,35],44:78,45:[1,75]},{20:[2,43],22:[2,43],28:[2,43],37:[2,43],38:[2,43],39:[2,43],40:[2,43],41:[2,43],45:[2,43],46:[1,79],47:[2,43],49:[2,43]},{20:[2,52],22:[2,52],28:[2,52],41:[2,52],45:[2,52]},{22:[1,80]},{8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,4],26:[1,15],27:[1,16],29:[1,17]},{20:[2,27],22:[2,27],28:[2,27],41:[2,27]},{20:[2,49],22:[2,49],28:[2,49],37:[2,49],38:[2,49],39:[2,49],40:[2,49],41:[2,49],45:[2,49],47:[2,49]},{20:[2,51],22:[2,51],28:[2,51],41:[2,51]},{20:[2,42],22:[2,42],28:[2,42],37:[2,42],38:[2,42],39:[2,42],40:[2,42],41:[2,42],45:[2,42],47:[2,42],49:[2,42]},{22:[1,81]},{22:[2,45]},{46:[1,79]},{5:[2,25],10:[2,25],17:[2,25],18:[2,25],21:[2,25],23:[2,25],24:[2,25],26:[2,25],27:[2,25],29:[2,25]},{41:[1,82]},{20:[2,53],22:[2,53],28:[2,53],41:[2,53],45:[2,53]},{25:57,31:83,36:61,37:[1,58],38:[1,59],39:[1,60],40:[1,62],45:[1,31],47:[1,30],48:29},{5:[2,21],10:[2,21],17:[2,21],18:[2,21],21:[2,21],23:[2,21],24:[2,21],26:[2,21],27:[2,21],29:[2,21]},{5:[2,24],10:[2,24],17:[2,24],18:[2,24],21:[2,24],23:[2,24],24:[2,24],26:[2,24],27:[2,24],29:[2,24]},{20:[2,34],22:[2,34],28:[2,34],37:[2,34],38:[2,34],39:[2,34],40:[2,34],41:[2,34],45:[2,34],47:[2,34]},{20:[2,36],22:[2,36],28:[2,36],41:[2,36],45:[2,36]}],defaultActions:{3:[2,2],18:[2,1],47:[2,18],63:[2,47],74:[2,45]},parseError:function(a){throw new Error(a)},parse:function(a){function b(){var a;return a=c.lexer.lex()||1,"number"!=typeof a&&(a=c.symbols_[a]||a),a}var c=this,d=[0],e=[null],f=[],g=this.table,h="",i=0,j=0,k=0;this.lexer.setInput(a),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var l=this.lexer.yylloc;f.push(l);var m=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var n,o,p,q,r,s,t,u,v,w={};;){if(p=d[d.length-1],this.defaultActions[p]?q=this.defaultActions[p]:((null===n||"undefined"==typeof n)&&(n=b()),q=g[p]&&g[p][n]),"undefined"==typeof q||!q.length||!q[0]){var x="";if(!k){v=[];for(s in g[p])this.terminals_[s]&&s>2&&v.push("'"+this.terminals_[s]+"'");x=this.lexer.showPosition?"Parse error on line "+(i+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+v.join(", ")+", got '"+(this.terminals_[n]||n)+"'":"Parse error on line "+(i+1)+": Unexpected "+(1==n?"end of input":"'"+(this.terminals_[n]||n)+"'"),this.parseError(x,{text:this.lexer.match,token:this.terminals_[n]||n,line:this.lexer.yylineno,loc:l,expected:v})}}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+p+", token: "+n);switch(q[0]){case 1:d.push(n),e.push(this.lexer.yytext),f.push(this.lexer.yylloc),d.push(q[1]),n=null,o?(n=o,o=null):(j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,l=this.lexer.yylloc,k>0&&k--);break;case 2:if(t=this.productions_[q[1]][1],w.$=e[e.length-t],w._$={first_line:f[f.length-(t||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(t||1)].first_column,last_column:f[f.length-1].last_column},m&&(w._$.range=[f[f.length-(t||1)].range[0],f[f.length-1].range[1]]),r=this.performAction.call(w,h,j,i,this.yy,q[1],e,f),"undefined"!=typeof r)return r;t&&(d=d.slice(0,-1*t*2),e=e.slice(0,-1*t),f=f.slice(0,-1*t)),d.push(this.productions_[q[1]][0]),e.push(w.$),f.push(w._$),u=g[d[d.length-2]][d[d.length-1]],d.push(u);break;case 3:return!0}}return!0}},d=function(){var a={EOF:1,parseError:function(a,b){if(!this.yy.parser)throw new Error(a);this.yy.parser.parseError(a,b)},setInput:function(a){return this._input=a,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var b=a.match(/(?:\r\n?|\n).*/g);return b?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},unput:function(a){var b=a.length,c=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-b-1),this.offset-=b;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var e=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===d.length?this.yylloc.first_column:0)+d[d.length-c.length].length-c[0].length:this.yylloc.first_column-b},this.options.ranges&&(this.yylloc.range=[e[0],e[0]+this.yyleng-b]),this},more:function(){return this._more=!0,this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),b=new Array(a.length+1).join("-");return a+this.upcomingInput()+"\n"+b+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,b,c,d,e;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),g=0;g<f.length&&(c=this._input.match(this.rules[f[g]]),!c||b&&!(c[0].length>b[0].length)||(b=c,d=g,this.options.flex));g++);return b?(e=b[0].match(/(?:\r\n?|\n).*/g),e&&(this.yylineno+=e.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:e?e[e.length-1].length-e[e.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+b[0].length},this.yytext+=b[0],this.match+=b[0],this.matches=b,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(b[0].length),this.matched+=b[0],a=this.performAction.call(this,this.yy,this,f[d],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a?a:void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return"undefined"!=typeof a?a:this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(a){this.begin(a)}};return a.options={},a.performAction=function(a,b,c,d){function e(a,c){return b.yytext=b.yytext.substr(a,b.yyleng-c)}switch(c){case 0:if("\\\\"===b.yytext.slice(-2)?(e(0,1),this.begin("mu")):"\\"===b.yytext.slice(-1)?(e(0,1),this.begin("emu")):this.begin("mu"),b.yytext)return 10;break;case 1:return 10;case 2:return this.popState(),10;case 3:return b.yytext=b.yytext.substr(5,b.yyleng-9),this.popState(),11;case 4:return 10;case 5:return e(0,4),this.popState(),17;case 6:return 40;case 7:return 41;case 8:return 18;case 9:return this.popState(),this.begin("raw"),20;case 10:return b.yytext=b.yytext.substr(4,b.yyleng-8),this.popState(),"RAW_BLOCK";case 11:return 29;case 12:return 21;case 13:return 24;case 14:return 23;case 15:return 23;case 16:return 27;case 17:return 26;case 18:this.popState(),this.begin("com");break;case 19:return e(3,5),this.popState(),17;case 20:return 26;case 21:return 46;case 22:return 45;case 23:return 45;case 24:return 49;case 25:break;case 26:return this.popState(),28;case 27:return this.popState(),22;case 28:return b.yytext=e(1,2).replace(/\\"/g,'"'),37;case 29:return b.yytext=e(1,2).replace(/\\'/g,"'"),37;case 30:return 47;case 31:return 39;case 32:return 39;case 33:return 38;case 34:return 45;case 35:return b.yytext=e(1,2),45;case 36:return"INVALID";case 37:return 5}},a.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{\{\{[^\x00]*\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],a.conditions={mu:{rules:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[5],inclusive:!1},raw:{rules:[3,4],inclusive:!1},INITIAL:{rules:[0,1,37],inclusive:!0}},a}();return c.lexer=d,b.prototype=c,c.Parser=b,new b}();return a=b}(),i=function(a,b){"use strict";function c(a){return a.constructor===f.ProgramNode?a:(e.yy=f,e.parse(a))}var d={},e=a,f=b;return d.parser=e,d.parse=c,d}(h,g),j=function(a){"use strict";function b(){}function c(a,b,c){if(null==a||"string"!=typeof a&&a.constructor!==c.AST.ProgramNode)throw new f("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+a);b=b||{},"data"in b||(b.data=!0);var d=c.parse(a),e=(new c.Compiler).compile(d,b);return(new c.JavaScriptCompiler).compile(e,b)}function d(a,b,c){function d(){var d=c.parse(a),e=(new c.Compiler).compile(d,b),f=(new c.JavaScriptCompiler).compile(e,b,void 0,!0);return c.template(f)}if(null==a||"string"!=typeof a&&a.constructor!==c.AST.ProgramNode)throw new f("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+a);b=b||{},"data"in b||(b.data=!0);var e,g=function(a,b){return e||(e=d()),e.call(this,a,b)};return g._setup=function(a){return e||(e=d()),e._setup(a)},g._child=function(a){return e||(e=d()),e._child(a)},g}var e={},f=a;return e.Compiler=b,b.prototype={compiler:b,disassemble:function(){for(var a,b,c,d=this.opcodes,e=[],f=0,g=d.length;g>f;f++)if(a=d[f],"DECLARE"===a.opcode)e.push("DECLARE "+a.name+"="+a.value);else{b=[];for(var h=0;h<a.args.length;h++)c=a.args[h],"string"==typeof c&&(c='"'+c.replace("\n","\\n")+'"'),b.push(c);e.push(a.opcode+" "+b.join(" "))}return e.join("\n")},equals:function(a){var b=this.opcodes.length;if(a.opcodes.length!==b)return!1;for(var c=0;b>c;c++){var d=this.opcodes[c],e=a.opcodes[c];if(d.opcode!==e.opcode||d.args.length!==e.args.length)return!1;for(var f=0;f<d.args.length;f++)if(d.args[f]!==e.args[f])return!1}if(b=this.children.length,a.children.length!==b)return!1;for(c=0;b>c;c++)if(!this.children[c].equals(a.children[c]))return!1;return!0},guid:0,compile:function(a,b){this.opcodes=[],this.children=[],this.depths={list:[]},this.options=b,this.stringParams=b.stringParams,this.trackIds=b.trackIds;var c=this.options.knownHelpers;if(this.options.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0,lookup:!0},c)for(var d in c)this.options.knownHelpers[d]=c[d];return this.accept(a)},accept:function(a){var b,c=a.strip||{};return c.left&&this.opcode("strip"),b=this[a.type](a),c.right&&this.opcode("strip"),b},program:function(a){for(var b=a.statements,c=0,d=b.length;d>c;c++)this.accept(b[c]);return this.isSimple=1===d,this.depths.list=this.depths.list.sort(function(a,b){return a-b}),this},compileProgram:function(a){var b,c=(new this.compiler).compile(a,this.options),d=this.guid++;this.usePartial=this.usePartial||c.usePartial,this.children[d]=c;for(var e=0,f=c.depths.list.length;f>e;e++)b=c.depths.list[e],2>b||this.addDepth(b-1);return d},block:function(a){var b=a.mustache,c=a.program,d=a.inverse;c&&(c=this.compileProgram(c)),d&&(d=this.compileProgram(d));var e=b.sexpr,f=this.classifySexpr(e);"helper"===f?this.helperSexpr(e,c,d):"simple"===f?(this.simpleSexpr(e),this.opcode("pushProgram",c),this.opcode("pushProgram",d),this.opcode("emptyHash"),this.opcode("blockValue",e.id.original)):(this.ambiguousSexpr(e,c,d),this.opcode("pushProgram",c),this.opcode("pushProgram",d),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},hash:function(a){var b,c,d=a.pairs;for(this.opcode("pushHash"),b=0,c=d.length;c>b;b++)this.pushParam(d[b][1]);for(;b--;)this.opcode("assignToHash",d[b][0]);this.opcode("popHash")},partial:function(a){var b=a.partialName;this.usePartial=!0,a.hash?this.accept(a.hash):this.opcode("push","undefined"),a.context?this.accept(a.context):this.opcode("push","depth0"),this.opcode("invokePartial",b.name),this.opcode("append")
},content:function(a){this.opcode("appendContent",a.string)},mustache:function(a){this.sexpr(a.sexpr),a.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},ambiguousSexpr:function(a,b,c){var d=a.id,e=d.parts[0],f=null!=b||null!=c;this.opcode("getContext",d.depth),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.opcode("invokeAmbiguous",e,f)},simpleSexpr:function(a){var b=a.id;"DATA"===b.type?this.DATA(b):b.parts.length?this.ID(b):(this.addDepth(b.depth),this.opcode("getContext",b.depth),this.opcode("pushContext")),this.opcode("resolvePossibleLambda")},helperSexpr:function(a,b,c){var d=this.setupFullMustacheParams(a,b,c),e=a.id,g=e.parts[0];if(this.options.knownHelpers[g])this.opcode("invokeKnownHelper",d.length,g);else{if(this.options.knownHelpersOnly)throw new f("You specified knownHelpersOnly, but used the unknown helper "+g,a);this.ID(e),this.opcode("invokeHelper",d.length,e.original,a.isRoot)}},sexpr:function(a){var b=this.classifySexpr(a);"simple"===b?this.simpleSexpr(a):"helper"===b?this.helperSexpr(a):this.ambiguousSexpr(a)},ID:function(a){this.addDepth(a.depth),this.opcode("getContext",a.depth);var b=a.parts[0];b?this.opcode("lookupOnContext",a.parts[0]):this.opcode("pushContext");for(var c=1,d=a.parts.length;d>c;c++)this.opcode("lookup",a.parts[c])},DATA:function(a){this.options.data=!0,this.opcode("lookupData",a.id.depth);for(var b=a.id.parts,c=0,d=b.length;d>c;c++)this.opcode("lookup",b[c])},STRING:function(a){this.opcode("pushString",a.string)},NUMBER:function(a){this.opcode("pushLiteral",a.number)},BOOLEAN:function(a){this.opcode("pushLiteral",a.bool)},comment:function(){},opcode:function(a){this.opcodes.push({opcode:a,args:[].slice.call(arguments,1)})},declare:function(a,b){this.opcodes.push({opcode:"DECLARE",name:a,value:b})},addDepth:function(a){0!==a&&(this.depths[a]||(this.depths[a]=!0,this.depths.list.push(a)))},classifySexpr:function(a){var b=a.isHelper,c=a.eligibleHelper,d=this.options;if(c&&!b){var e=a.id.parts[0];d.knownHelpers[e]?b=!0:d.knownHelpersOnly&&(c=!1)}return b?"helper":c?"ambiguous":"simple"},pushParams:function(a){for(var b=0,c=a.length;c>b;b++)this.pushParam(a[b])},pushParam:function(a){this.stringParams?(a.depth&&this.addDepth(a.depth),this.opcode("getContext",a.depth||0),this.opcode("pushStringParam",a.stringModeValue,a.type),"sexpr"===a.type&&this.sexpr(a)):(this.trackIds&&this.opcode("pushId",a.type,a.idName||a.stringModeValue),this.accept(a))},setupFullMustacheParams:function(a,b,c){var d=a.params;return this.pushParams(d),this.opcode("pushProgram",b),this.opcode("pushProgram",c),a.hash?this.hash(a.hash):this.opcode("emptyHash"),d}},e.precompile=c,e.compile=d,e}(c),k=function(a,b){"use strict";function c(a){this.value=a}function d(){}var e,f=a.COMPILER_REVISION,g=a.REVISION_CHANGES,h=a.log,i=b;d.prototype={nameLookup:function(a,b){var c,e;return 0===a.indexOf("depth")&&(c=!0),e=d.isValidJavaScriptVariableName(b)?a+"."+b:a+"['"+b+"']",c?"("+a+" && "+e+")":e},compilerInfo:function(){var a=f,b=g[a];return[a,b]},appendToBuffer:function(a){return this.environment.isSimple?"return "+a+";":{appendToBuffer:!0,content:a,toString:function(){return"buffer += "+a+";"}}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(a,b,c,d){this.environment=a,this.options=b||{},this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!d,h("debug",this.environment.disassemble()+"\n\n"),this.name=this.environment.name,this.isChild=!!c,this.context=c||{programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.compileChildren(a,b);var e,f,g,j=a.opcodes;for(f=0,g=j.length;g>f;f++)e=j[f],"DECLARE"===e.opcode?this[e.name]=e.value:this[e.opcode].apply(this,e.args),e.opcode!==this.stripNext&&(this.stripNext=!1);if(this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new i("Compile completed with content left on stack");var k=this.createFunctionContext(d);if(this.isChild)return k;var l={compiler:this.compilerInfo(),main:k},m=this.context.programs;for(f=0,g=m.length;g>f;f++)m[f]&&(l[f]=m[f]);return this.environment.usePartial&&(l.usePartial=!0),this.options.data&&(l.useData=!0),d||(l.compiler=JSON.stringify(l.compiler),l=this.objectLiteral(l)),l},preamble:function(){this.lastContext=0,this.source=[]},createFunctionContext:function(a){var b="",c=this.stackVars.concat(this.registers.list);c.length>0&&(b+=", "+c.join(", "));for(var d in this.aliases)this.aliases.hasOwnProperty(d)&&(b+=", "+d+"="+this.aliases[d]);for(var e=["depth0","helpers","partials","data"],f=0,g=this.environment.depths.list.length;g>f;f++)e.push("depth"+this.environment.depths.list[f]);var h=this.mergeSource(b);return a?(e.push(h),Function.apply(this,e)):"function("+e.join(",")+") {\n  "+h+"}"},mergeSource:function(a){for(var b,c,d="",e=!this.forceBuffer,f=0,g=this.source.length;g>f;f++){var h=this.source[f];h.appendToBuffer?b=b?b+"\n    + "+h.content:h.content:(b&&(d?d+="buffer += "+b+";\n  ":(c=!0,d=b+";\n  "),b=void 0),d+=h+"\n  ",this.environment.isSimple||(e=!1))}return e?(b||!d)&&(d+="return "+(b||'""')+";\n"):(a+=", buffer = "+(c?"":this.initializeBuffer()),d+=b?"return buffer + "+b+";\n":"return buffer;\n"),a&&(d="var "+a.substring(2)+(c?"":";\n  ")+d),d},blockValue:function(a){this.aliases.blockHelperMissing="helpers.blockHelperMissing";var b=["depth0"];this.setupParams(a,0,b),this.replaceStack(function(a){return b.splice(1,0,a),"blockHelperMissing.call("+b.join(", ")+")"})},ambiguousBlockValue:function(){this.aliases.blockHelperMissing="helpers.blockHelperMissing";var a=["depth0"];this.setupParams("",0,a,!0),this.flushInline();var b=this.topStack();a.splice(1,0,b),this.pushSource("if (!"+this.lastHelper+") { "+b+" = blockHelperMissing.call("+a.join(", ")+"); }")},appendContent:function(a){this.pendingContent&&(a=this.pendingContent+a),this.stripNext&&(a=a.replace(/^\s+/,"")),this.pendingContent=a},strip:function(){this.pendingContent&&(this.pendingContent=this.pendingContent.replace(/\s+$/,"")),this.stripNext="strip"},append:function(){this.flushInline();var a=this.popStack();this.pushSource("if("+a+" || "+a+" === 0) { "+this.appendToBuffer(a)+" }"),this.environment.isSimple&&this.pushSource("else { "+this.appendToBuffer("''")+" }")},appendEscaped:function(){this.aliases.escapeExpression="this.escapeExpression",this.pushSource(this.appendToBuffer("escapeExpression("+this.popStack()+")"))},getContext:function(a){this.lastContext!==a&&(this.lastContext=a)},lookupOnContext:function(a){this.push(this.nameLookup("depth"+this.lastContext,a,"context"))},pushContext:function(){this.pushStackLiteral("depth"+this.lastContext)},resolvePossibleLambda:function(){this.aliases.functionType='"function"',this.replaceStack(function(a){return"typeof "+a+" === functionType ? "+a+".apply(depth0) : "+a})},lookup:function(a){this.replaceStack(function(b){return b+" == null || "+b+" === false ? "+b+" : "+this.nameLookup(b,a,"context")})},lookupData:function(a){a?this.pushStackLiteral("this.data(data, "+a+")"):this.pushStackLiteral("data")},pushStringParam:function(a,b){this.pushStackLiteral("depth"+this.lastContext),this.pushString(b),"sexpr"!==b&&("string"==typeof a?this.pushString(a):this.pushStackLiteral(a))},emptyHash:function(){this.pushStackLiteral("{}"),this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),this.push("{}"))},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var a=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push("{"+a.ids.join(",")+"}"),this.stringParams&&(this.push("{"+a.contexts.join(",")+"}"),this.push("{"+a.types.join(",")+"}")),this.push("{\n    "+a.values.join(",\n    ")+"\n  }")},pushString:function(a){this.pushStackLiteral(this.quotedString(a))},push:function(a){return this.inlineStack.push(a),a},pushLiteral:function(a){this.pushStackLiteral(a)},pushProgram:function(a){null!=a?this.pushStackLiteral(this.programExpression(a)):this.pushStackLiteral(null)},invokeHelper:function(a,b,c){this.aliases.helperMissing="helpers.helperMissing",this.useRegister("helper");var d=this.popStack(),e=this.setupHelper(a,b),f="helper = "+e.name+" || "+d+" || helperMissing";e.paramsInit&&(f+=","+e.paramsInit),this.push("("+f+",helper.call("+e.callParams+"))"),c||this.flushInline()},invokeKnownHelper:function(a,b){var c=this.setupHelper(a,b);this.push(c.name+".call("+c.callParams+")")},invokeAmbiguous:function(a,b){this.aliases.functionType='"function"',this.useRegister("helper"),this.emptyHash();var c=this.setupHelper(0,a,b),d=this.lastHelper=this.nameLookup("helpers",a,"helper"),e=this.nameLookup("depth"+this.lastContext,a,"context");this.push("((helper = "+d+" || "+e+(c.paramsInit?"),("+c.paramsInit:"")+"),(typeof helper === functionType ? helper.call("+c.callParams+") : helper))")},invokePartial:function(a){var b=[this.nameLookup("partials",a,"partial"),"'"+a+"'",this.popStack(),this.popStack(),"helpers","partials"];this.options.data&&b.push("data"),this.push("this.invokePartial("+b.join(", ")+")")},assignToHash:function(a){var b,c,d,e=this.popStack();this.trackIds&&(d=this.popStack()),this.stringParams&&(c=this.popStack(),b=this.popStack());var f=this.hash;b&&f.contexts.push("'"+a+"': "+b),c&&f.types.push("'"+a+"': "+c),d&&f.ids.push("'"+a+"': "+d),f.values.push("'"+a+"': ("+e+")")},pushId:function(a,b){"ID"===a||"DATA"===a?this.pushString(b):"sexpr"===a?this.pushStackLiteral("true"):this.pushStackLiteral("null")},compiler:d,compileChildren:function(a,b){for(var c,d,e=a.children,f=0,g=e.length;g>f;f++){c=e[f],d=new this.compiler;var h=this.matchExistingProgram(c);null==h?(this.context.programs.push(""),h=this.context.programs.length,c.index=h,c.name="program"+h,this.context.programs[h]=d.compile(c,b,this.context,!this.precompile),this.context.environments[h]=c):(c.index=h,c.name="program"+h)}},matchExistingProgram:function(a){for(var b=0,c=this.context.environments.length;c>b;b++){var d=this.context.environments[b];if(d&&d.equals(a))return b}},programExpression:function(a){if(null==a)return"this.noop";for(var b,c=this.environment.children[a],d=c.depths.list,e=[c.index,"data"],f=0,g=d.length;g>f;f++)b=d[f],e.push("depth"+(b-1));return(0===d.length?"this.program(":"this.programWithDepth(")+e.join(", ")+")"},register:function(a,b){this.useRegister(a),this.pushSource(a+" = "+b+";")},useRegister:function(a){this.registers[a]||(this.registers[a]=!0,this.registers.list.push(a))},pushStackLiteral:function(a){return this.push(new c(a))},pushSource:function(a){this.pendingContent&&(this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))),this.pendingContent=void 0),a&&this.source.push(a)},pushStack:function(a){this.flushInline();var b=this.incrStack();return a&&this.pushSource(b+" = "+a+";"),this.compileStack.push(b),b},replaceStack:function(a){var b,d,e,f="",g=this.isInline();if(g){var h=this.popStack(!0);if(h instanceof c)b=h.value,e=!0;else{d=!this.stackSlot;var i=d?this.incrStack():this.topStackName();f="("+this.push(i)+" = "+h+"),",b=this.topStack()}}else b=this.topStack();var j=a.call(this,b);return g?(e||this.popStack(),d&&this.stackSlot--,this.push("("+f+j+")")):(/^stack/.test(b)||(b=this.nextStack()),this.pushSource(b+" = ("+f+j+");")),b},nextStack:function(){return this.pushStack()},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var a=this.inlineStack;if(a.length){this.inlineStack=[];for(var b=0,d=a.length;d>b;b++){var e=a[b];e instanceof c?this.compileStack.push(e):this.pushStack(e)}}},isInline:function(){return this.inlineStack.length},popStack:function(a){var b=this.isInline(),d=(b?this.inlineStack:this.compileStack).pop();if(!a&&d instanceof c)return d.value;if(!b){if(!this.stackSlot)throw new i("Invalid stack pop");this.stackSlot--}return d},topStack:function(a){var b=this.isInline()?this.inlineStack:this.compileStack,d=b[b.length-1];return!a&&d instanceof c?d.value:d},quotedString:function(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(this.quotedString(c)+":"+a[c]);return"{"+b.join(",")+"}"},setupHelper:function(a,b,c){var d=[],e=this.setupParams(b,a,d,c),f=this.nameLookup("helpers",b,"helper");return{params:d,paramsInit:e,name:f,callParams:["depth0"].concat(d).join(", ")}},setupOptions:function(a,b,c){var d,e,f,g={},h=[],i=[],j=[];g.name=this.quotedString(a),g.hash=this.popStack(),this.trackIds&&(g.hashIds=this.popStack()),this.stringParams&&(g.hashTypes=this.popStack(),g.hashContexts=this.popStack()),e=this.popStack(),f=this.popStack(),(f||e)&&(f||(f="this.noop"),e||(e="this.noop"),g.fn=f,g.inverse=e);for(var k=b;k--;)d=this.popStack(),c[k]=d,this.trackIds&&(j[k]=this.popStack()),this.stringParams&&(i[k]=this.popStack(),h[k]=this.popStack());return this.trackIds&&(g.ids="["+j.join(",")+"]"),this.stringParams&&(g.types="["+i.join(",")+"]",g.contexts="["+h.join(",")+"]"),this.options.data&&(g.data="data"),g},setupParams:function(a,b,c,d){var e=this.objectLiteral(this.setupOptions(a,b,c));return d?(this.useRegister("options"),c.push("options"),"options="+e):(c.push(e),"")}};for(var j="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),k=d.RESERVED_WORDS={},l=0,m=j.length;m>l;l++)k[j[l]]=!0;return d.isValidJavaScriptVariableName=function(a){return!d.RESERVED_WORDS[a]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a)},e=d}(d,c),l=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c.parser,j=c.parse,k=d.Compiler,l=d.compile,m=d.precompile,n=e,o=g.create,p=function(){var a=o();return a.compile=function(b,c){return l(b,c,a)},a.precompile=function(b,c){return m(b,c,a)},a.AST=h,a.Compiler=k,a.JavaScriptCompiler=n,a.Parser=i,a.parse=j,a};return g=p(),g.create=p,f=g}(f,g,i,j,k);return l}();
},{}],16:[function(require,module,exports){
// TinyColor v1.3.0
// https://github.com/bgrins/TinyColor
// 2015-11-27, Brian Grinstead, MIT License
!function(){function tinycolor(color,opts){if(color=color?color:"",opts=opts||{},color instanceof tinycolor)return color;if(!(this instanceof tinycolor))return new tinycolor(color,opts);var rgb=inputToRGB(color);this._originalInput=color,this._r=rgb.r,this._g=rgb.g,this._b=rgb.b,this._a=rgb.a,this._roundA=mathRound(100*this._a)/100,this._format=opts.format||rgb.format,this._gradientType=opts.gradientType,this._r<1&&(this._r=mathRound(this._r)),this._g<1&&(this._g=mathRound(this._g)),this._b<1&&(this._b=mathRound(this._b)),this._ok=rgb.ok,this._tc_id=tinyCounter++}function inputToRGB(color){var rgb={r:0,g:0,b:0},a=1,ok=!1,format=!1;return"string"==typeof color&&(color=stringInputToObject(color)),"object"==typeof color&&(color.hasOwnProperty("r")&&color.hasOwnProperty("g")&&color.hasOwnProperty("b")?(rgb=rgbToRgb(color.r,color.g,color.b),ok=!0,format="%"===String(color.r).substr(-1)?"prgb":"rgb"):color.hasOwnProperty("h")&&color.hasOwnProperty("s")&&color.hasOwnProperty("v")?(color.s=convertToPercentage(color.s),color.v=convertToPercentage(color.v),rgb=hsvToRgb(color.h,color.s,color.v),ok=!0,format="hsv"):color.hasOwnProperty("h")&&color.hasOwnProperty("s")&&color.hasOwnProperty("l")&&(color.s=convertToPercentage(color.s),color.l=convertToPercentage(color.l),rgb=hslToRgb(color.h,color.s,color.l),ok=!0,format="hsl"),color.hasOwnProperty("a")&&(a=color.a)),a=boundAlpha(a),{ok:ok,format:color.format||format,r:mathMin(255,mathMax(rgb.r,0)),g:mathMin(255,mathMax(rgb.g,0)),b:mathMin(255,mathMax(rgb.b,0)),a:a}}function rgbToRgb(r,g,b){return{r:255*bound01(r,255),g:255*bound01(g,255),b:255*bound01(b,255)}}function rgbToHsl(r,g,b){r=bound01(r,255),g=bound01(g,255),b=bound01(b,255);var h,s,max=mathMax(r,g,b),min=mathMin(r,g,b),l=(max+min)/2;if(max==min)h=s=0;else{var d=max-min;switch(s=l>.5?d/(2-max-min):d/(max+min),max){case r:h=(g-b)/d+(b>g?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4}h/=6}return{h:h,s:s,l:l}}function hslToRgb(h,s,l){function hue2rgb(p,q,t){return 0>t&&(t+=1),t>1&&(t-=1),1/6>t?p+6*(q-p)*t:.5>t?q:2/3>t?p+6*(q-p)*(2/3-t):p}var r,g,b;if(h=bound01(h,360),s=bound01(s,100),l=bound01(l,100),0===s)r=g=b=l;else{var q=.5>l?l*(1+s):l+s-l*s,p=2*l-q;r=hue2rgb(p,q,h+1/3),g=hue2rgb(p,q,h),b=hue2rgb(p,q,h-1/3)}return{r:255*r,g:255*g,b:255*b}}function rgbToHsv(r,g,b){r=bound01(r,255),g=bound01(g,255),b=bound01(b,255);var h,s,max=mathMax(r,g,b),min=mathMin(r,g,b),v=max,d=max-min;if(s=0===max?0:d/max,max==min)h=0;else{switch(max){case r:h=(g-b)/d+(b>g?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4}h/=6}return{h:h,s:s,v:v}}function hsvToRgb(h,s,v){h=6*bound01(h,360),s=bound01(s,100),v=bound01(v,100);var i=math.floor(h),f=h-i,p=v*(1-s),q=v*(1-f*s),t=v*(1-(1-f)*s),mod=i%6,r=[v,q,p,p,t,v][mod],g=[t,v,v,q,p,p][mod],b=[p,p,t,v,v,q][mod];return{r:255*r,g:255*g,b:255*b}}function rgbToHex(r,g,b,allow3Char){var hex=[pad2(mathRound(r).toString(16)),pad2(mathRound(g).toString(16)),pad2(mathRound(b).toString(16))];return allow3Char&&hex[0].charAt(0)==hex[0].charAt(1)&&hex[1].charAt(0)==hex[1].charAt(1)&&hex[2].charAt(0)==hex[2].charAt(1)?hex[0].charAt(0)+hex[1].charAt(0)+hex[2].charAt(0):hex.join("")}function rgbaToHex(r,g,b,a){var hex=[pad2(convertDecimalToHex(a)),pad2(mathRound(r).toString(16)),pad2(mathRound(g).toString(16)),pad2(mathRound(b).toString(16))];return hex.join("")}function desaturate(color,amount){amount=0===amount?0:amount||10;var hsl=tinycolor(color).toHsl();return hsl.s-=amount/100,hsl.s=clamp01(hsl.s),tinycolor(hsl)}function saturate(color,amount){amount=0===amount?0:amount||10;var hsl=tinycolor(color).toHsl();return hsl.s+=amount/100,hsl.s=clamp01(hsl.s),tinycolor(hsl)}function greyscale(color){return tinycolor(color).desaturate(100)}function lighten(color,amount){amount=0===amount?0:amount||10;var hsl=tinycolor(color).toHsl();return hsl.l+=amount/100,hsl.l=clamp01(hsl.l),tinycolor(hsl)}function brighten(color,amount){amount=0===amount?0:amount||10;var rgb=tinycolor(color).toRgb();return rgb.r=mathMax(0,mathMin(255,rgb.r-mathRound(255*-(amount/100)))),rgb.g=mathMax(0,mathMin(255,rgb.g-mathRound(255*-(amount/100)))),rgb.b=mathMax(0,mathMin(255,rgb.b-mathRound(255*-(amount/100)))),tinycolor(rgb)}function darken(color,amount){amount=0===amount?0:amount||10;var hsl=tinycolor(color).toHsl();return hsl.l-=amount/100,hsl.l=clamp01(hsl.l),tinycolor(hsl)}function spin(color,amount){var hsl=tinycolor(color).toHsl(),hue=(mathRound(hsl.h)+amount)%360;return hsl.h=0>hue?360+hue:hue,tinycolor(hsl)}function complement(color){var hsl=tinycolor(color).toHsl();return hsl.h=(hsl.h+180)%360,tinycolor(hsl)}function triad(color){var hsl=tinycolor(color).toHsl(),h=hsl.h;return[tinycolor(color),tinycolor({h:(h+120)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+240)%360,s:hsl.s,l:hsl.l})]}function tetrad(color){var hsl=tinycolor(color).toHsl(),h=hsl.h;return[tinycolor(color),tinycolor({h:(h+90)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+180)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+270)%360,s:hsl.s,l:hsl.l})]}function splitcomplement(color){var hsl=tinycolor(color).toHsl(),h=hsl.h;return[tinycolor(color),tinycolor({h:(h+72)%360,s:hsl.s,l:hsl.l}),tinycolor({h:(h+216)%360,s:hsl.s,l:hsl.l})]}function analogous(color,results,slices){results=results||6,slices=slices||30;var hsl=tinycolor(color).toHsl(),part=360/slices,ret=[tinycolor(color)];for(hsl.h=(hsl.h-(part*results>>1)+720)%360;--results;)hsl.h=(hsl.h+part)%360,ret.push(tinycolor(hsl));return ret}function monochromatic(color,results){results=results||6;for(var hsv=tinycolor(color).toHsv(),h=hsv.h,s=hsv.s,v=hsv.v,ret=[],modification=1/results;results--;)ret.push(tinycolor({h:h,s:s,v:v})),v=(v+modification)%1;return ret}function flip(o){var flipped={};for(var i in o)o.hasOwnProperty(i)&&(flipped[o[i]]=i);return flipped}function boundAlpha(a){return a=parseFloat(a),(isNaN(a)||0>a||a>1)&&(a=1),a}function bound01(n,max){isOnePointZero(n)&&(n="100%");var processPercent=isPercentage(n);return n=mathMin(max,mathMax(0,parseFloat(n))),processPercent&&(n=parseInt(n*max,10)/100),math.abs(n-max)<1e-6?1:n%max/parseFloat(max)}function clamp01(val){return mathMin(1,mathMax(0,val))}function parseIntFromHex(val){return parseInt(val,16)}function isOnePointZero(n){return"string"==typeof n&&-1!=n.indexOf(".")&&1===parseFloat(n)}function isPercentage(n){return"string"==typeof n&&-1!=n.indexOf("%")}function pad2(c){return 1==c.length?"0"+c:""+c}function convertToPercentage(n){return 1>=n&&(n=100*n+"%"),n}function convertDecimalToHex(d){return Math.round(255*parseFloat(d)).toString(16)}function convertHexToDecimal(h){return parseIntFromHex(h)/255}function stringInputToObject(color){color=color.replace(trimLeft,"").replace(trimRight,"").toLowerCase();var named=!1;if(names[color])color=names[color],named=!0;else if("transparent"==color)return{r:0,g:0,b:0,a:0,format:"name"};var match;return(match=matchers.rgb.exec(color))?{r:match[1],g:match[2],b:match[3]}:(match=matchers.rgba.exec(color))?{r:match[1],g:match[2],b:match[3],a:match[4]}:(match=matchers.hsl.exec(color))?{h:match[1],s:match[2],l:match[3]}:(match=matchers.hsla.exec(color))?{h:match[1],s:match[2],l:match[3],a:match[4]}:(match=matchers.hsv.exec(color))?{h:match[1],s:match[2],v:match[3]}:(match=matchers.hsva.exec(color))?{h:match[1],s:match[2],v:match[3],a:match[4]}:(match=matchers.hex8.exec(color))?{a:convertHexToDecimal(match[1]),r:parseIntFromHex(match[2]),g:parseIntFromHex(match[3]),b:parseIntFromHex(match[4]),format:named?"name":"hex8"}:(match=matchers.hex6.exec(color))?{r:parseIntFromHex(match[1]),g:parseIntFromHex(match[2]),b:parseIntFromHex(match[3]),format:named?"name":"hex"}:(match=matchers.hex3.exec(color))?{r:parseIntFromHex(match[1]+""+match[1]),g:parseIntFromHex(match[2]+""+match[2]),b:parseIntFromHex(match[3]+""+match[3]),format:named?"name":"hex"}:!1}function validateWCAG2Parms(parms){var level,size;return parms=parms||{level:"AA",size:"small"},level=(parms.level||"AA").toUpperCase(),size=(parms.size||"small").toLowerCase(),"AA"!==level&&"AAA"!==level&&(level="AA"),"small"!==size&&"large"!==size&&(size="small"),{level:level,size:size}}var trimLeft=/^\s+/,trimRight=/\s+$/,tinyCounter=0,math=Math,mathRound=math.round,mathMin=math.min,mathMax=math.max,mathRandom=math.random;tinycolor.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var rgb=this.toRgb();return(299*rgb.r+587*rgb.g+114*rgb.b)/1e3},getLuminance:function(){var RsRGB,GsRGB,BsRGB,R,G,B,rgb=this.toRgb();return RsRGB=rgb.r/255,GsRGB=rgb.g/255,BsRGB=rgb.b/255,R=.03928>=RsRGB?RsRGB/12.92:Math.pow((RsRGB+.055)/1.055,2.4),G=.03928>=GsRGB?GsRGB/12.92:Math.pow((GsRGB+.055)/1.055,2.4),B=.03928>=BsRGB?BsRGB/12.92:Math.pow((BsRGB+.055)/1.055,2.4),.2126*R+.7152*G+.0722*B},setAlpha:function(value){return this._a=boundAlpha(value),this._roundA=mathRound(100*this._a)/100,this},toHsv:function(){var hsv=rgbToHsv(this._r,this._g,this._b);return{h:360*hsv.h,s:hsv.s,v:hsv.v,a:this._a}},toHsvString:function(){var hsv=rgbToHsv(this._r,this._g,this._b),h=mathRound(360*hsv.h),s=mathRound(100*hsv.s),v=mathRound(100*hsv.v);return 1==this._a?"hsv("+h+", "+s+"%, "+v+"%)":"hsva("+h+", "+s+"%, "+v+"%, "+this._roundA+")"},toHsl:function(){var hsl=rgbToHsl(this._r,this._g,this._b);return{h:360*hsl.h,s:hsl.s,l:hsl.l,a:this._a}},toHslString:function(){var hsl=rgbToHsl(this._r,this._g,this._b),h=mathRound(360*hsl.h),s=mathRound(100*hsl.s),l=mathRound(100*hsl.l);return 1==this._a?"hsl("+h+", "+s+"%, "+l+"%)":"hsla("+h+", "+s+"%, "+l+"%, "+this._roundA+")"},toHex:function(allow3Char){return rgbToHex(this._r,this._g,this._b,allow3Char)},toHexString:function(allow3Char){return"#"+this.toHex(allow3Char)},toHex8:function(){return rgbaToHex(this._r,this._g,this._b,this._a)},toHex8String:function(){return"#"+this.toHex8()},toRgb:function(){return{r:mathRound(this._r),g:mathRound(this._g),b:mathRound(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+mathRound(this._r)+", "+mathRound(this._g)+", "+mathRound(this._b)+")":"rgba("+mathRound(this._r)+", "+mathRound(this._g)+", "+mathRound(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:mathRound(100*bound01(this._r,255))+"%",g:mathRound(100*bound01(this._g,255))+"%",b:mathRound(100*bound01(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+mathRound(100*bound01(this._r,255))+"%, "+mathRound(100*bound01(this._g,255))+"%, "+mathRound(100*bound01(this._b,255))+"%)":"rgba("+mathRound(100*bound01(this._r,255))+"%, "+mathRound(100*bound01(this._g,255))+"%, "+mathRound(100*bound01(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":this._a<1?!1:hexNames[rgbToHex(this._r,this._g,this._b,!0)]||!1},toFilter:function(secondColor){var hex8String="#"+rgbaToHex(this._r,this._g,this._b,this._a),secondHex8String=hex8String,gradientType=this._gradientType?"GradientType = 1, ":"";if(secondColor){var s=tinycolor(secondColor);secondHex8String=s.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")"},toString:function(format){var formatSet=!!format;format=format||this._format;var formattedString=!1,hasAlpha=this._a<1&&this._a>=0,needsAlphaFormat=!formatSet&&hasAlpha&&("hex"===format||"hex6"===format||"hex3"===format||"name"===format);return needsAlphaFormat?"name"===format&&0===this._a?this.toName():this.toRgbString():("rgb"===format&&(formattedString=this.toRgbString()),"prgb"===format&&(formattedString=this.toPercentageRgbString()),("hex"===format||"hex6"===format)&&(formattedString=this.toHexString()),"hex3"===format&&(formattedString=this.toHexString(!0)),"hex8"===format&&(formattedString=this.toHex8String()),"name"===format&&(formattedString=this.toName()),"hsl"===format&&(formattedString=this.toHslString()),"hsv"===format&&(formattedString=this.toHsvString()),formattedString||this.toHexString())},clone:function(){return tinycolor(this.toString())},_applyModification:function(fn,args){var color=fn.apply(null,[this].concat([].slice.call(args)));return this._r=color._r,this._g=color._g,this._b=color._b,this.setAlpha(color._a),this},lighten:function(){return this._applyModification(lighten,arguments)},brighten:function(){return this._applyModification(brighten,arguments)},darken:function(){return this._applyModification(darken,arguments)},desaturate:function(){return this._applyModification(desaturate,arguments)},saturate:function(){return this._applyModification(saturate,arguments)},greyscale:function(){return this._applyModification(greyscale,arguments)},spin:function(){return this._applyModification(spin,arguments)},_applyCombination:function(fn,args){return fn.apply(null,[this].concat([].slice.call(args)))},analogous:function(){return this._applyCombination(analogous,arguments)},complement:function(){return this._applyCombination(complement,arguments)},monochromatic:function(){return this._applyCombination(monochromatic,arguments)},splitcomplement:function(){return this._applyCombination(splitcomplement,arguments)},triad:function(){return this._applyCombination(triad,arguments)},tetrad:function(){return this._applyCombination(tetrad,arguments)}},tinycolor.fromRatio=function(color,opts){if("object"==typeof color){var newColor={};for(var i in color)color.hasOwnProperty(i)&&(newColor[i]="a"===i?color[i]:convertToPercentage(color[i]));color=newColor}return tinycolor(color,opts)},tinycolor.equals=function(color1,color2){return color1&&color2?tinycolor(color1).toRgbString()==tinycolor(color2).toRgbString():!1},tinycolor.random=function(){return tinycolor.fromRatio({r:mathRandom(),g:mathRandom(),b:mathRandom()})},tinycolor.mix=function(color1,color2,amount){amount=0===amount?0:amount||50;var w1,rgb1=tinycolor(color1).toRgb(),rgb2=tinycolor(color2).toRgb(),p=amount/100,w=2*p-1,a=rgb2.a-rgb1.a;w1=-1==w*a?w:(w+a)/(1+w*a),w1=(w1+1)/2;var w2=1-w1,rgba={r:rgb2.r*w1+rgb1.r*w2,g:rgb2.g*w1+rgb1.g*w2,b:rgb2.b*w1+rgb1.b*w2,a:rgb2.a*p+rgb1.a*(1-p)};return tinycolor(rgba)},tinycolor.readability=function(color1,color2){var c1=tinycolor(color1),c2=tinycolor(color2);return(Math.max(c1.getLuminance(),c2.getLuminance())+.05)/(Math.min(c1.getLuminance(),c2.getLuminance())+.05)},tinycolor.isReadable=function(color1,color2,wcag2){var wcag2Parms,out,readability=tinycolor.readability(color1,color2);switch(out=!1,wcag2Parms=validateWCAG2Parms(wcag2),wcag2Parms.level+wcag2Parms.size){case"AAsmall":case"AAAlarge":out=readability>=4.5;break;case"AAlarge":out=readability>=3;break;case"AAAsmall":out=readability>=7}return out},tinycolor.mostReadable=function(baseColor,colorList,args){var readability,includeFallbackColors,level,size,bestColor=null,bestScore=0;args=args||{},includeFallbackColors=args.includeFallbackColors,level=args.level,size=args.size;for(var i=0;i<colorList.length;i++)readability=tinycolor.readability(baseColor,colorList[i]),readability>bestScore&&(bestScore=readability,bestColor=tinycolor(colorList[i]));return tinycolor.isReadable(baseColor,bestColor,{level:level,size:size})||!includeFallbackColors?bestColor:(args.includeFallbackColors=!1,tinycolor.mostReadable(baseColor,["#fff","#000"],args))};var names=tinycolor.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},hexNames=tinycolor.hexNames=flip(names),matchers=function(){var CSS_INTEGER="[-\\+]?\\d+%?",CSS_NUMBER="[-\\+]?\\d*\\.\\d+%?",CSS_UNIT="(?:"+CSS_NUMBER+")|(?:"+CSS_INTEGER+")",PERMISSIVE_MATCH3="[\\s|\\(]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")\\s*\\)?",PERMISSIVE_MATCH4="[\\s|\\(]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")\\s*\\)?";return{rgb:new RegExp("rgb"+PERMISSIVE_MATCH3),rgba:new RegExp("rgba"+PERMISSIVE_MATCH4),hsl:new RegExp("hsl"+PERMISSIVE_MATCH3),hsla:new RegExp("hsla"+PERMISSIVE_MATCH4),hsv:new RegExp("hsv"+PERMISSIVE_MATCH3),hsva:new RegExp("hsva"+PERMISSIVE_MATCH4),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();"undefined"!=typeof module&&module.exports?module.exports=tinycolor:"function"==typeof define&&define.amd?define(function(){return tinycolor}):window.tinycolor=tinycolor}();
},{}],17:[function(require,module,exports){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
//# sourceMappingURL=underscore-min.map
},{}],18:[function(require,module,exports){
/* Zepto v1.1.3 - zepto event ajax form ie - zeptojs.com/license */


var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (isDocument(element) && isSimple && maybeID) ?
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        isSimple && !maybeID ?
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = function(parent, node) {
    return parent !== node && parent.contains(node)
  }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className,
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    var num
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          !/^0/.test(value) && !isNaN(num = Number(value)) ? num :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0], collection = false
      if (typeof selector == 'object') collection = $(selector)
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
        node = node !== context && !isDocument(node) && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return arguments.length === 0 ?
        (this.length > 0 ? this[0].innerHTML : null) :
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        })
    },
    text: function(text){
      return arguments.length === 0 ?
        (this.length > 0 ? this[0].textContent : null) :
        this.each(function(){ this.textContent = (text === undefined) ? '' : ''+text })
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && value === undefined) ?
        (this.length == 0 || this[0].nodeType !== 1 ? undefined :
          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && setAttribute(this, name) })
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (value === undefined) ?
        (this[0] && this[0][name]) :
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        })
    },
    data: function(name, value){
      var data = this.attr('data-' + name.replace(capitalRE, '-$1').toLowerCase(), value)
      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return arguments.length === 0 ?
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
        ) :
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (this.length==0) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var element = this[0], computedStyle = getComputedStyle(element, '')
        if(!element) return
        if (typeof property == 'string')
          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
        else if (isArray(property)) {
          var props = {}
          $.each(isArray(property) ? property: [property], function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          traverseNode(parent.insertBefore(node, target), function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

exports.$ = exports.Zepto = Zepto;

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      return $.proxy(fn[context], fn)
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (isFunction(data) || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // items in the collection might not be DOM elements
      if('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return callback ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  ;['focus', 'blur'].forEach(function(name) {
    $.fn[name] = function(callback) {
      if (callback) this.bind(name, callback)
      else this.each(function(){
        try { this[name]() }
        catch(e) {}
      })
      return this
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred()
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != window.location.host

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)
    if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now())

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (dataType == 'jsonp' || hasPlaceholder) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
          else ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function($){
  $.fn.serializeArray = function() {
    var result = [], el
    $([].slice.call(this.get(0).elements)).each(function(){
      el = $(this)
      var type = el.attr('type')
      if (this.nodeName.toLowerCase() != 'fieldset' &&
        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
        ((type != 'radio' && type != 'checkbox') || this.checked))
        result.push({
          name: el.attr('name'),
          value: el.val()
        })
    })
    return result
  }

  $.fn.serialize = function(){
    var result = []
    this.serializeArray().forEach(function(elm){
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
    })
    return result.join('&')
  }

  $.fn.submit = function(callback) {
    if (callback) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.isDefaultPrevented()) this.get(0).submit()
    }
    return this
  }

})(Zepto)

;(function($){
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!('__proto__' in {})) {
    $.extend($.zepto, {
      Z: function(dom, selector){
        dom = dom || []
        $.extend(dom, $.fn)
        dom.selector = selector || ''
        dom.__Z = true
        return dom
      },
      // this is a kludge but works
      isZ: function(object){
        return $.type(object) === 'array' && '__Z' in object
      }
    })
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined)
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function(element){
      try {
        return nativeGetComputedStyle(element)
      } catch(e) {
        return null
      }
    }
  }
})(Zepto)
},{}]},{},[1])
>>>>>>> change wording in german help popup
