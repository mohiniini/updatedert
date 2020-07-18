import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorPagesComponent } from './processor-pages.component';

describe('ProcessorPagesComponent', () => {
  let component: ProcessorPagesComponent;
  let fixture: ComponentFixture<ProcessorPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessorPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
