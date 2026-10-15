import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactResult } from './contact-result';

describe('ContactResult', () => {
  let component: ContactResult;
  let fixture: ComponentFixture<ContactResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactResult],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
