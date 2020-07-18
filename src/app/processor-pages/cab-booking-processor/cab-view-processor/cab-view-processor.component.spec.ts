import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabViewProcessorComponent } from './cab-view-processor.component';

describe('CabViewProcessorComponent', () => {
  let component: CabViewProcessorComponent;
  let fixture: ComponentFixture<CabViewProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabViewProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabViewProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
