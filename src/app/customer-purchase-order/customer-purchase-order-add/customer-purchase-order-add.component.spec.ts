import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchaseOrderAddComponent } from './customer-purchase-order-add.component';

describe('CustomerPurchaseOrderAddComponent', () => {
  let component: CustomerPurchaseOrderAddComponent;
  let fixture: ComponentFixture<CustomerPurchaseOrderAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPurchaseOrderAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPurchaseOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
