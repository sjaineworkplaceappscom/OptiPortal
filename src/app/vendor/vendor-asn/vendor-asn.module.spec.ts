import { VendorAsnModule } from './vendor-asn.module';

describe('VendorAsnModule', () => {
  let vendorAsnModule: VendorAsnModule;

  beforeEach(() => {
    vendorAsnModule = new VendorAsnModule();
  });

  it('should create an instance', () => {
    expect(vendorAsnModule).toBeTruthy();
  });
});
