import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.page.html',
  styleUrls: ['./menu-create.page.scss'],
})
export class MenuCreatePage {
  file: File | Blob | null = null;
  image: string = '';
  category: string = '';
  name: string = '';
  description: string = '';
  price: number | null = null;
  quantity: number | null = null;
  status: boolean = true;
  @ViewChild('imagePicker') imagePickerInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private menuService: MenuService,
    private navController: NavController,
    private actionSheetController: ActionSheetController,
  ) { }

  selectImage() {
    let options: any = [
      {
        text: 'Upload File',
        icon: 'folder',
        handler: () => {
          this.imagePickerInput?.nativeElement.click();
        }
      }
    ];

    if (this.image !== '') {
      options.push({
        text: 'Remove',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          this.file = null;
          this.image = '';
        }
      });
    }

    options.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
    });

    this.actionSheetController.create({
      header: this.image ? 'Edit Image' : 'Add Image',
      buttons: options
    }).then(actionSheetElement => {
      actionSheetElement.present();
    });
  }

  pickImageFile(event: any) {
    if (event.target.files[0]) {
      const fileFormat = event.target.files[0].type.split('/')[1];
      if (fileFormat === 'jpeg' || fileFormat === 'png' || fileFormat === 'jpg') {
        let selectedFile = (event.target as HTMLInputElement).files;
        if (selectedFile) {
          this.file = selectedFile[0];
          this.image = URL.createObjectURL(this.file);
        }
        event.target.value = null;
      } else {
        this.showAlert('Format Tidak Sah', `Format fail yang dipilih adalah format <b>${fileFormat}</b>. Pastikan anda memilih format imej yang disokong, iaitu <b>jpg, jpeg atau png</b>.`);
        event.target.value = null;
      }
    }
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      this.showAlert('Form Incomplete', 'Please complete the form properly!');
    } else {
      this.alertController.create({
        header: 'Create Menu',
        message: 'Are you sure you want to create this menu?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm',
            handler: () => {
              let body = new FormData();
              if (this.file) {
                body.append('file', this.file);
              }
              body.append('image', this.image);
              body.append('category', this.category);
              body.append('name', this.name);
              body.append('description', this.description);
              body.append('price', this.price?.toString() || '0');
              body.append('quantity', this.quantity?.toString() || '0');
              body.append('status', this.status ? '1' : '0');
              this.menuService.create(body).subscribe({
                next: (response: any) => {
                  this.showToast('Menu created successfully!', 2000, 'checkmark');
                  this.navController.navigateBack('/pages/menus');
                }, error: (error: any) => {
                  this.showToast('An error occurred, please try again later!', 2000, 'warning');
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
