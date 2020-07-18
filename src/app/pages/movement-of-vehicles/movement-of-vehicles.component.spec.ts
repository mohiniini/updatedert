import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementOfVehiclesComponent } from './movement-of-vehicles.component';

describe('MovementOfVehiclesComponent', () => {
  let component: MovementOfVehiclesComponent;
  let fixture: ComponentFixture<MovementOfVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementOfVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementOfVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
