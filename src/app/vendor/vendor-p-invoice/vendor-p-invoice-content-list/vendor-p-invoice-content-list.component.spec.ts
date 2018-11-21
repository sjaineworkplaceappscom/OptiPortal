import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPInvoiceContentListComponent } from './vendor-p-invoice-content-list.component';

describe('VendorPInvoiceContentListComponent', () => {
  let component: VendorPInvoiceContentListComponent;
  let fixture: ComponentFixture<VendorPInvoiceContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPInvoiceContentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPInvoiceContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
