import { TestBed, inject } from '@angular/core/testing';

import { VendorOIService } from './vendor-o-i.service';

describe('VendorOIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorOIService]
    });
  });

  it('should be created', inject([VendorOIService], (service: VendorOIService) => {
    expect(service).toBeTruthy();
  }));
});
