import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabDetailAdminComponent } from './cab-detail-admin.component';

describe('CabDetailAdminComponent', () => {
  let component: CabDetailAdminComponent;
  let fixture: ComponentFixture<CabDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
