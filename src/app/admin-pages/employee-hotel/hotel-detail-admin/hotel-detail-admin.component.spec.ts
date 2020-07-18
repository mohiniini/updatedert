import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailAdminComponent } from './hotel-detail-admin.component';

describe('HotelDetailAdminComponent', () => {
  let component: HotelDetailAdminComponent;
  let fixture: ComponentFixture<HotelDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
