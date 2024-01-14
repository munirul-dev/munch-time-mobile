import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationEditPage } from './reservation-edit.page';

describe('ReservationEditPage', () => {
  let component: ReservationEditPage;
  let fixture: ComponentFixture<ReservationEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservationEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
