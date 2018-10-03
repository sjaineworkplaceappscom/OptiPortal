import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactsAddComponent } from './customer-contacts-add.component';

describe('CustomerContactsAddComponent', () => {
  let component: CustomerContactsAddComponent;
  let fixture: ComponentFixture<CustomerContactsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContactsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
