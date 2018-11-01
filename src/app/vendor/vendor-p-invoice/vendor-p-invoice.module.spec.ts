import { VendorPInvoiceModule } from './vendor-p-invoice.module';

describe('VendorPInvoiceModule', () => {
  let vendorPInvoiceModule: VendorPInvoiceModule;

  beforeEach(() => {
    vendorPInvoiceModule = new VendorPInvoiceModule();
  });

  it('should create an instance', () => {
    expect(vendorPInvoiceModule).toBeTruthy();
  });
});
