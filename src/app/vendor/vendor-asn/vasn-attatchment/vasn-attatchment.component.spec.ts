import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasnAttatchmentComponent } from './vasn-attatchment.component';

describe('VasnAttatchmentComponent', () => {
  let component: VasnAttatchmentComponent;
  let fixture: ComponentFixture<VasnAttatchmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasnAttatchmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasnAttatchmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
