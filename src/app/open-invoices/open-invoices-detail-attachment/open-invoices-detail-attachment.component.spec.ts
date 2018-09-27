import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInvoicesDetailAttachmentComponent } from './open-invoices-detail-attachment.component';

describe('OpenInvoicesDetailAttachmentComponent', () => {
  let component: OpenInvoicesDetailAttachmentComponent;
  let fixture: ComponentFixture<OpenInvoicesDetailAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenInvoicesDetailAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenInvoicesDetailAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
