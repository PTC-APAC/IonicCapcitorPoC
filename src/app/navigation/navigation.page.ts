import { Component } from '@angular/core';
import { Contact } from 'src/models/contact';
import { ContactService } from 'src/services/contact.service';
import { Router } from '@angular/router';
import { getRandomInt } from 'src/util/number';
import { PushNotification } from 'src/global/push-notification';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.page.html',
  styleUrls: ['navigation.page.scss']
})
export class NavigationPage {
  contacts: Contact[];

  constructor(
    private contactService: ContactService,
    private router: Router,
    private fcm: PushNotification,
    private alertController: AlertController,
  ) {
    this.contacts = this.contactService.getAllContacts();
  }

  viewRandomContact(): void {
    const index = getRandomInt(this.contacts.length);

    const randomUser = this.contacts[index];
    this.router.navigateByUrl('/contact-detail/' + randomUser.id);
  }

  async startPushNotification(): Promise<void> {
    try {
      const token = await this.fcm.start();

      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Firebase Token',
        message: `Got Token: ${token}`,
        buttons: ['OK']
      });

      await alert.present();
    } catch (e) {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Firebase Token',
        message: `Got Error: ${e.toString()}`,
        buttons: ['Dismiss']
      });

      await alert.present();
    }
  }
}
