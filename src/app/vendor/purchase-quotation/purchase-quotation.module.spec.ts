import { PurchaseQuotationModule } from './purchase-quotation.module';

describe('PurchaseQuotationModule', () => {
  let purchaseQuotationModule: PurchaseQuotationModule;

  beforeEach(() => {
    purchaseQuotationModule = new PurchaseQuotationModule();
  });

  it('should create an instance', () => {
    expect(purchaseQuotationModule).toBeTruthy();
  });
});
