import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactData {
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  } | null = null;

  setContact(data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }): void {
    this.contact = data;
  }

  getContact() {
    return this.contact;
  }
}
