import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationsDetailHomeComponent } from './sales-quotations-detail-home.component';

describe('SalesQuotationsDetailHomeComponent', () => {
  let component: SalesQuotationsDetailHomeComponent;
  let fixture: ComponentFixture<SalesQuotationsDetailHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuotationsDetailHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuotationsDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
