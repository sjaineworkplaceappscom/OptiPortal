import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPiListComponent } from './vendor-pi-list.component';

describe('VendorPiListComponent', () => {
  let component: VendorPiListComponent;
  let fixture: ComponentFixture<VendorPiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
