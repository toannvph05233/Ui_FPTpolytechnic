import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillNannyNearMeComponent } from './fill-nanny-near-me.component';

describe('FillNannyNearMeComponent', () => {
  let component: FillNannyNearMeComponent;
  let fixture: ComponentFixture<FillNannyNearMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillNannyNearMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillNannyNearMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
