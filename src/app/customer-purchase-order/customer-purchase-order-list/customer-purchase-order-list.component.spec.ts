import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchaseOrderListComponent } from './customer-purchase-order-list.component';

describe('CustomerPurchaseOrderListComponent', () => {
  let component: CustomerPurchaseOrderListComponent;
  let fixture: ComponentFixture<CustomerPurchaseOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPurchaseOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPurchaseOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
