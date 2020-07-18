import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorDetailsComponent } from './view-vendor-details.component';

describe('ViewVendorDetailsComponent', () => {
  let component: ViewVendorDetailsComponent;
  let fixture: ComponentFixture<ViewVendorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVendorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVendorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
