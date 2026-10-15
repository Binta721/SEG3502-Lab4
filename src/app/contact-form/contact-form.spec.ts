import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';
import { provideRouter, Router } from '@angular/router';
import { ContactData } from '../contact-data';

describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requires both names while allowing empty optional fields', () => {
    const form = component.contactForm;
    expect(form.valid).toBe(false);
    form.patchValue({ firstName: 'Anne' });
    expect(form.valid).toBe(false);
    form.patchValue({ firstName: '', lastName: 'Roy' });
    expect(form.valid).toBe(false);
    form.patchValue({ firstName: 'Anne' });
    expect(form.valid).toBe(true);
  });

  it.each(['0135550123', '6130550123', '613555012', '61355501234', '613555abcd', '613 5550123'])('rejects phone %s', (phone) => {
    component.contactForm.controls.phone.setValue(phone);
    expect(component.contactForm.controls.phone.hasError('pattern')).toBe(true);
  });

  it.each(['', '6135550123'])('accepts phone %s', (phone) => {
    component.contactForm.controls.phone.setValue(phone);
    expect(component.contactForm.controls.phone.valid).toBe(true);
  });

  it('validates an optional email', () => {
    const email = component.contactForm.controls.email;
    for (const value of ['', 'anne@example.com']) {
      email.setValue(value);
      expect(email.valid).toBe(true);
    }
    email.setValue('adresse-invalide');
    expect(email.hasError('email')).toBe(true);
  });

  it('stores the contact before navigating on valid submission', () => {
    const contact = { firstName: 'Anne', lastName: 'Roy', phone: '6135550123', email: 'anne@example.com' };
    const service = TestBed.inject(ContactData);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockImplementation(() => {
      expect(service.getContact()).toEqual(contact);
      return Promise.resolve(true);
    });
    component.contactForm.setValue(contact);
    component.onSubmit();
    expect(navigate).toHaveBeenCalledWith(['/resultat']);
  });

  it('does not store or navigate on invalid submission and shows errors', () => {
    const service = TestBed.inject(ContactData);
    const save = vi.spyOn(service, 'setContact');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');
    component.onSubmit();
    fixture.detectChanges();
    expect(save).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
    expect(service.getContact()).toBeNull();
    expect(Object.values(component.contactForm.controls).every(control => control.touched)).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('.error').length).toBe(2);
  });
});
