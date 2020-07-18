import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFlightComponent } from './employee-flight.component';

describe('EmployeeFlightComponent', () => {
  let component: EmployeeFlightComponent;
  let fixture: ComponentFixture<EmployeeFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
