import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationMenuPage } from './reservation-menu.page';

describe('ReservationMenuPage', () => {
  let component: ReservationMenuPage;
  let fixture: ComponentFixture<ReservationMenuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservationMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
