import { Injectable } from '@angular/core';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactData {
  private contact: Contact | null = null;

  setContact(data: Contact): void {
    this.contact = data;
  }

  getContact(): Contact | null {
    return this.contact;
  }
}
