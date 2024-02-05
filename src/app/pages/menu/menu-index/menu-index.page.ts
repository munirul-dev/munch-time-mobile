import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/model/menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-index',
  templateUrl: './menu-index.page.html',
  styleUrls: ['./menu-index.page.scss'],
})
export class MenuIndexPage implements OnInit, OnDestroy {
  isLoading: boolean = true;
  loadedMenu: Menu[] = [];
  private menuSub!: Subscription;

  constructor(
    private menuService: MenuService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.menuSub = this.menuService.menuList.subscribe(menus => {
      this.loadedMenu = menus;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.menuService.index().subscribe({
      next: (response: any) => {
        this.isLoading = false;
      }, error: (error: any) => {
        this.isLoading = false;
        this.showToast('An error occurred, please try again later!', 2000, 'warning');
      }
    });
  }

  seperateGroup(item: Menu) {
    const currentIndex = this.loadedMenu.indexOf(item);
    const previousIndex = currentIndex - 1;
    const currentItem = this.loadedMenu[currentIndex].category;

    if (currentIndex !== 0) {
      const previousItem = this.loadedMenu[previousIndex].category;
      if (previousItem !== currentItem) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  onDeleteItem(menu: Menu) {
  }

  deleteItem(menu: Menu) {

  }

  ngOnDestroy() {
    if (this.menuSub) {
      this.menuSub.unsubscribe();
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
