var IframeResizer, SubscribeButton, SubscribeIt, SubscribePopup, SubscribePopupIframe,
  __hasProp = {}.hasOwnProperty;

IframeResizer = (function() {
  function IframeResizer(listenTo, iframe, offset, callback) {
    if (offset == null) {
      offset = {};
    }
    window.addEventListener('message', (function(event) {
      var height, resizeData, width;
      resizeData = JSON.parse(event.data);
      if (resizeData.id !== listenTo) {
        return;
      }
      height = resizeData.height + (offset.height || 0);
      width = resizeData.width + (offset.width || 0);
      iframe.style.height = "" + height + "px";
      iframe.style.width = "" + width + "px";
      if (callback != null) {
        return callback(iframe);
      }
    }), false);
  }

  IframeResizer.buildData = function(id, height, width) {
    return "{\"id\": \"" + id + "\", \"height\": " + height + ", \"width\": " + width + "}";
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
    this.renderIframe();
  }

  SubscribeIt.prototype.extractScriptPath = function() {
    return this.pathPrefix = this.scriptElem.src.match(/(^.*\/)/)[0];
  };

  SubscribeIt.prototype.extractFeedUrl = function() {
    return this.feedUrl = this.scriptElem.dataset.url.replace(/^https?:\/\//, '');
  };

  SubscribeIt.prototype.extractButtonLanguage = function() {
    return this.buttonLanguage = this.scriptElem.dataset.lang || 'en';
  };

  SubscribeIt.prototype.renderIframe = function() {
    var iframe;
    iframe = this.buildIframe();
    return this.scriptElem.parentElement.replaceChild(iframe, this.scriptElem);
  };

  SubscribeIt.prototype.buildIframe = function() {
    var iframe;
    iframe = document.createElement('iframe');
    iframe.src = "" + this.pathPrefix + "button.html?language=" + this.buttonLanguage;
    iframe.style.border = 'none';
    iframe.style.display = 'inline-block';
    iframe.style.overflow = 'hidden';
    iframe.onload = (function(_this) {
      return function() {
        return iframe.contentDocument.addEventListener('click', function(event) {
          return new SubscribePopupIframe(iframe, _this.feedUrl, _this.pathPrefix);
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
  function SubscribePopupIframe(buttonIframe, feedUrl, pathPrefix) {
    this.buttonIframe = buttonIframe;
    this.feedUrl = feedUrl;
    this.pathPrefix = pathPrefix;
    this.insert();
    this.addCloseListener();
  }

  SubscribePopupIframe.prototype.build = function() {
    var iframe;
    iframe = document.createElement('iframe');
    iframe.className = "subscribe-it-popup-iframe";
    iframe.src = "" + this.pathPrefix + "popup.html?feedUrl=" + this.feedUrl;
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.height = '100vh';
    iframe.style.width = '100vw';
    iframe.style.top = 0;
    iframe.style.left = 0;
    return this.iframe = iframe;
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
    this.body = document.getElementById('subscribe-it-popup');
    this.container = document.getElementById('subscribe-it-list-container');
    this.closeButton = document.getElementById('subscribe-it-popup-close-button');
    this.list = document.getElementById('subscribe-it-list');
    this.addCloseHandler();
    this.extractFeedUrl();
    this.addButtons();
    this.addLinkField();
    this.centerContainer();
  }

  SubscribePopup.prototype.addCloseHandler = function() {
    var close;
    close = function() {
      return window.parent.postMessage("{\"message\": \"closepopup\"}", '*');
    };
    return this.closeButton.addEventListener('click', function() {
      return close();
    });
  };

  SubscribePopup.prototype.extractFeedUrl = function() {
    return this.feedUrl = window.location.search.split('=')[1];
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
    var item, link;
    link = document.createElement('a');
    item = document.createElement('li');
    link.href = client.scheme + '://' + this.feedUrl;
    link.target = '_blank';
    link.innerHTML = client.title;
    item.appendChild(link);
    return this.list.appendChild(item);
  };

  SubscribePopup.prototype.addLinkField = function() {
    var input, item;
    this.inputContainer = document.getElementById('subscribe-it-feed-link-input');
    input = document.createElement('input');
    input.value = this.feedUrl;
    input.onclick = function() {
      return this.select();
    };
    item = document.createElement('div');
    item.className = 'subscribe-it-link-input';
    item.appendChild(input);
    return this.inputContainer.appendChild(item);
  };

  SubscribePopup.prototype.centerContainer = function() {
    var bodyHeight, height;
    height = this.container.clientHeight;
    bodyHeight = this.body.clientHeight;
    return this.container.style.marginTop = "" + ((bodyHeight - height) / 2) + "px";
  };

  return SubscribePopup;

})();

SubscribeButton = (function() {
  function SubscribeButton() {
    var elem, height, lang, resizeData, width;
    lang = window.location.search.split('=')[1];
    elem = document.getElementById('subscribe-it-button');
    elem.innerHTML = SubscribeIt.Translations.button[lang];
    height = elem.offsetHeight;
    width = elem.clientWidth;
    resizeData = IframeResizer.buildData('resizeButton', height, width);
    window.parent.postMessage(resizeData, '*');
  }

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
  }
};

SubscribeIt.Clients = {
  applepodcastsapp: {
    title: 'Apple Podcasts',
    scheme: 'pcast',
    platform: ['ios']
  },
  downcast: {
    title: 'Downcast',
    scheme: 'downcast',
    platform: ['ios', 'mac']
  },
  instacast: {
    title: 'Instacast',
    scheme: 'instacast',
    platform: ['ios', 'mac']
  },
  pocketcasts: {
    title: 'PocketCasts',
    scheme: 'pcast',
    platform: ['ios', 'android']
  }
};
