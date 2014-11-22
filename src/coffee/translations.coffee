_ = require('../../vendor/underscore-min.js')
Handlebars = require('../../vendor/handlebars.min.js').Handlebars

class Translations
  constructor: (language) ->
    @locale = language.split('-')[0]

    Handlebars.registerHelper 't', (key, options) =>
      new Handlebars.SafeString(@t(key, options.hash))

  t: (key, options={}) -> @translate(key, options)

  translate: (key, options={}) ->
    key_array = key.split('.')

    _translations = @_translations[@locale]

    value = null
    last_key = null
    _.each key_array, (key) ->
      last_key = key
      value = if value
        value[key]
      else
        _translations[key]

    unless value?
      value_array = []

      angular.forEach last_key.split('_'), (split_key) ->
        value_array.push(split_key.charAt(0).toUpperCase() + split_key.slice(1))

      value = value_array.join(' ')

    @interpolate(value, options)

  interpolate: (string, interpolations) =>
    string = string.replace /%{([^{}]*)}/g, (a, b) ->
      r = interpolations[b]
      if typeof r == 'string' || typeof r == 'number'
        r
      else
        a
    string

  _translations:
    de:
      button: "Abonnieren"
      panels:
        title: "Abonnieren"
      podcast_panel:
        choose_client: "App auswählen"
      help_panel:
        title: "Abonnieren?"
        paragraph1: "Ein Abonnement erlaubt einer Podcast App, neue Folgen automatisch herunter zu laden oder das Podcast Archiv mit alten Episoden zu durchsuchen."
        paragraph2: "Der Podlove Subscribe Button hilft dir dabei. Wähle deine favorisierte Podcast App aus der Liste der verfügbaren Apps oder wähle einen Podcast Cloud Service den du benutzt."
        paragraph3: "Beim Start sollte der Podcast App den Podcast zur Liste der Abonnements hinzufügen. Benutze den Download Link um die App zu installieren, falls sie es noch nicht ist."
      clients_panel:
        app: "App"
        cloud: "Cloud"
        other_client: "Andere App"
      finish_panel:
        handing_over_to: "Übergebe an<br> %{client}"
        something_went_wrong: "Funktioniert etwas nicht wie erwartet?"
        try_again: "Nochmal versuchen"
        install: "%{client} Webseite besuchen"
        register_an_account: "Einen Account registrieren bei "
        please_copy_url: "Bitte die URL kopieren und in deine Podcast- oder RSS-App einfügen."
        or_install: "oder App installieren"

    en:
      button: "Subscribe"
      panels:
        title: "Subscribe"
      podcast_panel:
        choose_client: "Choose App"
      help_panel:
        title: "Subscribe?"
        paragraph1: "You are about to subscribe to a podcast. This will allow your podcast app to automatically download new episodes or access the archive of previously released episodes."
        paragraph2: "The Podlove Subscribe Button helps you to do this. Select your favorite podcast app from a list of potential apps on your device or pick a podcast cloud service on the web that you use."
        paragraph3: "Upon launch, the podcast client should offer you to add the podcast to your list of subscriptions. Use the download link to get the app if not yet available."
      clients_panel:
        app: "App"
        cloud: "Cloud"
        other_client: "Other App"
      finish_panel:
        handing_over_to: "Handing over to %{client}"
        something_went_wrong: "Did something go wrong?"
        try_again: "Try again"
        install: "Visit %{client} website"
        register_an_account: "Register an account with "
        please_copy_url: "Please copy the URL below and add it to your podcast or RSS app."
        or_install: "or install app"

    fi:
      button: "Tilaa"
      panels:
        title: "Tilaa"
      podcast_panel:
        choose_client: "Valitse ohjelma"
      help_panel:
        title: "Haluatko tilata?"
        paragraph1: "You are about to subscribe to a podcast. This will allow your podcast app to automatically download new episodes or access the archive of previously released episodes."
        paragraph2: "The Podlove Subscribe Button helps you to do this. Select your favorite podcast app from a list of potential apps on your device or pick a podcast cloud service on the web that you use."
        paragraph3: "Upon launch, the podcast client should offer you to add the podcast to your list of subscriptions. Use the download link to get the app if not yet available."
      clients_panel:
        app: "App"
        cloud: "Cloud"
        other_client: "Eri ohjelma"
      finish_panel:
        handing_over_to: "Annetaan %{client}:lle"
        something_went_wrong: "Menikö jotain väärin?"
        try_again: "Kokeile uudestaan"
        install: "Mene %{client}:n sivustolle"
        register_an_account: "Rekisteröidy"
        please_copy_url: "Ole hyvä ja kopioi alla olevan linkin ja syötä se sinuun podcast tai RSS ohjelmaan."
        or_install: "tai installoi ohjelma"

    ja:
      button: "登録する"
      panels:
        title: "登録する"
      podcast_panel:
        choose_client: "クライアントを選ぶ"
      help_panel:
        title: "登録がよろしいですか？"
        paragraph1: "今新しいポットキャストを登録しています。それでポットキャストクライアントアプリケーションで新しいエピソードを自動でダウンロードできる、またはポットキャストアーカイブで過去のエピソードを探せます。"
        paragraph2: "ポットラブ登録ボタンは登録を支援します。気に入り、使っているポットキャストクライアントがポットキャストクラウドサービスを使用可能なもののリストを選んで下さい。"
        paragraph3: "スタートアップでポットキャストクライアントがポットキャストを登録はずです。アプリがまだインストールしなかったら、ダウンロードリンクをインストールために使って下さい。"
      clients_panel:
        app: "アプリ"
        cloud: "クラウド"
        other_client: "他のクライアント"
      finish_panel:
        handing_over_to: "%{client}に渡す"
        something_went_wrong: "何が失敗しましたか？"
        try_again: "もう一度試してください"
        install: "Visit %{client} website"
        register_an_account: "%{client}にアカウントを登録する"
        please_copy_url: "URLをコピーして、ポットキャストがRSSクライアントに貼り付けて下さい。"
        or_install: "or install app"

module.exports = Translations
