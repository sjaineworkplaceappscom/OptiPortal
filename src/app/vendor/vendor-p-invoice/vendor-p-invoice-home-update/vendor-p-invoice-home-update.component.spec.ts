import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceHomeUpdateComponent } from './vendor-p-invoice-home-update.component';

describe('VendorPInvoiceHomeUpdateComponent', () => {
  let component: VendorPInvoiceHomeUpdateComponent;
  let fixture: ComponentFixture<VendorPInvoiceHomeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceHomeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceHomeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
