import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInquiryItemsComponent } from './purchase-inquiry-items.component';

describe('PurchaseInquiryItemsComponent', () => {
  let component: PurchaseInquiryItemsComponent;
  let fixture: ComponentFixture<PurchaseInquiryItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInquiryItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInquiryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
