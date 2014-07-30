var IframeResizer, SubscribeButton, SubscribeIt, SubscribePopup, SubscribePopupIframe,
  __hasProp = {}.hasOwnProperty;

IframeResizer = (function() {
  function IframeResizer(listenTo, iframe, offset, callback) {
    if (offset == null) {
      offset = {};
    }
    window.addEventListener('message', ((function(_this) {
      return function(event) {
        var height, resizeData, width;
        resizeData = JSON.parse(event.data);
        if (resizeData.id !== iframe.id) {
          return;
        }
        if (resizeData.listenTo !== listenTo) {
          return;
        }
        height = resizeData.height + (offset.height || 0);
        width = resizeData.width + (offset.width || 0);
        iframe.style.height = "" + height + "px";
        iframe.style.width = "" + width + "px";
        if (callback != null) {
          return callback(iframe);
        }
      };
    })(this)), false);
  }

  IframeResizer.buildData = function(listenTo, height, width, iframeId) {
    return "{\"id\": \"" + iframeId + "\", \"listenTo\": \"" + listenTo + "\", \"height\": " + height + ", \"width\": " + width + "}";
  };

  return IframeResizer;

})();

SubscribeIt = (function() {
  SubscribeIt.init = function(elemName) {
    var elem, elems, _i, _len, _results;
    if (elemName == null) {
      elemName = 'subscribe-it';
    }
    elems = document.getElementsByName(elemName);
    _results = [];
    for (_i = 0, _len = elems.length; _i < _len; _i++) {
      elem = elems[_i];
      _results.push(new SubscribeIt(elem));
    }
    return _results;
  };

  function SubscribeIt(scriptElem) {
    this.scriptElem = scriptElem;
    this.extractScriptPath();
    this.extractFeedUrl();
    this.extractButtonLanguage();
    this.extractButtonSize();
    this.extractPodcastData();
    this.renderIframe();
  }

  SubscribeIt.prototype.extractScriptPath = function() {
    return this.pathPrefix = this.scriptElem.src.match(/(^.*\/)/)[0];
  };

  SubscribeIt.prototype.extractFeedUrl = function() {
    return this.feedUrl = this.scriptElem.dataset.url.replace(/^https?:\/\//, '');
  };

  SubscribeIt.prototype.extractButtonLanguage = function() {
    return this.buttonLanguage = this.scriptElem.dataset.language || 'en';
  };

  SubscribeIt.prototype.extractButtonSize = function() {
    return this.buttonSize = this.scriptElem.dataset.size || 'medium';
  };

  SubscribeIt.prototype.extractPodcastData = function() {
    var string;
    if (string = this.scriptElem.dataset.podcast) {
      return this.podcast = JSON.parse(string.replace(/'/g, '"'));
    }
  };

  SubscribeIt.prototype.buttonParams = function() {
    return {
      size: this.buttonSize,
      language: this.buttonLanguage
    };
  };

  SubscribeIt.prototype.renderIframe = function() {
    var iframe;
    iframe = this.buildIframe();
    return this.scriptElem.parentElement.replaceChild(iframe, this.scriptElem);
  };

  SubscribeIt.prototype.buildIframe = function() {
    var id, iframe;
    id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    iframe = document.createElement('iframe');
    iframe.src = "" + this.pathPrefix + "button.html?language=" + this.buttonLanguage + "&size=" + this.buttonSize + "&id=" + id;
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframe.style.overflow = 'hidden';
    iframe.className = 'podlove-subscribe-button';
    iframe.id = id;
    iframe.onload = (function(_this) {
      return function() {
        return iframe.contentDocument.addEventListener('click', function(event) {
          return new SubscribePopupIframe(iframe, _this.feedUrl, _this.pathPrefix, _this.podcast, _this.buttonLanguage);
        });
      };
    })(this);
    new IframeResizer('resizeButton', iframe);
    return iframe;
  };

  return SubscribeIt;

})();

new SubscribeIt.init();

SubscribePopupIframe = (function() {
  function SubscribePopupIframe(buttonIframe, feedUrl, pathPrefix, podcast, language) {
    this.buttonIframe = buttonIframe;
    this.feedUrl = feedUrl;
    this.pathPrefix = pathPrefix;
    this.podcast = podcast;
    this.language = language;
    this.insert();
    this.addCloseListener();
  }

  SubscribePopupIframe.prototype.build = function() {
    var iframe;
    iframe = document.createElement('iframe');
    iframe.className = "subscribe-it-popup-iframe";
    iframe.src = "" + this.pathPrefix + "popup.html?feedUrl=" + this.feedUrl + "&language=" + this.language + (this.podcastInfo());
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.height = '100vh';
    iframe.style.width = '100vw';
    iframe.style.top = 0;
    iframe.style.left = 0;
    return this.iframe = iframe;
  };

  SubscribePopupIframe.prototype.podcastInfo = function() {
    var string;
    string = '';
    if (!this.podcast) {
      return string;
    }
    if (this.podcast.name) {
      string += "&podcastName=" + this.podcast.name;
    }
    if (this.podcast.coverUrl) {
      return string += "&podcastCoverUrl=" + this.podcast.coverUrl;
    }
  };

  SubscribePopupIframe.prototype.insert = function() {
    return document.body.appendChild(this.build());
  };

  SubscribePopupIframe.prototype.remove = function() {
    return this.iframe.parentNode.removeChild(this.iframe);
  };

  SubscribePopupIframe.prototype.addCloseListener = function() {
    var reactToPopupMessage, removePopup;
    document.body.addEventListener('click', function() {
      return document.body.dispatchEvent(new Event('click.subscribe-it'));
    });
    reactToPopupMessage = function(event) {
      if (JSON.parse(event.data).message === 'closepopup') {
        return removePopup();
      }
    };
    window.addEventListener('message', reactToPopupMessage, false);
    document.body.addEventListener('click.subscribe-it', removePopup);
    return removePopup = (function(_this) {
      return function() {
        _this.remove();
        document.body.removeEventListener('click.subscribe-it', removePopup);
        return window.removeEventListener('message', reactToPopupMessage, false);
      };
    })(this);
  };

  SubscribePopupIframe.prototype.buttonDimensions = function() {
    return this.buttonRect != null ? this.buttonRect : this.buttonRect = this.buttonIframe.getBoundingClientRect();
  };

  return SubscribePopupIframe;

})();

SubscribePopup = (function() {
  function SubscribePopup() {
    var loc;
    this.extractParams();
    this.body = document.getElementById('subscribe-it-popup');
    this.container = document.getElementById('subscribe-it-list-container');
    this.closeButton = document.getElementById('subscribe-it-popup-close-button');
    this.leftSide = document.getElementById('subscribe-it-popup-modal-left');
    this.list = document.getElementById('subscribe-it-list');
    loc = window.location;
    this.pathPrefix = loc.href.replace(loc.search, '').match(/(^.*\/)/)[0];
    this.addCloseHandler();
    this.addButtons();
    this.addPodcastInfo();
  }

  SubscribePopup.prototype.addPodcastInfo = function() {
    var heading, image, name;
    heading = this.leftSide.getElementsByTagName('h1')[0];
    heading.innerHTML = SubscribeIt.Translations.subscribe[this.params.language];
    if (this.params.podcastName) {
      name = document.createElement('div');
      name.innerHTML = this.params.podcastName;
      this.leftSide.appendChild(name);
    }
    if (this.params.podcastCoverUrl) {
      image = document.createElement('img');
      image.src = this.params.podcastCoverUrl;
      return this.leftSide.appendChild(image);
    }
  };

  SubscribePopup.prototype.extractParams = function() {
    var param, split, string, _i, _len, _results;
    string = window.location.search.replace(/^\?/, '');
    split = string.split('&');
    this.params = {};
    _results = [];
    for (_i = 0, _len = split.length; _i < _len; _i++) {
      param = split[_i];
      _results.push(this.buildParamObject(param, this.params));
    }
    return _results;
  };

  SubscribePopup.prototype.buildParamObject = function(string, object) {
    var array;
    array = string.split('=');
    return object[array[0]] = decodeURIComponent(array[1]);
  };

  SubscribePopup.prototype.addCloseHandler = function() {
    var close;
    close = function() {
      return window.parent.postMessage("{\"message\": \"closepopup\"}", '*');
    };
    return this.closeButton.addEventListener('click', function() {
      return close();
    });
  };

  SubscribePopup.prototype.addButtons = function() {
    var clientData, clientId, platform, _ref, _results;
    platform = SubscribeIt.UA.detect();
    _ref = SubscribeIt.Clients;
    _results = [];
    for (clientId in _ref) {
      if (!__hasProp.call(_ref, clientId)) continue;
      clientData = _ref[clientId];
      if (clientData.platform.indexOf(platform) !== -1) {
        _results.push(this.addButton(clientData));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  SubscribePopup.prototype.addButton = function(client) {
    var icon, item, link, text;
    text = document.createElement('span');
    link = document.createElement('a');
    item = document.createElement('li');
    link.href = client.scheme + '://' + this.params.feedUrl;
    link.target = '_blank';
    text.innerHTML = client.title;
    link.appendChild(text);
    if (client.icon) {
      icon = document.createElement('img');
      icon.src = "" + this.pathPrefix + "images/" + client.icon;
      link.insertBefore(icon, link.firstChild);
    }
    item.appendChild(link);
    return this.list.appendChild(item);
  };

  SubscribePopup.prototype.addLinkField = function() {
    var input, item;
    this.inputContainer = document.getElementById('subscribe-it-feed-link-input');
    input = document.createElement('input');
    input.value = this.params.feedUrl;
    input.style.textAlign = 'center';
    input.onclick = function() {
      return this.select();
    };
    item = document.createElement('div');
    item.className = 'subscribe-it-link-input';
    item.appendChild(input);
    return this.inputContainer.appendChild(item);
  };

  return SubscribePopup;

})();

SubscribeButton = (function() {
  function SubscribeButton() {
    var elem, lang, size;
    this.extractParams();
    lang = window.location.search.split('=')[1];
    size = window.location.search.split('=')[1];
    elem = document.getElementById('subscribe-it-button');
    elem.className = this.params.size;
    elem.innerHTML = "<span>" + SubscribeIt.Translations.button[this.params.language] + "</span>";
    this.resizeIframe(elem);
  }

  SubscribeButton.prototype.extractParams = function() {
    var param, split, string, _i, _len, _results;
    string = window.location.search.replace(/^\?/, '');
    split = string.split('&');
    this.params = {};
    _results = [];
    for (_i = 0, _len = split.length; _i < _len; _i++) {
      param = split[_i];
      _results.push(this.buildParamObject(param, this.params));
    }
    return _results;
  };

  SubscribeButton.prototype.buildParamObject = function(string, object) {
    var array;
    array = string.split('=');
    return object[array[0]] = array[1];
  };

  SubscribeButton.prototype.resizeIframe = function(elem) {
    var height, newHeight, newWidth, resizeData, styles, width;
    styles = document.defaultView.getComputedStyle(elem);
    height = parseInt(styles.height, 10);
    width = parseInt(styles.width, 10);
    newHeight = height + 2;
    newWidth = width;
    resizeData = IframeResizer.buildData('resizeButton', newHeight, newWidth, this.params.id);
    return window.parent.postMessage(resizeData, '*');
  };

  return SubscribeButton;

})();

SubscribeIt.UA = (function() {
  return {
    detect: function() {
      var regex, ua, userAgent, _ref;
      userAgent = (window.navigator && navigator.userAgent) || "";
      _ref = SubscribeIt.UAs;
      for (ua in _ref) {
        if (!__hasProp.call(_ref, ua)) continue;
        regex = _ref[ua];
        if (regex.test(userAgent)) {
          return ua;
        }
      }
    }
  };
})();

SubscribeIt.UAs = {
  android: /android/i,
  ios: /(ipad|iphone|ipod)/i,
  linux: /linux/i,
  mac: /macintosh/i,
  windowsPhone: /windows phone/i
};

SubscribeIt.Translations = {
  button: {
    de: 'Abonnieren',
    en: 'Subscribe',
    fr: 'S\'Abonner'
  },
  subscribe: {
    de: 'Podcast Abonnieren',
    en: 'Subscribe to Podcast',
    fr: 'S\'Abonner Podcast'
  }
};

SubscribeIt.Clients = {
  antennapod: {
    title: 'AntennaPod',
    scheme: 'pcast',
    platform: ['android'],
    icon: 'android/antennapod.png'
  },
  applepodcastsapp: {
    title: 'Apple Podcasts',
    scheme: 'pcast',
    platform: ['ios'],
    icon: 'ios/podcasts.jpg'
  },
  beyondpod: {
    title: 'BeyondPod',
    scheme: 'pcast',
    platform: ['android'],
    icon: 'android/beyondpod.png'
  },
  downcast: {
    title: 'Downcast',
    scheme: 'downcast',
    platform: ['mac'],
    icon: 'mac/downcast.png'
  },
  downcastmac: {
    title: 'Downcast',
    scheme: 'downcast',
    platform: ['ios'],
    icon: 'ios/downcast.jpg'
  },
  instacast: {
    title: 'Instacast',
    scheme: 'instacast',
    platform: ['ios'],
    icon: 'ios/instacast.png'
  },
  instacastmac: {
    title: 'Instacast',
    scheme: 'instacast',
    platform: ['mac'],
    icon: 'mac/instacast.png'
  },
  itunes: {
    title: 'iTunes',
    scheme: 'itpc',
    platform: ['mac'],
    icon: 'mac/itunes.png'
  },
  pocketcasts: {
    title: 'PocketCasts',
    scheme: 'pcast',
    platform: ['android'],
    icon: 'android/pocketcasts.png'
  },
  pocketcastsios: {
    title: 'PocketCasts',
    scheme: 'pktc',
    platform: ['ios'],
    icon: 'ios/pocketcasts.png'
  },
  podcat: {
    title: 'Podcat',
    scheme: 'podcat',
    platform: ['ios'],
    icon: 'ios/podcat.png'
  },
  windowspodcastsapp: {
    title: 'Podcasts',
    scheme: 'podcast',
    platform: 'windowsPhone'
  }
};
