import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovViewProcessorComponent } from './mov-view-processor.component';

describe('MovViewProcessorComponent', () => {
  let component: MovViewProcessorComponent;
  let fixture: ComponentFixture<MovViewProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovViewProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovViewProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
