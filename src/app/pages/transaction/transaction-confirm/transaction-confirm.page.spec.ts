import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionConfirmPage } from './transaction-confirm.page';

describe('TransactionConfirmPage', () => {
  let component: TransactionConfirmPage;
  let fixture: ComponentFixture<TransactionConfirmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
