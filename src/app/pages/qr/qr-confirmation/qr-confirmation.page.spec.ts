import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrConfirmationPage } from './qr-confirmation.page';

describe('QrConfirmationPage', () => {
  let component: QrConfirmationPage;
  let fixture: ComponentFixture<QrConfirmationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrConfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
