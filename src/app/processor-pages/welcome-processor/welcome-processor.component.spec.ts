import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeProcessorComponent } from './welcome-processor.component';

describe('WelcomeProcessorComponent', () => {
  let component: WelcomeProcessorComponent;
  let fixture: ComponentFixture<WelcomeProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
