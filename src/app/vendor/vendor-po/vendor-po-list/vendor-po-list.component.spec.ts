import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPoListComponent } from './vendor-po-list.component';

describe('VendorPoListComponent', () => {
  let component: VendorPoListComponent;
  let fixture: ComponentFixture<VendorPoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
