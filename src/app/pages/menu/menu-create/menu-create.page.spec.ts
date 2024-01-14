import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCreatePage } from './menu-create.page';

describe('MenuCreatePage', () => {
  let component: MenuCreatePage;
  let fixture: ComponentFixture<MenuCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
