declare module 'react-native-onesignal' {

  enum InFocusDisplayOption {
    none = 0,
    inAppAlert = 1,
    notification = 2
  }

  enum LogLevel {
    None = 0,
    Fatal = 1,
    Errors = 2,
    Warnings = 3,
    Info = 4,
    Debug = 5,
    Verbose = 6
  }

  type oneSignalEvents = 'received' | 'opened' | 'ids';

  interface Settings {
    kOSSettingsKeyAutoPrompt: boolean,
    kOSSettingsKeyInAppLaunchURL: boolean,
    kOSSSettingsKeyPromptBeforeOpeningPushURL: boolean,
    kOSSettingsKeyInFocusDisplayOption: InFocusDisplayOption
  }

  interface PushData {
    notificationID: string,
    contentAvailable: boolean,
    badge?: number,
    sound: string,
    title: string,
    body: string,
    launchURL?: string,
    additionalData?: object,
    p2p_notification?: Array<any>
  }

  interface OpenResult {
    notification: {
      payload: PushData,
      isAppInFocus: boolean
    }
  }

  interface Permissions {
    alert: boolean,
    badge: boolean,
    sound: boolean
  }

  /**
   * shown If the notification was displayed to the user or not
   * payload the push data
   * displayType The display method of a received notification
   * silentNotification Wether the received notification was a silent one
   */
  interface ReceivedNotification {
    shown: boolean,
    payload: PushData,
    displayType: InFocusDisplayOption,
    silentNotification: boolean
  }


  export default class OneSignal {
    /**
     * Initialize Onesignal
     * @param {string} appId Your app id you can get from OneSignal control panel.
     * @param {"react-native-onesignal".Settings} settings (Optional) Settings for ios.
     */
    public static init(appId: string, settings?: Settings): void;

    /**
     * Undocumented function.
     */
    public static Configure(undocumentedParam1?: any, undocumentedParam2?: any): void;

    /**
     * You can set tag for user with this function.
     * @param {string} key Tag name you want to add to user.
     * @param {string} value Tag value
     */
    public static sendTag(key: string, value: string): void;

    /**
     * You can set multiple tags for user with this function.
     * @param {object} tags Tags you want to set. Sample: {key1: 'value1', key2: 'value2'}
     */
    public static sendTags(tags: object): void;

    /**
     * Getting the tags from the server and use the received object
     * @param {Function} handler You can read tags from this parameter.
     */
    public static getTags(handler: (receivedTags: any) => {}): void;

    /**
     * Allows you to check whether notifications are enabled for the app, whether user is subscribed to notifications through OneSignal, and what the user's in-app subscription preference is. It also provides access to pushToken and userId
     * @param {Function} handler Handler function you can read subscription status from first parameter.
     */
    public static getPermissionSubscriptionState(handler: (status: any) => {}): void;

    /**
     * You can delete tag from user with this function.
     * @param {string} key Tag name you want to delete from user.
     */
    public static deleteTag(key: string): void;

    /**
     * OneSignal now allows you to send emails to your userbase. This email can be set using the OneSignal react-native SDK.
     * @param {string} email User's email address.
     * @param {string} emailAuthCode Email auth code should be securely generated by your backend server
     * @param {Function} callback Handler function for error if it occurred
     */
    public static setEmail(email: string, emailAuthCode: string, callback: (error?: any) => {}): void;

    /**
     * If you don't want to implement email auth hashing on your backend (which is heavily recommended), you can still use the OneSignal email feature in an unauthenticated state with this function.
     * @param {string} email User's email address.
     * @param {Function} callback Handler function for error if it occurred
     */
    public static setEmail(email: string, callback: (error?: any) => {}): void;

    /**
     * If your application implements logout functionality, you can logout of the OneSignal email for this user using the logout function.
     * @param {Function} callback Handler function for error if it occurred
     */
    public static logoutEmail(callback: (error?: any) => {}): void;

    /**
     * You can call this from your UI from a button press for example to give your user's options for your notifications. By default OneSignal always vibrates the device when a notification is displayed unless the device is in a total silent mode. Passing false means that the device will only vibrate lightly when the device is in it's vibrate only mode.
     * @param {boolean} setTo New value you want to set.
     */
    public static enableVibrate(setTo: boolean): void;

    /**
     * You can call this from your UI from a button press for example to give your user's options for your notifications. By default OneSignal plays the system's default notification sound when the device's notification system volume is turned on. Passing false means that the device will only vibrate unless the device is set to a total silent mode.
     * @param {boolean} setTo New value you want to set.
     */
    public static enableSound(setTo: boolean): void;

