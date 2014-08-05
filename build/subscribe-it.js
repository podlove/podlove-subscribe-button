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
    return this.feedUrl = this.scriptElem.dataset.url;
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
      string += "&podcastCoverUrl=" + this.podcast.coverUrl;
    }
    if (this.podcast.subtitle) {
      return string += "&podcastSubtitle=" + this.podcast.subtitle;
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
    this.modal = document.getElementById('subscribe-it-popup-modal');
    this.closeButton = document.getElementById('subscribe-it-popup-close-button');
    this.leftSide = document.getElementById('subscribe-it-popup-modal-left');
    this.middle = document.getElementById('subscribe-it-popup-modal-middle');
    this.rightSide = document.getElementById('subscribe-it-popup-modal-right');
    this.list = document.getElementById('subscribe-it-list');
    this.helptext = document.getElementById('subscribe-it-popup-modal-helptext');
    loc = window.location;
    this.pathPrefix = loc.href.replace(loc.search, '').match(/(^.*\/)/)[0];
    this.addCloseHandler();
    this.addList();
    this.addOtherClientButton();
    this.addPodcastInfo();
    this.adjustHeight();
  }

  SubscribePopup.prototype.addDoneButton = function() {
    var doneButton;
    doneButton = document.createElement('a');
    doneButton.className = 'subscribe-it-install-button subscribe-it-done-button';
    doneButton.href = '#';
    doneButton.addEventListener('click', function() {
      return window.parent.postMessage("{\"message\": \"closepopup\"}", '*');
    });
    doneButton.innerHTML = SubscribeIt.Translations.done[this.params.language];
    return this.rightSide.appendChild(doneButton);
  };

  SubscribePopup.prototype.adjustHeight = function() {
    var clientHeights, maxHeight, panel, panels, _i, _len, _results;
    panels = [this.leftSide, this.middle, this.rightSide];
    clientHeights = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = panels.length; _i < _len; _i++) {
        panel = panels[_i];
        _results.push(panel.clientHeight);
      }
      return _results;
    })();
    maxHeight = Math.max.apply(null, clientHeights);
    panels.push(this.modal);
    _results = [];
    for (_i = 0, _len = panels.length; _i < _len; _i++) {
      panel = panels[_i];
      _results.push(panel.style.height = "" + (maxHeight + 20) + "px");
    }
    return _results;
  };

  SubscribePopup.prototype.addPodcastInfo = function() {
    var explanation, heading, image, name, nextButton, subtitle;
    if (this.params.podcastName) {
      name = document.createElement('strong');
      name.innerHTML = this.params.podcastName;
      this.leftSide.appendChild(name);
    }
    if (this.params.podcastSubtitle) {
      subtitle = document.createElement('div');
      subtitle.innerHTML = this.params.podcastSubtitle;
      this.leftSide.appendChild(subtitle);
    }
    if (this.params.podcastCoverUrl) {
      image = document.createElement('img');
      image.src = this.params.podcastCoverUrl;
      this.leftSide.appendChild(image);
    }
    heading = document.createElement('strong');
    heading.innerHTML = SubscribeIt.Translations.subscribe[this.params.language];
    this.leftSide.appendChild(heading);
    explanation = document.createElement('p');
    explanation.className = 'subscribe-it-explanation';
    explanation.innerHTML = SubscribeIt.Translations.explanation[this.params.language];
    this.leftSide.appendChild(explanation);
    nextButton = document.createElement('a');
    nextButton.className = 'subscribe-it-install-button';
    nextButton.innerHTML = SubscribeIt.Translations.next[this.params.language];
    nextButton.addEventListener('click', function(event) {
      return this.parentNode.parentNode.className = 'show-middle';
    });
    return this.leftSide.appendChild(nextButton);
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

  SubscribePopup.prototype.addList = function() {
    var client, clients, heading, platform, _i, _len, _results;
    heading = document.getElementById('subscribe-it-list-heading');
    heading.innerHTML = SubscribeIt.Translations.launchClient[this.params.language];
    this.addBackButton(this.middle, 'show-left');
    this.addBackButton(this.rightSide, 'show-middle');
    platform = SubscribeIt.UA.detect();
    clients = SubscribeIt.Utils.shuffle(SubscribeIt.Clients[platform]);
    _results = [];
    for (_i = 0, _len = clients.length; _i < _len; _i++) {
      client = clients[_i];
      _results.push(this.addButton(client));
    }
    return _results;
  };

  SubscribePopup.prototype.addBackButton = function(addTo, targetClassName) {
    var backButton;
    backButton = document.createElement('a');
    backButton.className = 'subscribe-it-back-button subscribe-it-install-button';
    backButton.innerHTML = '&lsaquo;';
    backButton.addEventListener('click', function(event) {
      return this.parentNode.parentNode.className = targetClassName;
    });
    return addTo.appendChild(backButton);
  };

  SubscribePopup.prototype.addButton = function(client) {
    var icon, item, link, text;
    text = document.createElement('span');
    link = document.createElement('a');
    item = document.createElement('li');
    link.href = client.scheme + this.params.feedUrl.replace(/^https?:\/\//, '');
    link.target = '_blank';
    text.innerHTML = client.title;
    link.appendChild(text);
    if (client.icon) {
      icon = document.createElement('img');
      icon.src = "" + this.pathPrefix + "images/" + client.icon;
      link.insertBefore(icon, link.firstChild);
    }
    item.appendChild(link);
    this.list.appendChild(item);
    return this.addButtonAction(item, client);
  };

  SubscribePopup.prototype.addOtherClientButton = function() {
    var icon, item, link, text;
    text = document.createElement('span');
    link = document.createElement('a');
    item = document.createElement('li');
    link.href = '#';
    text.innerHTML = SubscribeIt.Translations.otherClient[this.params.language];
    link.appendChild(text);
    icon = document.createElement('img');
    icon.src = "" + this.pathPrefix + "images/rss.png";
    link.insertBefore(icon, link.firstChild);
    item.appendChild(link);
    this.list.appendChild(item);
    return item.addEventListener('click', (function(_this) {
      return function(event) {
        var paragraph;
        _this.helptext.innerHTML = '';
        paragraph = document.createElement('p');
        paragraph.innerHTML = SubscribeIt.Translations.otherClientHelp[_this.params.language];
        _this.helptext.appendChild(paragraph);
        _this.addLinkField(_this.helptext, item);
        event.currentTarget.parentNode.parentNode.parentNode.className = 'show-right';
        return _this.addDoneButton();
      };
    })(this));
  };

  SubscribePopup.prototype.addButtonAction = function(button, client) {
    this.addButtonHover(this.helptext, button, client);
    return this.addButtonClick(this.helptext, button, client);
  };

  SubscribePopup.prototype.addButtonHover = function(target, button, client) {
    button.addEventListener('mouseenter', (function(_this) {
      return function(event) {
        var helpText, text;
        if (button.parentNode.className === 'clicked') {
          return;
        }
        target.innerHTML = '';
        helpText = document.createElement('p');
        text = SubscribeIt.Translations.help[_this.params.language];
        text = SubscribeIt.Template.render(text, {
          clientName: client.title
        });
        helpText.innerHTML = text;
        return target.appendChild(helpText);
      };
    })(this));
    return button.addEventListener('mouseleave', (function(_this) {
      return function(event) {
        if (button.parentNode.className === 'clicked') {
          return;
        }
        return target.innerHTML = '';
      };
    })(this));
  };

  SubscribePopup.prototype.addButtonClick = function(target, button, client) {
    return button.addEventListener('click', (function(_this) {
      return function(event) {
        var installButton, installText, text;
        button.parentNode.className = 'clicked';
        target.innerHTML = '';
        if (client.install) {
          installText = document.createElement('p');
          text = SubscribeIt.Translations.clicked.install.text[_this.params.language];
          text = SubscribeIt.Template.render(text, {
            clientName: client.title
          });
          installText.innerHTML = "" + text;
          target.appendChild(installText);
          installButton = document.createElement('a');
          installButton.className = 'subscribe-it-install-button';
          installButton.target = '_blank';
          installButton.href = client.install;
          text = SubscribeIt.Translations.clicked.install.button[_this.params.language];
          installButton.innerHTML = SubscribeIt.Template.render(text, {
            clientName: client.title
          });
          target.appendChild(installButton);
        } else {
          text = SubscribeIt.Translations.clicked.noinstall.text[_this.params.language];
          target.innerHTML = "" + text;
        }
        event.currentTarget.parentNode.parentNode.parentNode.className = 'show-right';
        return _this.addDoneButton();
      };
    })(this));
  };

  SubscribePopup.prototype.addLinkField = function(target, button) {
    var input, item;
    button.parentNode.className = 'clicked';
    input = document.createElement('input');
    input.value = this.params.feedUrl;
    input.style.textAlign = 'center';
    input.onclick = function() {
      return this.select();
    };
    item = document.createElement('div');
    item.className = 'subscribe-it-link-input';
    item.appendChild(input);
    return target.appendChild(item);
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

SubscribeIt.Template = {
  render: function(tmpl, vals) {
    var noEscapeRepr, noEscapeRgxp, repr, rgxp;
    tmpl = tmpl || "";
    vals = vals || {};
    rgxp = /\{([^{}]*)}/g;
    noEscapeRgxp = /\{{([^{}]*)}}/g;
    repr = function(str, match) {
      var value;
      value = vals[match];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      } else {
        return str;
      }
    };
    noEscapeRepr = function(str, match) {
      var value;
      value = vals[match];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      } else {
        return str;
      }
    };
    return tmpl.replace(noEscapeRgxp, noEscapeRepr);
  }
};

SubscribeIt.Utils = {
  shuffle: function(array) {
    var i, j, t;
    i = array.length;
    while (--i > 0) {
      j = ~~(Math.random() * (i + 1));
      t = array[j];
      array[j] = array[i];
      array[i] = t;
    }
    return array;
  }
};

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
  osx: /macintosh/i,
  windowsPhone: /windows phone/i
};

