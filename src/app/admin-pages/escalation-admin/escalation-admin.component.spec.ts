import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationAdminComponent } from './escalation-admin.component';

describe('EscalationAdminComponent', () => {
  let component: EscalationAdminComponent;
  let fixture: ComponentFixture<EscalationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
