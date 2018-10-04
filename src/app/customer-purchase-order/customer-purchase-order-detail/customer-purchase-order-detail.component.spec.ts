import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchaseOrderDetailComponent } from './customer-purchase-order-detail.component';

describe('CustomerPurchaseOrderDetailComponent', () => {
  let component: CustomerPurchaseOrderDetailComponent;
  let fixture: ComponentFixture<CustomerPurchaseOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPurchaseOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPurchaseOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
