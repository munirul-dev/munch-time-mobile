import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
})
export class QrScanPage implements AfterViewInit {
  @ViewChild('video', { static: false }) video: ElementRef | undefined;
  @ViewChild('canvas', { static: false }) canvas: ElementRef | undefined;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef | undefined;

  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult: any = null;
  loading!: HTMLIonLoadingElement | null;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
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
        this.scanResult = code.data;
        this.showQrToast();
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
        this.scanResult = code.data;
        this.showQrToast();
      }
    };
    if (file) {
      img.src = URL.createObjectURL(file);
    }
  }

  // Helper functions
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            if (this.scanResult) {
              window.open(this.scanResult, '_system', 'location=yes');
            }
          }
        }
      ]
    });
    toast.present();
  }

  reset() {
    this.scanResult = null;
  }

  stopScan() {
    this.scanActive = false;
  }

}
