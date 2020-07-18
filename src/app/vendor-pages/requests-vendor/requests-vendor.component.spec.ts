import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsVendorComponent } from './requests-vendor.component';

describe('RequestsVendorComponent', () => {
  let component: RequestsVendorComponent;
  let fixture: ComponentFixture<RequestsVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
