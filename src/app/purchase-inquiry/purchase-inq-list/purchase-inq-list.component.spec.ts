import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInqListComponent } from './purchase-inq-list.component';

describe('PurchaseInqListComponent', () => {
  let component: PurchaseInqListComponent;
  let fixture: ComponentFixture<PurchaseInqListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInqListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
