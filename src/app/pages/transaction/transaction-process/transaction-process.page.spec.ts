import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionProcessPage } from './transaction-process.page';

describe('TransactionProcessPage', () => {
  let component: TransactionProcessPage;
  let fixture: ComponentFixture<TransactionProcessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionProcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
