import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VasnNotesComponent } from './vasn-notes.component';

describe('VasnNotesComponent', () => {
  let component: VasnNotesComponent;
  let fixture: ComponentFixture<VasnNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VasnNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VasnNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
