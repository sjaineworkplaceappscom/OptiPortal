import { VendorPoModule } from './vendor-po.module';

describe('VendorPoModule', () => {
  let vendorPoModule: VendorPoModule;

  beforeEach(() => {
    vendorPoModule = new VendorPoModule();
  });

  it('should create an instance', () => {
    expect(vendorPoModule).toBeTruthy();
  });
});
