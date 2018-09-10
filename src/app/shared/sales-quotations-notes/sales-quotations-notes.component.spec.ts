import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationsNotesComponent } from './sales-quotations-notes.component';

describe('SalesQuotationsNotesComponent', () => {
  let component: SalesQuotationsNotesComponent;
  let fixture: ComponentFixture<SalesQuotationsNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuotationsNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuotationsNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
