import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceContentAddComponent } from './vendor-p-invoice-content-add.component';

describe('VendorPInvoiceContentAddComponent', () => {
  let component: VendorPInvoiceContentAddComponent;
  let fixture: ComponentFixture<VendorPInvoiceContentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceContentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceContentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
