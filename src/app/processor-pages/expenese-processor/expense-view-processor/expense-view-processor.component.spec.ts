import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseViewProcessorComponent } from './expense-view-processor.component';

describe('ExpenseViewProcessorComponent', () => {
  let component: ExpenseViewProcessorComponent;
  let fixture: ComponentFixture<ExpenseViewProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseViewProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseViewProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
