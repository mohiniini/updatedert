import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementsDetailsAdminComponent } from './reimbursements-details-admin.component';

describe('ReimbursementsDetailsAdminComponent', () => {
  let component: ReimbursementsDetailsAdminComponent;
  let fixture: ComponentFixture<ReimbursementsDetailsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementsDetailsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementsDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
