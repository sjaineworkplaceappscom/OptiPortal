import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasnUpdateComponent } from './vasn-update.component';

describe('VasnUpdateComponent', () => {
  let component: VasnUpdateComponent;
  let fixture: ComponentFixture<VasnUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasnUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasnUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
