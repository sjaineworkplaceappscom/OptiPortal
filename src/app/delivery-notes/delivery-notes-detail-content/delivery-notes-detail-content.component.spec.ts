import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNotesDetailContentComponent } from './delivery-notes-detail-content.component';

describe('DeliveryNotesDetailContentComponent', () => {
  let component: DeliveryNotesDetailContentComponent;
  let fixture: ComponentFixture<DeliveryNotesDetailContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryNotesDetailContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNotesDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
