import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPoNotesComponent } from './vendor-po-notes.component';

describe('VendorPoNotesComponent', () => {
  let component: VendorPoNotesComponent;
  let fixture: ComponentFixture<VendorPoNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPoNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPoNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
