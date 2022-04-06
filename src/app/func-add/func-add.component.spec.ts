import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncAddComponent } from './func-add.component';

describe('FuncAddComponent', () => {
  let component: FuncAddComponent;
  let fixture: ComponentFixture<FuncAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
