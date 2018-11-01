import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPiNotesComponent } from './vendor-pi-notes.component';

describe('VendorPiNotesComponent', () => {
  let component: VendorPiNotesComponent;
  let fixture: ComponentFixture<VendorPiNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPiNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPiNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
