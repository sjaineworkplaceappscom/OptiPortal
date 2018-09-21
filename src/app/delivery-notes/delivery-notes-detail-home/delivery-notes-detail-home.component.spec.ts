import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNotesDetailHomeComponent } from './delivery-notes-detail-home.component';

describe('DeliveryNotesDetailHomeComponent', () => {
  let component: DeliveryNotesDetailHomeComponent;
  let fixture: ComponentFixture<DeliveryNotesDetailHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryNotesDetailHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNotesDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
