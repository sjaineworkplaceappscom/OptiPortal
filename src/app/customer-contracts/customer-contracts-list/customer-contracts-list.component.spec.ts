import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractsListComponent } from './customer-contracts-list.component';

describe('CustomerContractsListComponent', () => {
  let component: CustomerContractsListComponent;
  let fixture: ComponentFixture<CustomerContractsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContractsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
