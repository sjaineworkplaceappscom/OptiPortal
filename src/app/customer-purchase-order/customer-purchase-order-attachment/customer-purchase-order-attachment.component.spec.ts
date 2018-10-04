import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchaseOrderAttachmentComponent } from './customer-purchase-order-attachment.component';

describe('CustomerPurchaseOrderAttachmentComponent', () => {
  let component: CustomerPurchaseOrderAttachmentComponent;
  let fixture: ComponentFixture<CustomerPurchaseOrderAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPurchaseOrderAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPurchaseOrderAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
