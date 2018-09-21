import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNotesDetailNotesComponent } from './delivery-notes-detail-notes.component';

describe('DeliveryNotesDetailNotesComponent', () => {
  let component: DeliveryNotesDetailNotesComponent;
  let fixture: ComponentFixture<DeliveryNotesDetailNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryNotesDetailNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNotesDetailNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
