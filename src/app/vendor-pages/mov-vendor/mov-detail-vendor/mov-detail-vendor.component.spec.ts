import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovDetailVendorComponent } from './mov-detail-vendor.component';

describe('MovDetailVendorComponent', () => {
  let component: MovDetailVendorComponent;
  let fixture: ComponentFixture<MovDetailVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovDetailVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovDetailVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
