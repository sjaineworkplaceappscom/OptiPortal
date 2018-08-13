import { SalesQuotationsModule } from './sales-quotations.module';

describe('SalesQuotationsModule', () => {
  let salesQuotationsModule: SalesQuotationsModule;

  beforeEach(() => {
    salesQuotationsModule = new SalesQuotationsModule();
  });

  it('should create an instance', () => {
    expect(salesQuotationsModule).toBeTruthy();
  });
});
