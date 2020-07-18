import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementOfGoodsComponent } from './movement-of-goods.component';

describe('MovementOfGoodsComponent', () => {
  let component: MovementOfGoodsComponent;
  let fixture: ComponentFixture<MovementOfGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementOfGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementOfGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
