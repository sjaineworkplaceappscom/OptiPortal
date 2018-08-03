import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInquiryComponent } from './purchase-inquiry.component';

describe('PurchaseInquiryComponent', () => {
  let component: PurchaseInquiryComponent;
  let fixture: ComponentFixture<PurchaseInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
