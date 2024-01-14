import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditPage } from './user-edit.page';

describe('UserEditPage', () => {
  let component: UserEditPage;
  let fixture: ComponentFixture<UserEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
