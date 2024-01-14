import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationCreatePage } from './reservation-create.page';

describe('ReservationCreatePage', () => {
  let component: ReservationCreatePage;
  let fixture: ComponentFixture<ReservationCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservationCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
