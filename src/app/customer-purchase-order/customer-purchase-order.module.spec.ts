import { CustomerPurchaseOrderModule } from './customer-purchase-order.module';

describe('CustomerPurchaseOrderModule', () => {
  let customerPurchaseOrderModule: CustomerPurchaseOrderModule;

  beforeEach(() => {
    customerPurchaseOrderModule = new CustomerPurchaseOrderModule();
  });

  it('should create an instance', () => {
    expect(customerPurchaseOrderModule).toBeTruthy();
  });
});
