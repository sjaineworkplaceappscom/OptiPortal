import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPoHeaderComponent } from './vendor-po-header.component';

describe('VendorPoHeaderComponent', () => {
  let component: VendorPoHeaderComponent;
  let fixture: ComponentFixture<VendorPoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
