import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchaseOrderHomeComponent } from './customer-purchase-order-home.component';

describe('CustomerPurchaseOrderHomeComponent', () => {
  let component: CustomerPurchaseOrderHomeComponent;
  let fixture: ComponentFixture<CustomerPurchaseOrderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPurchaseOrderHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPurchaseOrderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
