import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactsUpdateComponent } from './customer-contacts-update.component';

describe('CustomerContactsUpdateComponent', () => {
  let component: CustomerContactsUpdateComponent;
  let fixture: ComponentFixture<CustomerContactsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContactsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
