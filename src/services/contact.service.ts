import { Injectable } from "@angular/core";
import { Contact } from '../models/contact';

const kContactJson = `
  [
    {
        "id": 1,
        "name": "sundaraavel",
        "company": "codesundar.com",
        "avatar": "https://i.pravatar.cc/300"
    },
    {
        "id": 2,
        "name": "Priyaka",
        "company": "HTML Foundation",
        "avatar": "https://i.pravatar.cc/200"
    }
  ]
`;

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private contacts: Contact[];
  
  constructor() {
    this.contacts = JSON.parse(kContactJson);
  }

  getAllContacts(): Contact[] {
    return this.contacts;
  }
}
