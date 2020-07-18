import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDependencyComponent } from './new-dependency.component';

describe('NewDependencyComponent', () => {
  let component: NewDependencyComponent;
  let fixture: ComponentFixture<NewDependencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDependencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
