import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignInventorySRBatchDetailComponent } from './consign-inventory-sr-batch-detail.component';

describe('ConsignInventorySRBatchDetailComponent', () => {
  let component: ConsignInventorySRBatchDetailComponent;
  let fixture: ComponentFixture<ConsignInventorySRBatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignInventorySRBatchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignInventorySRBatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
