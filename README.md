# IonicCapcitorPoC
PoC for hybrid project with IonicFramework on UI and Capacitor for interaction with Core Native Modules 

## New Ionic Angular project

Follow this [guide](https://ionicframework.com/docs/developing/starting)

## Scenario

**Tab 1**: To Do 
- Add new To Do 
- Auto async store into local storage (SharedPreferences)
- Check Done To Do (text is break through)
- Remove To Do that already checked
  
**Tab 2**: Google Map (optional) => add third party & play with this

**Tab 3**: Navigation
- Show list of contacts, then click on an item to open new **Contact Detail Page**
- Set Up Push Notification with Firebase (send global push)

## Preferences

Simple ToDo app by Ionic + Angular + FireStore
Here is [example](https://github.com/AndrewJBateman/ionic-angular-todo-app)

Ionic Navigation
Here is [guide](https://medium.com/@codesundar/ionic-4-navigation-tutorial-9dd530d10ab3)

Push Notification
Official FCM set up is [here](https://ionicframework.com/docs/native/fcm)

for Android, there is a bug in cordova plugin, so we need to edit code in `node_modules`

> It's caused by this line apply plugin: com.google.gms.googleservices.GoogleServicesPlugin at node_modules/|cordova-plugin-fcm-with-dependecy-updated/src/android/FCMPlugin.gradle


## Build, Run & Deploy

### Build & Run on iOS

In terminal, run this:
`ionic capacitor copy ios`

To run simulator with LIVE reload, run this:
`ionic capacitor run ios -l --external`

To run by XCode, open Xcode and run as native app.

### Build & Run on Android 

In terminal, run this:
`ionic capacitor copy android`

Then, to run on android devices:
`ionic capacitor run android -l --host=YOUR_LOCAL_HOST_IP_ADDRESS`

To run with LIVE reload, run this:
`ionic capacitor run android -l --external`

### Deploy

Using [AppFlow](https://ionic.io/appflow) as official CI/CD system supports for Ionic