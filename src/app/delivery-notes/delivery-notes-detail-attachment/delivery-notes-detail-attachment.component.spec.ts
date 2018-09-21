import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNotesDetailAttachmentComponent } from './delivery-notes-detail-attachment.component';

describe('DeliveryNotesDetailAttachmentComponent', () => {
  let component: DeliveryNotesDetailAttachmentComponent;
  let fixture: ComponentFixture<DeliveryNotesDetailAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryNotesDetailAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNotesDetailAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
