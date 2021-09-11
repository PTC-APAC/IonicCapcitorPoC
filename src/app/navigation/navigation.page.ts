import { Component } from '@angular/core';
import { Contact } from 'src/models/contact';
import { ContactService } from 'src/services/contact.service';
import { Router } from '@angular/router';
import { getRandomInt } from 'src/util/number';
import { PushNotification } from 'src/global/push-notification';

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
  ) {
    this.contacts = this.contactService.getAllContacts();
  }

  viewRandomContact(): void {
    const index = getRandomInt(this.contacts.length);

    const randomUser = this.contacts[index];
    this.router.navigateByUrl('/contact-detail/' + randomUser.id);
  }

  startPushNotification(): void {
    this.fcm.start();
  }
}
