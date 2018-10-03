import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactsListComponent } from './customer-contacts-list.component';

describe('CustomerContactsListComponent', () => {
  let component: CustomerContactsListComponent;
  let fixture: ComponentFixture<CustomerContactsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContactsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
