import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPouListComponent } from './vendor-pou-list.component';

describe('VendorPouListComponent', () => {
  let component: VendorPouListComponent;
  let fixture: ComponentFixture<VendorPouListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPouListComponent ]
    }) 
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPouListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
