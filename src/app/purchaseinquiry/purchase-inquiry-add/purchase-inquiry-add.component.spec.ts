import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInquiryAddComponent } from './purchase-inquiry-add.component';

describe('PurchaseInquiryAddComponent', () => {
  let component: PurchaseInquiryAddComponent;
  let fixture: ComponentFixture<PurchaseInquiryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInquiryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInquiryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
