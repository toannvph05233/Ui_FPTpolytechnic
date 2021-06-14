import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillDoctorNearMeComponent } from './fill-doctor-near-me.component';

describe('FillDoctorNearMeComponent', () => {
  let component: FillDoctorNearMeComponent;
  let fixture: ComponentFixture<FillDoctorNearMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillDoctorNearMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillDoctorNearMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
