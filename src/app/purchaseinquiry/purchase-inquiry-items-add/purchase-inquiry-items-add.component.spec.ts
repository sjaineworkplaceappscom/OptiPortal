import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInquiryItemsAddComponent } from './purchase-inquiry-items-add.component';

describe('PurchaseInquiryItemsAddComponent', () => {
  let component: PurchaseInquiryItemsAddComponent;
  let fixture: ComponentFixture<PurchaseInquiryItemsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInquiryItemsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInquiryItemsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
