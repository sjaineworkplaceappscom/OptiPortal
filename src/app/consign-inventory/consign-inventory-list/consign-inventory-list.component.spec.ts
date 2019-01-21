import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignInventoryListComponent } from './consign-inventory-list.component';

describe('ConsignInventoryListComponent', () => {
  let component: ConsignInventoryListComponent;
  let fixture: ComponentFixture<ConsignInventoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignInventoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
