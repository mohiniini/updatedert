import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MogDetailVendorComponent } from './mog-detail-vendor.component';

describe('MogDetailVendorComponent', () => {
  let component: MogDetailVendorComponent;
  let fixture: ComponentFixture<MogDetailVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MogDetailVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MogDetailVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
