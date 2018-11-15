import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasnDetailComponent } from './vasn-detail.component';

describe('VasnDetailComponent', () => {
  let component: VasnDetailComponent;
  let fixture: ComponentFixture<VasnDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasnDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasnDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
