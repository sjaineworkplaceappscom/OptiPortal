import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpaymentListComponent } from './vpayment-list.component';

describe('VpaymentListComponent', () => {
  let component: VpaymentListComponent;
  let fixture: ComponentFixture<VpaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
