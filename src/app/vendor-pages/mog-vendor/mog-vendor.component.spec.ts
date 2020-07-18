import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MogVendorComponent } from './mog-vendor.component';

describe('MogVendorComponent', () => {
  let component: MogVendorComponent;
  let fixture: ComponentFixture<MogVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MogVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MogVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
