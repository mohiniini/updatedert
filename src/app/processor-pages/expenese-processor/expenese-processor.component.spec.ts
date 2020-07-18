import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeneseProcessorComponent } from './expenese-processor.component';

describe('ExpeneseProcessorComponent', () => {
  let component: ExpeneseProcessorComponent;
  let fixture: ComponentFixture<ExpeneseProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpeneseProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeneseProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
