import { OpenInvoicesModule } from './open-invoices.module';

describe('OpenInvoicesModule', () => {
  let openInvoicesModule: OpenInvoicesModule;

  beforeEach(() => {
    openInvoicesModule = new OpenInvoicesModule();
  });

  it('should create an instance', () => {
    expect(openInvoicesModule).toBeTruthy();
  });
});
