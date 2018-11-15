import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcontactUpdateComponent } from './vcontact-update.component';

describe('VcontactUpdateComponent', () => {
  let component: VcontactUpdateComponent;
  let fixture: ComponentFixture<VcontactUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcontactUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcontactUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
