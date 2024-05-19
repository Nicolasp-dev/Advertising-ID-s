import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

declare var cordova: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public platform: Platform, private toastCtrl: ToastController) {}

  getAdvertisingId() {
    this.requestPermission();
  }

  public async requestPermission(): Promise<any> {
    try {
      const idfaPlugin = cordova.plugins.idfa;
      const info = await idfaPlugin.getInfo();

      if (!info.trackingLimited) {
        this.logAndShowId(info);
      } else if (
        info.trackingPermission ===
        idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED
      ) {
        const permissionResult = await idfaPlugin.requestPermission();
        if (permissionResult === idfaPlugin.TRACKING_PERMISSION_AUTHORIZED) {
          const info = await idfaPlugin.getInfo();
          this.logAndShowId(info);
        }
      }
    } catch (error) {
      console.error('Error al obtener IDFA/AAID:', error);
    }
  }

  public async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  private logAndShowId(info: any) {
    const idfaOrAaid = info.idfa || info.aaid;
    if (idfaOrAaid) {
      this.showToast(`THIS IS THE MAID: ${idfaOrAaid}`);
      console.log('IDFA/AAID:', idfaOrAaid);
    }
  }
}
