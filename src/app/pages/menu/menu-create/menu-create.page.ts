import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.page.html',
  styleUrls: ['./menu-create.page.scss'],
})
export class MenuCreatePage {
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
  ) { }

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
              this.menuService.create({
                // image: this.image,
                category: this.category,
                name: this.name,
                description: this.description,
                price: this.price,
                quantity: this.quantity,
                status: this.status,
              }).subscribe({
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
