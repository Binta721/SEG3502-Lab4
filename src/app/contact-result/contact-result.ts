import { Component } from '@angular/core';
import { ContactData } from '../contact-data';

@Component({
  selector: 'app-contact-result',
  imports: [],
  templateUrl: './contact-result.html',
  styleUrl: './contact-result.css',
})
export class ContactResult {
  contact;

  constructor(private contactData: ContactData) {
    this.contact = this.contactData.getContact();
  }
}
