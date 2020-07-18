import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseReimbursementsComponent } from './expense-reimbursements.component';

describe('ExpenseReimbursementsComponent', () => {
  let component: ExpenseReimbursementsComponent;
  let fixture: ComponentFixture<ExpenseReimbursementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseReimbursementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseReimbursementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
