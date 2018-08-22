import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationsDetailComponent } from './sales-quotations-detail.component';

describe('SalesQuotationsDetailComponent', () => {
  let component: SalesQuotationsDetailComponent;
  let fixture: ComponentFixture<SalesQuotationsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuotationsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuotationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
