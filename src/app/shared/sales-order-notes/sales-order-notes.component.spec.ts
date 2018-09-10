import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderNotesComponent } from './sales-order-notes.component';

describe('SalesOrderNotesComponent', () => {
  let component: SalesOrderNotesComponent;
  let fixture: ComponentFixture<SalesOrderNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
