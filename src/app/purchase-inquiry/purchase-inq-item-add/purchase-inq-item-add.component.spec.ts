import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInqItemAddComponent } from './purchase-inq-item-add.component';

describe('PurchaseInqItemAddComponent', () => {
  let component: PurchaseInqItemAddComponent;
  let fixture: ComponentFixture<PurchaseInqItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInqItemAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInqItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
