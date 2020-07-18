import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyholderComponent } from './policyholder.component';

describe('PolicyholderComponent', () => {
  let component: PolicyholderComponent;
  let fixture: ComponentFixture<PolicyholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
