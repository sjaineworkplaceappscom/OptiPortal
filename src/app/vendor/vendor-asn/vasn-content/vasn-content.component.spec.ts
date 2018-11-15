import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasnContentComponent } from './vasn-content.component';

describe('VasnContentComponent', () => {
  let component: VasnContentComponent;
  let fixture: ComponentFixture<VasnContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasnContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasnContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
