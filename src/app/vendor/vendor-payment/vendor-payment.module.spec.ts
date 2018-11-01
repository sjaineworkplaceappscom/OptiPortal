import { VendorPaymentModule } from './vendor-payment.module';

describe('VendorPaymentModule', () => {
  let vendorPaymentModule: VendorPaymentModule;

  beforeEach(() => {
    vendorPaymentModule = new VendorPaymentModule();
  });

  it('should create an instance', () => {
    expect(vendorPaymentModule).toBeTruthy();
  });
});
