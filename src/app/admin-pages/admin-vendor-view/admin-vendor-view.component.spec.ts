import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVendorViewComponent } from './admin-vendor-view.component';

describe('AdminVendorViewComponent', () => {
  let component: AdminVendorViewComponent;
  let fixture: ComponentFixture<AdminVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