SubscribeIt.Translations = {
  button: {
    de: 'Abonnieren',
    en: 'Subscribe'
  },
  done: {
    de: 'Fertig',
    en: 'Done'
  },
  subscribe: {
    de: 'Podcast Abonnieren',
    en: 'Subscribe to Podcast'
  },
  explanation: {
    de: 'Um diesen Podcast zu abonnieren, bitte einen Client in der Mitte auswählen.',
    en: 'Please choose a client from the middle to subscribe to this Podcast.'
  },
  help: {
    de: 'Podcast abonnieren mit <strong>{{clientName}}</strong>',
    en: 'Subscribe to Podcast with <strong>{{clientName}}</strong>'
  },
  launchClient: {
    de: 'Client öffnen',
    en: 'Launch client'
  },
  otherClient: {
    de: 'Anderer Client',
    en: 'Other client'
  },
  otherClientHelp: {
    de: 'Kopiere die URL und füge sie in deinem Podcast Client hinzu.',
    en: 'Copy URL and add it to your Podcast Client.'
  },
  next: {
    de: 'Weiter &rsaquo;',
    en: 'Next &rsaquo;'
  },
  back: {
    de: 'Zurück',
    en: 'Back'
  },
  clicked: {
    noinstall: {
      text: {
        de: 'Falls nach dem Klick nichts passiert sein sollte, ist vermutlich kein Client installiert.',
        en: 'If nothing happened after the click you probably have not installed a Client.'
      }
    },
    install: {
      text: {
        de: 'Falls nach dem Klick nichts passiert sein sollte, kannst du <strong>{{clientName}}</strong> hier installieren:',
        en: 'If nothing happened after the click you can install <strong>{{clientName}}</strong> here:'
      },
      button: {
        de: '{{clientName}} Herunterladen',
        en: 'Download {{clientName}}'
      }
    }
  }
};

