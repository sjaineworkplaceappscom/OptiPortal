import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderDetailDeliveryNotesComponent } from './sales-order-detail-delivery-notes.component';

describe('SalesOrderDetailDeliveryNotesComponent', () => {
  let component: SalesOrderDetailDeliveryNotesComponent;
  let fixture: ComponentFixture<SalesOrderDetailDeliveryNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderDetailDeliveryNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderDetailDeliveryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
