import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactResult } from './contact-result';
import { provideRouter } from '@angular/router';
import { ContactData } from '../contact-data';

describe('ContactResult', () => {
  let component: ContactResult;
  let fixture: ComponentFixture<ContactResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactResult],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows an explanatory message without a contact', () => {
    expect(fixture.nativeElement.querySelector('table')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Aucune donnée à afficher');
    expect(fixture.nativeElement.querySelector('button').textContent).toContain('Retour au formulaire');
  });

  it.each([
    { firstName: 'Anne', lastName: 'Roy', phone: '6135550123', email: 'anne@example.com' },
    { firstName: 'Julie', lastName: 'Leduc', phone: '', email: '' }
  ])('renders the exact submitted fields: %j', async (contact) => {
    TestBed.inject(ContactData).setContact(contact);
    const result = TestBed.createComponent(ContactResult);
    await result.whenStable();
    const cells = Array.from(result.nativeElement.querySelectorAll('tbody td')) as HTMLTableCellElement[];
    expect(cells.map(cell => cell.textContent?.trim())).toEqual(Object.values(contact));
    expect(result.nativeElement.querySelectorAll('th[scope="col"]').length).toBe(4);
    expect(result.nativeElement.querySelector('caption')).toBeTruthy();
  });
});
