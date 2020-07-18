import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMovementOfGoodsComponent } from './employee-movement-of-goods.component';

describe('EmployeeMovementOfGoodsComponent', () => {
  let component: EmployeeMovementOfGoodsComponent;
  let fixture: ComponentFixture<EmployeeMovementOfGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMovementOfGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMovementOfGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
