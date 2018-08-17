import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNotesListComponent } from './delivery-notes-list.component';

describe('DeliveryNotesListComponent', () => {
  let component: DeliveryNotesListComponent;
  let fixture: ComponentFixture<DeliveryNotesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryNotesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
