import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPiHeaderComponent } from './vendor-pi-header.component';

describe('VendorPiHeaderComponent', () => {
  let component: VendorPiHeaderComponent;
  let fixture: ComponentFixture<VendorPiHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPiHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
