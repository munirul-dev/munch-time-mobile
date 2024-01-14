import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionWithdrawPage } from './transaction-withdraw.page';

describe('TransactionWithdrawPage', () => {
  let component: TransactionWithdrawPage;
  let fixture: ComponentFixture<TransactionWithdrawPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionWithdrawPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
