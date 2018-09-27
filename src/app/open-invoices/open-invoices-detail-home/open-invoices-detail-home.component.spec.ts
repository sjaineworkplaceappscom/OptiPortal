import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInvoicesDetailHomeComponent } from './open-invoices-detail-home.component';

describe('OpenInvoicesDetailHomeComponent', () => {
  let component: OpenInvoicesDetailHomeComponent;
  let fixture: ComponentFixture<OpenInvoicesDetailHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenInvoicesDetailHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenInvoicesDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
