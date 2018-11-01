import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPoAttchmentsComponent } from './vendor-po-attchments.component';

describe('VendorPoAttchmentsComponent', () => {
  let component: VendorPoAttchmentsComponent;
  let fixture: ComponentFixture<VendorPoAttchmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPoAttchmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPoAttchmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
