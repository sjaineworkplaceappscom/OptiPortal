import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPoDetailComponent } from './vendor-po-detail.component';

describe('VendorPoDetailComponent', () => {
  let component: VendorPoDetailComponent;
  let fixture: ComponentFixture<VendorPoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
