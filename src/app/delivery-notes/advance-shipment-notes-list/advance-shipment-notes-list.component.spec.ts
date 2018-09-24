import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceShipmentNotesListComponent } from './advance-shipment-notes-list.component';

describe('AdvanceShipmentNotesListComponent', () => {
  let component: AdvanceShipmentNotesListComponent;
  let fixture: ComponentFixture<AdvanceShipmentNotesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceShipmentNotesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceShipmentNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
