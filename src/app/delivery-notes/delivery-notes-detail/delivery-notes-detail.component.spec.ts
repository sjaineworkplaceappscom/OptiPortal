import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNotesDetailComponent } from './delivery-notes-detail.component';

describe('DeliveryNotesDetailComponent', () => {
  let component: DeliveryNotesDetailComponent;
  let fixture: ComponentFixture<DeliveryNotesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryNotesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNotesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
