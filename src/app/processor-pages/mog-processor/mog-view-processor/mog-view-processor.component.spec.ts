import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MogViewProcessorComponent } from './mog-view-processor.component';

describe('MogViewProcessorComponent', () => {
  let component: MogViewProcessorComponent;
  let fixture: ComponentFixture<MogViewProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MogViewProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MogViewProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
