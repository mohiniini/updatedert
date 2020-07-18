import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovVendorComponent } from './mov-vendor.component';

describe('MovVendorComponent', () => {
  let component: MovVendorComponent;
  let fixture: ComponentFixture<MovVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
