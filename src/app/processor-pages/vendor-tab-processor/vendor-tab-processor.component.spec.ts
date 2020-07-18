import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTabProcessorComponent } from './vendor-tab-processor.component';

describe('VendorTabProcessorComponent', () => {
  let component: VendorTabProcessorComponent;
  let fixture: ComponentFixture<VendorTabProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorTabProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorTabProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
