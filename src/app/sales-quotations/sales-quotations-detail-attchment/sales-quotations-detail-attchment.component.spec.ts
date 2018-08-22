import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationsDetailAttchmentComponent } from './sales-quotations-detail-attchment.component';

describe('SalesQuotationsDetailAttchmentComponent', () => {
  let component: SalesQuotationsDetailAttchmentComponent;
  let fixture: ComponentFixture<SalesQuotationsDetailAttchmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuotationsDetailAttchmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuotationsDetailAttchmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