SubscribeIt.Clients = {
  android: [
    {
      title: 'AntennaPod',
      scheme: 'pcast://',
      platform: ['android'],
      icon: 'android/antennapod@2x.png',
      install: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod'
    }, {
      title: 'BeyondPod',
      scheme: 'pcast://',
      platform: ['android'],
      icon: 'android/beyondpod@2x.png',
      install: 'https://play.google.com/store/apps/details?id=mobi.beyondpod'
    }, {
      title: 'PocketCasts',
      scheme: 'pcast://',
      platform: ['android'],
      icon: 'android/pocketcasts@2x.png',
      install: 'https://play.google.com/store/apps/details?id=au.com.shiftyjelly.pocketcasts'
    }, {
      title: 'Podkicker',
      scheme: 'pcast://',
      platform: ['android'],
      icon: 'android/podkicker@2x.png',
      install: 'https://play.google.com/store/apps/details?id=ait.podka'
    }, {
      title: 'uPod',
      scheme: 'pcast://',
      platform: ['android'],
      icon: 'android/upod@2x.png',
      install: 'https://play.google.com/store/apps/details?id=mobi.upod.app'
    }
  ],
  ios: [
    {
      title: 'Apple Podcasts',
      scheme: 'pcast://',
      platform: ['ios'],
      icon: 'ios/podcasts@2x.png',
      install: 'https://itunes.apple.com/de/app/podcasts/id525463029'
    }, {
      title: 'Castro',
      scheme: 'castro://subscribe/',
      platform: ['ios'],
      icon: 'ios/castro@2x.png',
      install: 'https://itunes.apple.com/de/app/castro-high-fidelity-podcasts/id723142770'
    }, {
      title: 'Downcast',
      scheme: 'downcast://',
      platform: ['ios'],
      icon: 'ios/downcast@2x.png',
      install: 'https://itunes.apple.com/de/app/downcast/id393858566'
    }, {
      title: 'Instacast',
      scheme: 'instacast://',
      platform: ['ios'],
      icon: 'ios/instacast@2x.png',
      install: 'https://itunes.apple.com/de/app/instacast-4-podcast-client/id577056377'
    }, {
      title: 'Overcast',
      scheme: 'overcast://x-callback-url/add?url=',
      platform: ['ios'],
      icon: 'ios/overcast@2x.png',
      install: 'https://itunes.apple.com/de/app/overcast-podcast-player/id888422857'
    }
  ],
  osx: [
    {
      title: 'Downcast',
      scheme: 'downcast://',
      platform: ['osx'],
      icon: 'osx/downcast@2x.png',
      install: 'https://itunes.apple.com/de/app/downcast/id668429425?mt=12&uo=4'
    }, {
      title: 'Instacast',
      scheme: 'instacast://',
      platform: ['osx'],
      icon: 'osx/instacast@2x.png',
      install: 'https://itunes.apple.com/de/app/instacast/id733258666?mt=12&uo=4'
    }, {
      title: 'iTunes',
      scheme: 'itpc://',
      platform: ['osx'],
      icon: 'osx/itunes@2x.png',
      install: 'http://www.apple.com/itunes/'
    }
  ],
  windowsPhone: [
    {
      title: 'Podcasts',
      scheme: 'wp-podcast://',
      platform: 'windowsPhone'
    }
  ]
};
