import { Injectable } from "@angular/core";
import { FCM } from '@ionic-native/fcm/ngx';

@Injectable({
  providedIn: "root",
})
export class PushNotification {
  constructor(private fcm: FCM) {}

  async start(): Promise<void> {
    const token = await this.fcm.getToken();
    console.log('FCM TOKEN =', token);

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });
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