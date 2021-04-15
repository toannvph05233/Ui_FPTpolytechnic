import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Websocket2Component } from './websocket2.component';

describe('Websocket2Component', () => {
  let component: Websocket2Component;
  let fixture: ComponentFixture<Websocket2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Websocket2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Websocket2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
