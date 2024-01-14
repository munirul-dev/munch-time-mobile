import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuIndexPage } from './menu-index.page';

describe('MenuIndexPage', () => {
  let component: MenuIndexPage;
  let fixture: ComponentFixture<MenuIndexPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
