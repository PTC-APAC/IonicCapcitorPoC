import { Component } from '@angular/core';
import { Contact } from 'src/models/contact';
import { ContactService } from 'src/services/contact.service';
import { Router } from '@angular/router';
import { getRandomInt } from 'src/util/number';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.page.html',
  styleUrls: ['navigation.page.scss']
})
export class NavigationPage {
  contacts: Contact[];

  constructor(private contactService: ContactService, private router: Router) {
    this.contacts = this.contactService.getAllContacts();
  }

  viewRandomContact(): void {
    const index = getRandomInt(this.contacts.length);

    const randomUser = this.contacts[index];
    console.log('RANDOM USER =', randomUser);
    this.router.navigateByUrl('/contact-detail/' + randomUser.id);
  }
}
