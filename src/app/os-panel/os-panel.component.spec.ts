import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsPanelComponent } from './os-panel.component';

describe('OsPanelComponent', () => {
  let component: OsPanelComponent;
  let fixture: ComponentFixture<OsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
