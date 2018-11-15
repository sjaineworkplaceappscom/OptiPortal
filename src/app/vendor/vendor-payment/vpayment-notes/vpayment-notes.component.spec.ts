import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpaymentNotesComponent } from './vpayment-notes.component';

describe('VpaymentNotesComponent', () => {
  let component: VpaymentNotesComponent;
  let fixture: ComponentFixture<VpaymentNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpaymentNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpaymentNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
