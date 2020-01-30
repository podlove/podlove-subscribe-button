_ = require('underscore')
Handlebars = require('handlebars')

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

      _.forEach last_key.split('_'), (split_key) ->
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

  @defaultLanguage: 'en'

  supportsLanguage: () ->
    keys = Object.keys(@_translations)
    if keys.indexOf(@locale) != -1
      true
    else
      false

  _translations:
    de:
      button: "Abonnieren"
      panels:
        title: "Abonnieren"
      podcast_panel:
        choose_client: "Weiter"
      help_panel:
        title: "Abonnieren?"
        paragraph1: "Dank eines Abonnements verpasst du keine Episode dieses Podcasts mehr."
        paragraph2: "Nach dem Abonnieren lädt eine Podcast-App automatisch neue Folgen herunter und gibt dir Zugriff auf das Episoden-Archiv."
        paragraph3: "Der Podlove Subscribe Button macht das Abonnieren leichter. Wähle eine App oder einen Cloud-Service aus und lasse den Button alles Weitere erledigen. Benutze den Download-Link, um die App falls nötig zu installieren."
      clients_panel:
        app: "App"
        cloud: "Cloud"
        other_client: "Andere App"
        let_device_decide: "Automatisch erkennen"
      finish_panel:
        handing_over_to: "Übergebe an<br> %{client}"
        something_went_wrong: "Funktioniert etwas nicht wie erwartet?"
        try_again: "Nochmal versuchen"
        install: "%{client} installieren"
        register_an_account: "Einen Account registrieren bei "
        please_copy_url: "Bitte die URL kopieren und in deine Podcast- oder RSS-App einfügen."
        copy_button_text: "URL kopieren"
        copy_success: "URL in die Zwischenablage kopiert."
        or_install: "oder App installieren"

    en:
      button: "Subscribe"
      panels:
        title: "Subscribe"
      podcast_panel:
        choose_client: "Continue"
      help_panel:
        title: "Subscribe?"
        paragraph1: "You are about to subscribe to a podcast. This will allow your podcast app to automatically download new episodes or access the archive of previously released episodes."
        paragraph2: "The Podlove Subscribe Button helps you to do this. Select your favorite podcast app from a list of potential apps on your device or pick a podcast cloud service on the web that you use."
        paragraph3: "Upon launch, the podcast client should offer you to add the podcast to your list of subscriptions. Use the download link to get the app if not yet available."
      clients_panel:
        app: "App"
        cloud: "Cloud"
        other_client: "Other App"
        let_device_decide: "Let device decide"
      finish_panel:
        handing_over_to: "Handing over to %{client}"
        something_went_wrong: "Did something go wrong?"
        try_again: "Try again"
        install: "Install %{client}"
        register_an_account: "Register an account with "
        please_copy_url: "Please copy the URL below and add it to your podcast or RSS app."
        copy_button_text: "Copy URL"
        copy_success: "URL copied to clipboard"
        or_install: "or install app"

    eo:
      button: "Aboni"
      panels:
        title: "Aboni"
      podcast_panel:
        choose_client: "Elekti aplikaĵon"
      help_panel:
        title: "Ĉu aboni?"
        paragraph1: "Per abono de podkasto vi permesos al via podkasta aplikaĵo aŭtomate elŝuti novajn aŭ arkivajn epizodojn."
        paragraph2: "La Podlove Abonbutono helpas vin fari tion. Elektu vian plej ŝatatan podkastan aplikaĵon el listo de eblaj aplikaĵoj sur via aparato aŭ elektu vian uzatan nuban servon en la reto."
        paragraph3: "Lanĉate la podkasta aplikaĵo ebligu al vi aldoni la podkaston al via abonlisto. Uzu la elŝut-ligilon, se la aplikaĵo ankoraŭ ne estas instalita."
      clients_panel:
        app: "Aplikaĵo"
        cloud: "Nubo"
        other_client: "Alia aplikaĵo"
      finish_panel:
        handing_over_to: "Transdonanta al %{client}"
        something_went_wrong: "Ĉu io misfunkciis?"
        try_again: "Reprovi"
        install: "Viziti la retejon de %{client}"
        register_an_account: "Registriĝi ĉe "
        please_copy_url: "Bonvolu kopii la suban URLn kaj aldoni ĝin al via podkasta aplikaĵo aŭ RSS-legilo."
        copy_button_text: "Copy URL"
        copy_success: "URL copied to clipboard"
        or_install: "aŭ instali la aplikaĵon"

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
        copy_button_text: "Copy URL"
        copy_success: "URL copied to clipboard"
        or_install: "tai installoi ohjelma"

    fr:
      button: "Souscrire"
      panels:
        title: "Souscrire"
      podcast_panel:
        choose_client: "Choisir App"
      help_panel:
        title: "Souscrire?"
        paragraph1: "Vous êtes sur le point de souscrire à un podcast. Ceci permettra à votre application podcast de télécharger automatiquement de nouveaux épisodes ou d’accéder aux archives d’épisodes préalablement diffusés."
        paragraph2: "Le bouton souscrire au Podlove vous aide à faire cela. Sélectionnez votre application podcast favorite à partir d’une liste d’applications potentielles sur votre appareil ou choisissez le service podcast dans le cloud que vous utilisez."
        paragraph3: "Durant le lancement, le client podcast devrait vous offrir la possibilité d’ajouter le podcast à votre liste de souscriptions. Utilisez le lien de téléchargement pour obtenir l’application si celle-ci n’est pas encore présente."
      clients_panel:
        app: "App"
        cloud: "Cloud"
        other_client: "Autre App"
      finish_panel:
        handing_over_to: "Transfert vers %{client}"
        something_went_wrong: "Y a-t-il eut des problèmes?"
        try_again: "Essayer à nouveau"
        install: "Visiter le site de %{client}"
        register_an_account: "Enregistrer un compte avec"
        please_copy_url: "Veuillez copier l’URL ci-dessous et ajoutez le à votre application de podcasts ou application RSS."
        copy_button_text: "Copier l'URL"
        copy_success: "URL copié"
        or_install: "ou installer l'application"

    nl:
      button: "Abonneren"
      panels:
        title: "Abonneren"
      podcast_panel:
        choose_client: "App kiezen"
      help_panel:
        title: "Abonneren?"
        paragraph1: "U staat op het punt een podcast te abonneren. Hierdoor kan uw podcast app nieuwe afleveringen automatisch downloaden of toegang tot het archief van eerder uitgebrachte afleveringen geven."
        paragraph2: "De Podlove Abonneren Button helpt u om dit te doen. Kies uw favoriete podcast app van een lijst van potentiële apps op uw apparaat of kies een podcast cloud service op het web die u gebruikt."
        paragraph3: "Bij de lancering moet de podcast client u aanbieden om de podcast toe te voegen aan uw lijst met abonnementen. Gebruik de download link naar de app, indien nog niet beschikbaar."
      clients_panel:
        app: "App"
        cloud: "Cloud"
        other_client: "Ander app"
      finish_panel:
        handing_over_to: "Overhandigen aan %{client}"
        something_went_wrong: "Is er iets mis gegaan?"
        try_again: "Probeer opnieuw"
        install: "Bezoek %{client} website"
        register_an_account: "Registreren op "
        please_copy_url: "Kopieer de URL hieronder en voeg deze toe aan uw podcast of RSS-app."
        copy_button_text: "Copy URL"
        copy_success: "URL copied to clipboard"
        or_install: "Of installeer de app"

    no:
      button: "Abonner"
      panels:
        title: "Abonner"
      podcast_panel:
        choose_client: "Velg program"
      help_panel:
        title: "Abonner?"
        paragraph1: "Du er i ferd med å abonnere på en podcast. Dette gir din podcast mulighet til å automatisk laste ned nye episoder, og gir tilgang til arkiv med tidligere publiserte episoder."
        paragraph2: "Abonnerknappen hjelper deg å gjøre dette. Velg din favoritt podcast app fra en liste over potensielle apps på enheten eller velge en podcast skytjeneste på nettet som du bruker."
        paragraph3: "Upon launch, the podcast client should offer you to add the podcast to your list of subscriptions. Use the download link to get the app if not yet available."
      clients_panel:
        app: "Program"
        cloud: "Sky"
        other_client: "Andre program"
      finish_panel:
        handing_over_to: "Handing over to %{client}"
        something_went_wrong: "Gikk noe galt?"
        try_again: "Prøv igjen"
        install: "Besøk %{client} nettside"
        register_an_account: "Registrer konto hos "
        please_copy_url: "Vennligst kopier URLen nedenfor og legg den til din podcast eller RSS."
        or_install: "eller installer app"

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
        copy_button_text: "Copy URL"
        copy_success: "URL copied to clipboard"
        or_install: "or install app"

    ru:
      button: "Подписаться"
      panels:
        title: "Подписаться"
      podcast_panel:
        choose_client: "выберите приложение."
      help_panel:
        title: "Подписаться?"
        paragraph1: "Вы собираетесь подписаться на подкаст. Это позволит вашему подкаст приложению автоматически загружать новые эпизоды или получить доступ к архиву ранее выпущенных эпизодов."
        paragraph2: "Кнопка Подписаться поможет вам сделать это. Выберите своё любимое подкаст приложение из списка потенциальных приложений для вашего устройства или выберите облачный сервис в интернете, который вы используете."
        paragraph3: "При запуске, подкаст приложение должно предложить вам добавить подкаст в свой список подписок. Используйте ссылку, чтобы получить приложение, если его ещё не имеется."
      clients_panel:
        app: "Приложение"
        cloud: "Облоко"
        other_client: "другое приложение"
      finish_panel:
        handing_over_to: "перейти к %{client}"
        something_went_wrong: "Что-то пошло не так?"
        try_again: "попробуйте еще раз"
        install: "посетите сайт %{client}"
        register_an_account: "Зарегистрируйте аккаунт с"
        please_copy_url: "пожалуйста скопируйте ссылку внизу и добавьте к своему подкаст или RSS приложению"
        or_install: "Или установите приложение\n"

    zh:
      button: "订阅"
      panels:
        title: "订阅"
      podcast_panel:
        choose_client: "Choose App"
      help_panel:
        title: "订阅？"
        paragraph1: "你在订阅一个播客，它会自动下载新的广播节目或进入以前的下载目录。"
        paragraph2: "这个订阅键将协助你完成。从你的设备或者播客云服务上选择你喜欢的应用。"
        paragraph3: "启动时，播客客户端会提醒你将播客加入你的订阅列表中。如还未安装，也可通过链接下载安装此应用。"
      clients_panel:
        app: "应用"
        cloud: "云"
        other_client: "其他应用"
      finish_panel:
        handing_over_to: "提交给%{client}"
        something_went_wrong: "有错误？"
        try_again: "重试"
        install: "访问%{client}网站"
        register_an_account: "注册账号 "
        please_copy_url: "请复制下面的链接，添加到你的播客或RSS应用中。"
        copy_button_text: "Copy URL"
        copy_success: "URL copied to clipboard"
        or_install: "或安装应用"

module.exports = Translations
