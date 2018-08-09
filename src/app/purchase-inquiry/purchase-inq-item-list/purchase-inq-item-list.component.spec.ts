import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInqItemListComponent } from './purchase-inq-item-list.component';

describe('PurchaseInqItemListComponent', () => {
  let component: PurchaseInqItemListComponent;
  let fixture: ComponentFixture<PurchaseInqItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInqItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInqItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
