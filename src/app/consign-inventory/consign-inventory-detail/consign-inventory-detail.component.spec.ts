import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignInventoryDetailComponent } from './consign-inventory-detail.component';

describe('ConsignInventoryDetailComponent', () => {
  let component: ConsignInventoryDetailComponent;
  let fixture: ComponentFixture<ConsignInventoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignInventoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignInventoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
