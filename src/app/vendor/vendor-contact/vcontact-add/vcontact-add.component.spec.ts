import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcontactAddComponent } from './vcontact-add.component';

describe('VcontactAddComponent', () => {
  let component: VcontactAddComponent;
  let fixture: ComponentFixture<VcontactAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcontactAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcontactAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
