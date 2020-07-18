import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProcessorComponent } from './employee-processor.component';

describe('EmployeeProcessorComponent', () => {
  let component: EmployeeProcessorComponent;
  let fixture: ComponentFixture<EmployeeProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
