import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildEditPage } from './child-edit.page';

describe('ChildEditPage', () => {
  let component: ChildEditPage;
  let fixture: ComponentFixture<ChildEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChildEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
