import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInqUpdateComponent } from './purchase-inq-update.component';

describe('PurchaseInqUpdateComponent', () => {
  let component: PurchaseInqUpdateComponent;
  let fixture: ComponentFixture<PurchaseInqUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInqUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInqUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
