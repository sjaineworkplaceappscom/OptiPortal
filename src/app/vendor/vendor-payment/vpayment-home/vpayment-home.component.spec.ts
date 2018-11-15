import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpaymentHomeComponent } from './vpayment-home.component';

describe('VpaymentHomeComponent', () => {
  let component: VpaymentHomeComponent;
  let fixture: ComponentFixture<VpaymentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpaymentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpaymentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
