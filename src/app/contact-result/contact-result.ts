import { Component } from '@angular/core';
import { ContactData } from '../contact-data';
import { Contact } from '../contact';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-result',
  imports: [RouterLink],
  templateUrl: './contact-result.html',
  styleUrl: './contact-result.css',
})
export class ContactResult {
  readonly contact: Contact | null;

  constructor(private contactData: ContactData) {
    this.contact = this.contactData.getContact();
  }
}
