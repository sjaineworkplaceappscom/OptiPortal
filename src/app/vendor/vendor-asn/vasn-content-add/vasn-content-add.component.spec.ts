import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasnContentAddComponent } from './vasn-content-add.component';

describe('VasnContentAddComponent', () => {
  let component: VasnContentAddComponent;
  let fixture: ComponentFixture<VasnContentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasnContentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasnContentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
