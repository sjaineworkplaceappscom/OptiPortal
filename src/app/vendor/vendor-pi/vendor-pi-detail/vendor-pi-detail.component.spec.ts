import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPiDetailComponent } from './vendor-pi-detail.component';

describe('VendorPiDetailComponent', () => {
  let component: VendorPiDetailComponent;
  let fixture: ComponentFixture<VendorPiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
