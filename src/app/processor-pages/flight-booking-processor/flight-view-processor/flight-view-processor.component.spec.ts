import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightViewProcessorComponent } from './flight-view-processor.component';

describe('FlightViewProcessorComponent', () => {
  let component: FlightViewProcessorComponent;
  let fixture: ComponentFixture<FlightViewProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightViewProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightViewProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
