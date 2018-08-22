import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationsDetailContentComponent } from './sales-quotations-detail-content.component';

describe('SalesQuotationsDetailContentComponent', () => {
  let component: SalesQuotationsDetailContentComponent;
  let fixture: ComponentFixture<SalesQuotationsDetailContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuotationsDetailContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuotationsDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
