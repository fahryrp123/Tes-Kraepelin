import { Component, OnInit } from '@angular/core';
import { AdMobService } from './admob.service';
import { App } from '@capacitor/app';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  showSplash = true;
  fadeOutSplash = false;
  useFallback = false;

  constructor(
    private admobService: AdMobService,
    private platform: Platform,
    private router: Router,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Menggunakan handler bawaan Ionic agar tidak bentrok
      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        const currentUrl = this.router.url;

        if (currentUrl === '/tabs/beranda' || currentUrl === '/tabs' || currentUrl === '/') {
          // Jika di halaman utama/home, tampilkan konfirmasi keluar
          this.showExitConfirm();
        } else if (currentUrl.startsWith('/tabs/')) {
          // Jika di tab lain (Riwayat, Panduan, Setelan), kembalikan ke Beranda
          this.router.navigate(['/tabs/beranda']);
        } else {
          // Untuk halaman lain (Tes, Hasil, dll), gunakan fungsi back normal
          processNextHandler();
        }
      });
    });
  }

  async showExitConfirm() {
    const alert = await this.alertController.create({
      header: 'Keluar',
      message: 'Apakah Anda yakin ingin keluar dari aplikasi?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Ya, Keluar',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });
    await alert.present();
  }

  async ngOnInit() {
    await this.admobService.initialize();
    this.admobService.showBanner();

    // Tahan splash screen selama 3.2 detik agar animasi epik bisa selesai
    setTimeout(() => {
      this.fadeOutSplash = true;
      // Hapus dari layar setelah animasi 3D selesai (1 detik)
      setTimeout(() => {
        this.showSplash = false;
      }, 1000);
    }, 3200);
  }

  // Jika logo.png tidak ditemukan, tampilkan logo inisial "K" cadangan
  onImgError(event: any) {
    event.target.style.display = 'none';
    this.useFallback = true;
  }
}
