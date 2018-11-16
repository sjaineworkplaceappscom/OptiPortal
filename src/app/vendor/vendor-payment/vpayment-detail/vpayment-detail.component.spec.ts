import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpaymentDetailComponent } from './vpayment-detail.component';

describe('VpaymentDetailComponent', () => {
  let component: VpaymentDetailComponent;
  let fixture: ComponentFixture<VpaymentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpaymentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
