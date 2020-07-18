import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeebookingsComponent } from './employeebookings.component';

describe('EmployeebookingsComponent', () => {
  let component: EmployeebookingsComponent;
  let fixture: ComponentFixture<EmployeebookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeebookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeebookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
