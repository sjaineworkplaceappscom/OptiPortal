import { DeliveryNotesModule } from './delivery-notes.module';

describe('DeliveryNotesModule', () => {
  let deliveryNotesModule: DeliveryNotesModule;

  beforeEach(() => {
    deliveryNotesModule = new DeliveryNotesModule();
  });

  it('should create an instance', () => {
    expect(deliveryNotesModule).toBeTruthy();
  });
});
