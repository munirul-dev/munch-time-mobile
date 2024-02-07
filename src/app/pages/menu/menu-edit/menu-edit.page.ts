import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.page.html',
  styleUrls: ['./menu-edit.page.scss'],
})
export class MenuEditPage {
  file: File | null = null;
  image: string = '';
  category: string = '';
  name: string = '';
  description: string = '';
  price: number | null = null;
  quantity: number | null = null;
  status: boolean = true;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private menuService: MenuService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.menuService.edit({
        id: params.get('id'),
      }).subscribe({
        next: (response: any) => {
          this.image = response.data.image;
          this.category = response.data.category;
          this.name = response.data.name;
          this.description = response.data.description;
          this.price = response.data.price;
          this.quantity = response.data.quantity;
          this.status = response.data.status;
        }, error: (error: any) => {
          this.showToast('An error occurred, please try again later!', 2000, 'warning');
        }
      });
    });
  }

  pictureAction() {
    this.actionSheetController.create({
      header: 'Edit Image',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            // take photo
          }
        },
        {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            // pick from file
          }
        },
        {
          text: 'Remove',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.file = null;
            this.image = '';
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        }
      ]
    }).then(actionSheetElement => {
      actionSheetElement.present();
    });
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      this.showAlert('Form Incomplete', 'Please complete the form properly!');
    } else {
      this.alertController.create({
        header: 'Update Menu',
        message: 'Are you sure you want to update this menu?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm',
            handler: () => {
              this.menuService.update({
                id: this.activatedRoute.snapshot.paramMap.get('id'),
                // image: this.image,
                category: this.category,
                name: this.name,
                description: this.description,
                price: this.price,
                quantity: this.quantity,
                status: this.status,
              }).subscribe({
                next: (response: any) => {
                  this.showToast('Menu updated successfully!', 2000, 'checkmark');
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
