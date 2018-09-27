import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInvoicesListComponent } from './open-invoices-list.component';

describe('OpenInvoicesListComponent', () => {
  let component: OpenInvoicesListComponent;
  let fixture: ComponentFixture<OpenInvoicesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenInvoicesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenInvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
