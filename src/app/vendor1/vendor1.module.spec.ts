import { Vendor1Module } from './vendor1.module';

describe('Vendor1Module', () => {
  let vendor1Module: Vendor1Module;

  beforeEach(() => {
    vendor1Module = new Vendor1Module();
  });

  it('should create an instance', () => {
    expect(vendor1Module).toBeTruthy();
  });
});
