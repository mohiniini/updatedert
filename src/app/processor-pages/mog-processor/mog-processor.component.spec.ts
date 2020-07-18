import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MogProcessorComponent } from './mog-processor.component';

describe('MogProcessorComponent', () => {
  let component: MogProcessorComponent;
  let fixture: ComponentFixture<MogProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MogProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MogProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
