import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPagesComponent } from './vendor-pages.component';

describe('VendorPagesComponent', () => {
  let component: VendorPagesComponent;
  let fixture: ComponentFixture<VendorPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
