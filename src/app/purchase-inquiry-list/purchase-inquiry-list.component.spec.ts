import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInquiryListComponent } from './purchase-inquiry-list.component';

describe('PurchaseInquiryListComponent', () => {
  let component: PurchaseInquiryListComponent;
  let fixture: ComponentFixture<PurchaseInquiryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInquiryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInquiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
