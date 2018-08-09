import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInqDetailComponent } from './purchase-inq-detail.component';

describe('PurchaseInqDetailComponent', () => {
  let component: PurchaseInqDetailComponent;
  let fixture: ComponentFixture<PurchaseInqDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInqDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInqDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
