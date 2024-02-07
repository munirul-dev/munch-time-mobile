import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationSelectPage } from './reservation-select.page';

describe('ReservationSelectPage', () => {
  let component: ReservationSelectPage;
  let fixture: ComponentFixture<ReservationSelectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservationSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
