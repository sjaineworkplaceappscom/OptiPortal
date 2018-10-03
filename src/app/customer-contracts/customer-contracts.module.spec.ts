import { CustomerContractsModule } from './customer-contracts.module';

describe('CustomerContractsModule', () => {
  let customerContractsModule: CustomerContractsModule;

  beforeEach(() => {
    customerContractsModule = new CustomerContractsModule();
  });

  it('should create an instance', () => {
    expect(customerContractsModule).toBeTruthy();
  });
});
