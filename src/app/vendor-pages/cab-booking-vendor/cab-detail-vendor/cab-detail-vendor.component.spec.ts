import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabDetailVendorComponent } from './cab-detail-vendor.component';

describe('CabDetailVendorComponent', () => {
  let component: CabDetailVendorComponent;
  let fixture: ComponentFixture<CabDetailVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabDetailVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabDetailVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
