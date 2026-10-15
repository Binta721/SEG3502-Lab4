import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactData } from '../contact-data';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  contactForm;

  constructor(
    private formBuilder: FormBuilder,
    private contactData: ContactData,
    private router: Router
  ) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [
        Validators.pattern(/^[1-9][0-9]{2}[1-9][0-9]{6}$/)
      ]],
      email: ['', Validators.email]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactData.setContact({
        firstName: this.contactForm.value.firstName ?? '',
        lastName: this.contactForm.value.lastName ?? '',
        phone: this.contactForm.value.phone ?? '',
        email: this.contactForm.value.email ?? ''
      });

      this.router.navigate(['/resultat']);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
