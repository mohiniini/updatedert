import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMovementOfVehicleComponent } from './employee-movement-of-vehicle.component';

describe('EmployeeMovementOfVehicleComponent', () => {
  let component: EmployeeMovementOfVehicleComponent;
  let fixture: ComponentFixture<EmployeeMovementOfVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMovementOfVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMovementOfVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
