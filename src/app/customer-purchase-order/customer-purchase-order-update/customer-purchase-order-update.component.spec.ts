import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchaseOrderUpdateComponent } from './customer-purchase-order-update.component';

describe('CustomerPurchaseOrderUpdateComponent', () => {
  let component: CustomerPurchaseOrderUpdateComponent;
  let fixture: ComponentFixture<CustomerPurchaseOrderUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPurchaseOrderUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPurchaseOrderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
