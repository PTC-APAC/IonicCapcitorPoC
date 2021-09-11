import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/services/contact.service';
import { Contact } from 'src/models/contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {

  userId: number;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    const contacts = this.contactService.getAllContacts();
    this.user = contacts.find((e) => e.id === this.userId);
  }

}
