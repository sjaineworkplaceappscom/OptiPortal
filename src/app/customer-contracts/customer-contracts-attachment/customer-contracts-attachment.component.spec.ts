import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractsAttachmentComponent } from './customer-contracts-attachment.component';

describe('CustomerContractsAttachmentComponent', () => {
  let component: CustomerContractsAttachmentComponent;
  let fixture: ComponentFixture<CustomerContractsAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContractsAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractsAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
