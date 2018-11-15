import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceAddComponent } from './vendor-p-invoice-add.component';

describe('VendorPInvoiceAddComponent', () => {
  let component: VendorPInvoiceAddComponent;
  let fixture: ComponentFixture<VendorPInvoiceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
