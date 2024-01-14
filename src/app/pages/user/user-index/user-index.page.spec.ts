import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserIndexPage } from './user-index.page';

describe('UserIndexPage', () => {
  let component: UserIndexPage;
  let fixture: ComponentFixture<UserIndexPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
