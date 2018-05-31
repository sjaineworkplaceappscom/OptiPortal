import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantselectionComponent } from './tenantselection.component';

describe('TenantselectionComponent', () => {
  let component: TenantselectionComponent;
  let fixture: ComponentFixture<TenantselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
