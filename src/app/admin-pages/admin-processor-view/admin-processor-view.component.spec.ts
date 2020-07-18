import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProcessorViewComponent } from './admin-processor-view.component';

describe('AdminProcessorViewComponent', () => {
  let component: AdminProcessorViewComponent;
  let fixture: ComponentFixture<AdminProcessorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProcessorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProcessorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
