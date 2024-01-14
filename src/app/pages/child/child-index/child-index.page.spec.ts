import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildIndexPage } from './child-index.page';

describe('ChildIndexPage', () => {
  let component: ChildIndexPage;
  let fixture: ComponentFixture<ChildIndexPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChildIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
