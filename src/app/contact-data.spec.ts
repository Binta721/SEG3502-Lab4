import { TestBed } from '@angular/core/testing';
import { ContactData } from './contact-data';

describe('ContactData', () => {
  let service: ContactData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns null before the first submission', () => {
    expect(service.getContact()).toBeNull();
  });

  it('stores all fields and replaces a previous contact', () => {
    const first = { firstName: 'Anne', lastName: 'Roy', phone: '6135550123', email: 'anne@example.com' };
    service.setContact(first);
    expect(service.getContact()).toEqual(first);
    const next = { firstName: 'Julie', lastName: 'Leduc', phone: '', email: '' };
    service.setContact(next);
    expect(service.getContact()).toEqual(next);
  });
});
