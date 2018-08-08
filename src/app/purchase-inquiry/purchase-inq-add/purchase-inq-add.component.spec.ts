import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInqAddComponent } from './purchase-inq-add.component';

describe('PurchaseInqAddComponent', () => {
  let component: PurchaseInqAddComponent;
  let fixture: ComponentFixture<PurchaseInqAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInqAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInqAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
