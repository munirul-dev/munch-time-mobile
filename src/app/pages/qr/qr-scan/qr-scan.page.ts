import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { Reservation } from 'src/app/model/reservation.model';
import { Student } from 'src/app/model/student.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
})
export class QrScanPage implements AfterViewInit {
  isLoading: boolean = false;
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  qrCodeData: any = null;
  loading!: HTMLIonLoadingElement | null;
  studentData: Student | null = null;
  reservationData: Reservation | null = null;
  @ViewChild('video', { static: false }) video: ElementRef | undefined;
  @ViewChild('canvas', { static: false }) canvas: ElementRef | undefined;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef | undefined;

  constructor(
    private plt: Platform,
    private loadingCtrl: LoadingController,
    private reservationService: ReservationService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }
  }

  ngAfterViewInit() {
    if (this.canvas) {
      this.canvasElement = this.canvas.nativeElement;
      this.canvasContext = this.canvasElement.getContext('2d');
    }
    if (this.video) {
      this.videoElement = this.video.nativeElement;
    }
  }

  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });

    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();

    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }

  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code) {
        this.scanActive = false;
        this.qrCodeData = code.data;
        this.checkReservation();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  captureImage() {
    if (this.fileinput) {
      this.fileinput.nativeElement.click();
    }
  }

  handleFile(event: any) {
    const file = event?.target.files.item(0);

    var img = new Image();
    img.onload = () => {
      this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code) {
        this.qrCodeData = code.data;
        this.checkReservation();
      }
    };
    if (file) {
      img.src = URL.createObjectURL(file);
    }
  }

  reset() {
    this.qrCodeData = null;
  }

  stopScan() {
    this.scanActive = false;
  }

  checkReservation() {
    this.isLoading = true;
    this.reservationService.scanQR({ id: this.qrCodeData }).subscribe({
      next: (result: any) => {
        this.studentData = result.data.student;
        this.reservationData = result.data.reservation;
        this.isLoading = false;
      }, error: (error) => {
        this.isLoading = false;
        this.showAlert('Error', 'An error occurred, please try again later!');
      }
    });
  }

  redeemReservation() {
    if (this.reservationData) {
      this.alertController.create({
        header: 'Redeem Reservation',
        message: 'Are you sure you want to redeem this reservation?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Yes',
            handler: () => {
              this.isLoading = true;
              this.reservationService.redeem({ id: this.reservationData ? this.reservationData.id : '' }).subscribe({
                next: (result: any) => {
                  this.isLoading = false;
                  this.qrCodeData = null;
                  this.reservationData = null;
                  this.studentData = null;
                  this.showAlert('Success', 'Reservation redeemed successfully!');
                }, error: (error) => {
                  this.isLoading = false;
                  this.showAlert('Error', 'An error occurred, please try again later!');
                }
              });
            }
          }
        ]
      }).then(alertElement => {
        alertElement.present();
      });
    }

  }

  private showAlert(title: string, text: string) {
    this.alertController.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  private showToast(text: string, time: number, buttonIcon: string) {
    this.toastController.create({
      message: text,
      duration: time,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: buttonIcon,
          role: 'cancel',
        }
      ]
    }).then(toastElement => {
      toastElement.present();
    });
  }

}
