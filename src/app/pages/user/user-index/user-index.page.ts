import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.page.html',
  styleUrls: ['./user-index.page.scss'],
})
export class UserIndexPage implements OnInit, OnDestroy {
  isLoading: boolean = true;
  loadedUser: User[] = [];
  private userSub!: Subscription;

  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.userSub = this.userService.userList.subscribe(users => {
      this.loadedUser = users;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.userService.index().subscribe({
      next: (response: any) => {
        this.isLoading = false;
      }, error: (error: any) => {
        this.isLoading = false;
        this.showToast('An error occurred, please try again later!', 2000, 'warning');
      }
    });
  }

  deleteItem(item: User) {
    this.alertController.create({
      header: 'Delete User',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: () => {
            this.userService.delete({
              id: item.id,
            }).subscribe({
              next: (response: any) => {
                this.showToast('User deleted successfully!', 2000, 'checkmark');
                this.ionViewWillEnter();
              }, error: (error: any) => {
                this.showToast(error.error.message ? error.error.message : 'An error occurred, please try again later!', 2000, 'warning');
              }
            });
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
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

  private showAlert(title: string, text: string) {
    this.alertController.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    }).then(toastElement => {
      toastElement.present();
    });
  }

}
