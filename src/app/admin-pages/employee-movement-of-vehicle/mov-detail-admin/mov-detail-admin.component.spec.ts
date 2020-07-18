import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovDetailAdminComponent } from './mov-detail-admin.component';

describe('MovDetailAdminComponent', () => {
  let component: MovDetailAdminComponent;
  let fixture: ComponentFixture<MovDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
