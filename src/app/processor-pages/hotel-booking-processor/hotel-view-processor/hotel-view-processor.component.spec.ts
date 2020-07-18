import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelViewProcessorComponent } from './hotel-view-processor.component';

describe('HotelViewProcessorComponent', () => {
  let component: HotelViewProcessorComponent;
  let fixture: ComponentFixture<HotelViewProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelViewProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelViewProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
