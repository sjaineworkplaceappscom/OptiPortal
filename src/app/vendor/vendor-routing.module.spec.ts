import { VendorRoutingModule } from './vendor-routing.module';

describe('VendorRoutingModule', () => {
  let vendorRoutingModule: VendorRoutingModule;

  beforeEach(() => {
    vendorRoutingModule = new VendorRoutingModule();
  });

  it('should create an instance', () => {
    expect(vendorRoutingModule).toBeTruthy();
  });
});
