import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInvoicesDetailComponent } from './open-invoices-detail.component';

describe('OpenInvoicesDetailComponent', () => {
  let component: OpenInvoicesDetailComponent;
  let fixture: ComponentFixture<OpenInvoicesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenInvoicesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenInvoicesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
