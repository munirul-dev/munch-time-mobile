import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationIndexPage } from './reservation-index.page';

describe('ReservationIndexPage', () => {
  let component: ReservationIndexPage;
  let fixture: ComponentFixture<ReservationIndexPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservationIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
