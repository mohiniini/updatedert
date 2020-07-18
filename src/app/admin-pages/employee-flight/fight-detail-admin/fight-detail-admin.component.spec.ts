import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightDetailAdminComponent } from './fight-detail-admin.component';

describe('FightDetailAdminComponent', () => {
  let component: FightDetailAdminComponent;
  let fixture: ComponentFixture<FightDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
