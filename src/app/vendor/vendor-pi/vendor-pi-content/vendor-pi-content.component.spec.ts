import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPiContentComponent } from './vendor-pi-content.component';

describe('VendorPiContentComponent', () => {
  let component: VendorPiContentComponent;
  let fixture: ComponentFixture<VendorPiContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPiContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPiContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
