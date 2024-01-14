import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildCreatePage } from './child-create.page';

describe('ChildCreatePage', () => {
  let component: ChildCreatePage;
  let fixture: ComponentFixture<ChildCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChildCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
