import { VendorContactModule } from './vendor-contact.module';

describe('VendorContactModule', () => {
  let vendorContactModule: VendorContactModule;

  beforeEach(() => {
    vendorContactModule = new VendorContactModule();
  });

  it('should create an instance', () => {
    expect(vendorContactModule).toBeTruthy();
  });
});
