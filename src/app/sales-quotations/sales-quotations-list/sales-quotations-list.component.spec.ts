import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationsListComponent } from './sales-quotations-list.component';

describe('SalesQuotationsListComponent', () => {
  let component: SalesQuotationsListComponent;
  let fixture: ComponentFixture<SalesQuotationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuotationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuotationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