    /**
     * You can call this method with false to opt users out of receiving all notifications through OneSignal. You can pass true later to opt users back into notifications
     * @param {boolean} setTo New value you want to set.
     */
    public static setSubscription(setTo: boolean): void;

    /**
     * Promts location permission to user.
     */
    public static promptLocation(): void;

    /**
     * Removes all OneSignal notifications from the Notification Shade.
     */
    public static clearOneSignalNotifications(): void;

    /**
     * Disable or enable location collection (defaults to enabled if your app has location permission).
     * @param {boolean} setTo New value you want to set.
     */
    public static setLocationShared(setTo: boolean): void;

    /**
     * Prompts the user for location permissions. This allows for geotagging so you can send notifications to users based on location.
     *
     * Note: Make sure you also have the required location permission in your AndroidManifest.xml. For iOS, make sure you set the NSLocationWhenInUseUsageDescription or the NSLocationAlwaysUsageDescription in your info.plist. (Location Always also requires the location background mode capability)
     * @param {"react-native-onesignal".InFocusDisplayOption} setTo New value you want to set.
     */
    public static inFocusDisplaying(setTo: InFocusDisplayOption): void;

    /**
     * P2P notification
     * @param {object} contents Sample: { en: 'English Message', tr: 'Türkçe Mesaj' }
     * @param {Array<any>} data Some array for payload
     * @param {string} playerId OneSignal Player Id you want to send message to.
     * @param {object} otherParameters Sample: {"ios_attachments" : {"image1" : "{image_url}"}}
     */
    public static postNotification(contents: object, data: Array<any>, playerId: string, otherParameters?: object): void;

    /**
     * Cancels a single OneSignal notification based on its Android notification integer id. You can get the notification Id when invoking OneSignal.onNotificationOpened while receiving a notification.
     * @param {string} notificationId Notification id you want to cancel.
     */
    public static cancelNotification(notificationId: string): void;

    /**
     * See what push permissions are currently enabled. callback will be invoked with a permissions object (currently supported only on iOS).
     * @param {Function} callback Callback function you can read the permissions from first parameter.
     */
    public static checkPermissions(callback: (permissions: any) => {}): void;

    /**
     * Requests Push Notification Permissions (iOS Only)
     * @param {"react-native-onesignal".Permissions} permissions Permissions you want to ask.
     */
    public static requestPermissions(permissions: Permissions): void;

    /**
     * Call when you want to prompt the user to accept push notifications. Only call once and only if you passed @NO to kOSSettingsKeyAutoPrompt on init.
     */
    public static registerForPushNotifications(): void;

    /**
     * IMPORTANT: Use this function before OneSignal.init
     *
     * Allows you to delay the initialization of the SDK until the user provides privacy consent. The SDK will not be fully initialized until the provideUserConsent(true) method is called.
     *
     * If you set this to be true, the SDK will not fully initialize until consent is provided. You can still call OneSignal methods, but nothing will happen, and the user will not be registered for push notifications.
     * @param {boolean} wtf I don't know why this function asking boolean parameter. Just pass true if you don't know what you are doing.
     */
    public static setRequiresUserPrivacyConsent(wtf: boolean): void;

    /**
     * Will initialize the SDK and register for push notifications.
     * @param {boolean} wtf I don't know why this function asking boolean parameter. Just pass true if you don't know what you are doing.
     */
    public static provideUserConsent(wtf: boolean): void;

    /**
     * Enable logging to help debug if you run into an issue setting up OneSignal.
     * @param {"react-native-onesignal".LogLevel} logLevel Sets the logging level to print to the iOS Xcode log or the Android LogCat log.
     * @param {"react-native-onesignal".LogLevel} visualLevel Sets the logging level to show as alert dialogs.
     */
    public static setLogLevel(logLevel: LogLevel, visualLevel: LogLevel): void;

    /**
     * You can bind events with this function.
     * @param {"react-native-onesignal".oneSignalEvents} type Event type you want to subscribe
     * @param {Function} handler Handler function
     */
    public static addEventListener(type: oneSignalEvents, handler: Function): void;

    /**
     * You can remove binded events with this function.
     * @param {"react-native-onesignal".oneSignalEvents} type Event type you want to subscribe
     * @param {Function} handler (Optional) Handler function for solo remove.
     */
    public static removeEventListener(type: oneSignalEvents, handler?: Function): void;
  }
}