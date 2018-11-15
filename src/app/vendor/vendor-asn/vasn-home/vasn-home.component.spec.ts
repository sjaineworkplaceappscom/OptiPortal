import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasnHomeComponent } from './vasn-home.component';

describe('VasnHomeComponent', () => {
  let component: VasnHomeComponent;
  let fixture: ComponentFixture<VasnHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasnHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasnHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
