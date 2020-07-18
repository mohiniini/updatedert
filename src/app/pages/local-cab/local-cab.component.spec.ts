import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCabComponent } from './local-cab.component';

describe('LocalCabComponent', () => {
  let component: LocalCabComponent;
  let fixture: ComponentFixture<LocalCabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalCabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
