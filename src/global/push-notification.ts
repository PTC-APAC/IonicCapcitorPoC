import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PushNotification {
  private onNotificationReceived: Subscription;

  constructor(private fcm: FCM, private platform: Platform) {
    this.onNotificationReceived = this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });
  }

  async start(): Promise<String> {
    const permission = await this.fcm.hasPermission();
    console.log('HAS PERMISSION =', permission);
    if (!permission) {
      if (this.platform.is('ios')) {
        console.log('REQUEST PUSH PERMISSION');
        await this.fcm.requestPushPermission();
      }
    }
    this.fcm.onTokenRefresh().subscribe(t => { 
      console.log('TOKEN REFRESH RIGHT NOW =', t);
    });

    const token = await this.fcm.getToken();
    console.log('FCM TOKEN =', token);
    
    return token;
  }
  
// this.fcm.subscribeToTopic('marketing');


// this.fcm.onTokenRefresh().subscribe(token => {
//   backend.registerToken(token);
// });

// this.fcm.hasPermission().then(hasPermission => {
//   if (hasPermission) {
//     console.log("Has permission!");
//   }
// })

// this.fcm.clearAllNotifications();

// this.fcm.unsubscribeFromTopic('marketing');
}