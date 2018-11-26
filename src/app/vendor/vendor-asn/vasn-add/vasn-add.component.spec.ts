import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasnAddComponent } from './vasn-add.component';

describe('VasnAddComponent', () => {
  let component: VasnAddComponent;
  let fixture: ComponentFixture<VasnAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasnAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasnAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
