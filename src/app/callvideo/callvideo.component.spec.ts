import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallvideoComponent } from './callvideo.component';

describe('CallvideoComponent', () => {
  let component: CallvideoComponent;
  let fixture: ComponentFixture<CallvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallvideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
