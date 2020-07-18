import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrDeleteDepencenceComponent } from './edit-or-delete-depencence.component';

describe('EditOrDeleteDepencenceComponent', () => {
  let component: EditOrDeleteDepencenceComponent;
  let fixture: ComponentFixture<EditOrDeleteDepencenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrDeleteDepencenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrDeleteDepencenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
