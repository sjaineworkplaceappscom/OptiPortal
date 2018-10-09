import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchaseOrderHomeAddComponent } from './customer-purchase-order-home-add.component';

describe('CustomerPurchaseOrderHomeAddComponent', () => {
  let component: CustomerPurchaseOrderHomeAddComponent;
  let fixture: ComponentFixture<CustomerPurchaseOrderHomeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPurchaseOrderHomeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPurchaseOrderHomeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
