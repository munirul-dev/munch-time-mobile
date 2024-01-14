import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionIndexPage } from './transaction-index.page';

describe('TransactionIndexPage', () => {
  let component: TransactionIndexPage;
  let fixture: ComponentFixture<TransactionIndexPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
