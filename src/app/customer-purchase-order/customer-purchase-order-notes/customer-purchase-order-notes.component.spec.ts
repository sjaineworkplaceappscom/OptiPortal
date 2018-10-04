import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchaseOrderNotesComponent } from './customer-purchase-order-notes.component';

describe('CustomerPurchaseOrderNotesComponent', () => {
  let component: CustomerPurchaseOrderNotesComponent;
  let fixture: ComponentFixture<CustomerPurchaseOrderNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPurchaseOrderNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPurchaseOrderNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
