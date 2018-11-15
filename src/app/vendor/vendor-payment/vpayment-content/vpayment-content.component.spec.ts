import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpaymentContentComponent } from './vpayment-content.component';

describe('VpaymentContentComponent', () => {
  let component: VpaymentContentComponent;
  let fixture: ComponentFixture<VpaymentContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpaymentContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpaymentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
