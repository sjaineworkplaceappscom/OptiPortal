import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcontactListComponent } from './vcontact-list.component';

describe('VcontactListComponent', () => {
  let component: VcontactListComponent;
  let fixture: ComponentFixture<VcontactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcontactListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcontactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
