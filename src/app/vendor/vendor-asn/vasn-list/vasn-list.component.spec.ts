import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasnListComponent } from './vasn-list.component';

describe('VasnListComponent', () => {
  let component: VasnListComponent;
  let fixture: ComponentFixture<VasnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
