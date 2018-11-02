import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPoContentComponent } from './vendor-po-content.component';

describe('VendorPoContentComponent', () => {
  let component: VendorPoContentComponent;
  let fixture: ComponentFixture<VendorPoContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPoContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
