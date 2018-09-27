import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInvoicesDetailNotesComponent } from './open-invoices-detail-notes.component';

describe('OpenInvoicesDetailNotesComponent', () => {
  let component: OpenInvoicesDetailNotesComponent;
  let fixture: ComponentFixture<OpenInvoicesDetailNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenInvoicesDetailNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenInvoicesDetailNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
