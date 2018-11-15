import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpaymentAttachmentComponent } from './vpayment-attachment.component';

describe('VpaymentAttachmentComponent', () => {
  let component: VpaymentAttachmentComponent;
  let fixture: ComponentFixture<VpaymentAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpaymentAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpaymentAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
