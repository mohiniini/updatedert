import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovProcessorComponent } from './mov-processor.component';

describe('MovProcessorComponent', () => {
  let component: MovProcessorComponent;
  let fixture: ComponentFixture<MovProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
