import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { ContactForm } from './contact-form/contact-form';
import { ContactResult } from './contact-result/contact-result';
import { ContactData } from './contact-data';

describe('Contact routing and integration', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  it('redirects the root and unknown URLs to the form', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', ContactForm);
    expect(TestBed.inject(Router).url).toBe('/formulaire');
    await harness.navigateByUrl('/inconnue', ContactForm);
    expect(TestBed.inject(Router).url).toBe('/formulaire');
  });

  it('allows a direct visit to results without data and a return to the form', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/resultat', ContactResult);
    expect(harness.routeNativeElement?.textContent).toContain('Aucune donnée à afficher');
    harness.routeNativeElement?.querySelector<HTMLButtonElement>('button')?.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/formulaire');
    expect(harness.routeNativeElement?.querySelector('form')).toBeTruthy();
  });

  it('keeps invalid data on the form, then displays a valid submission', async () => {
    const harness = await RouterTestingHarness.create();
    const form = await harness.navigateByUrl('/formulaire', ContactForm);
    harness.routeNativeElement?.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/formulaire');
    expect(TestBed.inject(ContactData).getContact()).toBeNull();
    const contact = { firstName: 'Anne', lastName: 'Roy', phone: '6135550123', email: 'anne@example.com' };
    form.contactForm.setValue(contact);
    harness.routeNativeElement?.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/resultat');
    const cells = Array.from(harness.routeNativeElement!.querySelectorAll('tbody td'));
    expect(cells.map(cell => cell.textContent?.trim())).toEqual(Object.values(contact));
  });
});
