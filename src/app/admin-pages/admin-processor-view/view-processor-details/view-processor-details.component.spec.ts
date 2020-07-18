import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProcessorDetailsComponent } from './view-processor-details.component';

describe('ViewProcessorDetailsComponent', () => {
  let component: ViewProcessorDetailsComponent;
  let fixture: ComponentFixture<ViewProcessorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProcessorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProcessorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
