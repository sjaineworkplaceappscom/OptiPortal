import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceShipmentNotestabComponent } from './advance-shipment-notestab.component';

describe('AdvanceShipmentNotestabComponent', () => {
  let component: AdvanceShipmentNotestabComponent;
  let fixture: ComponentFixture<AdvanceShipmentNotestabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceShipmentNotestabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceShipmentNotestabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
