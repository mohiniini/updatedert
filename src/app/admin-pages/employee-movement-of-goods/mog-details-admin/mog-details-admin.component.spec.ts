import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MogDetailsAdminComponent } from './mog-details-admin.component';

describe('MogDetailsAdminComponent', () => {
  let component: MogDetailsAdminComponent;
  let fixture: ComponentFixture<MogDetailsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MogDetailsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MogDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
