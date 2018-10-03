import { CustomerContactsModule } from './customer-contacts.module';

describe('CustomerContactsModule', () => {
  let customerContactsModule: CustomerContactsModule;

  beforeEach(() => {
    customerContactsModule = new CustomerContactsModule();
  });

  it('should create an instance', () => {
    expect(customerContactsModule).toBeTruthy();
  });
});
