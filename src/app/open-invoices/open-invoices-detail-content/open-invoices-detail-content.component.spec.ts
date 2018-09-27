import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInvoicesDetailContentComponent } from './open-invoices-detail-content.component';

describe('OpenInvoicesDetailContentComponent', () => {
  let component: OpenInvoicesDetailContentComponent;
  let fixture: ComponentFixture<OpenInvoicesDetailContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenInvoicesDetailContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenInvoicesDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
