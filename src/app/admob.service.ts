import { Injectable } from '@angular/core';
import {
  AdMob,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition
} from '@capacitor-community/admob';
import { Platform } from '@ionic/angular';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdMobService {

  private readonly bannerAdId = environment.production
    ? 'ca-app-pub-5896599711889312/2628805325'
    : 'ca-app-pub-3940256099942544/6300978111';
  private readonly interstitialAdId = environment.production
    ? 'ca-app-pub-5896599711889312/6644071958'
    : 'ca-app-pub-3940256099942544/1033173712';

  private isBannerLoaded = false;

  constructor(private platform: Platform) {}

  // ==========================================
  // INITIALIZE ADMOB
  // ==========================================

  async initialize() {
    if (!this.platform.is('capacitor')) {
      console.log('AdMob tidak dijalankan karena bukan Capacitor');
      return;
    }

    try {
      await AdMob.initialize({});
      console.log('AdMob berhasil diinisialisasi');
    } catch (error) {
      console.error('AdMob gagal diinisialisasi:', error);
    }
  }

  // ==========================================
  // BANNER
  // ==========================================

  async showBanner() {
    if (!this.platform.is('capacitor')) {
      return;
    }

    const options: BannerAdOptions = {
      adId: this.bannerAdId,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,

      isTesting: !environment.production
    };

    try {
      await AdMob.showBanner(options);

      this.isBannerLoaded = true;

      document.body.classList.add('ad-banner-visible');

      console.log('TEST Banner berhasil diminta');
    } catch (error) {
      console.error('TEST Banner gagal:', error);
    }
  }

  async hideBanner() {
    if (!this.platform.is('capacitor') || !this.isBannerLoaded) {
      return;
    }

    try {
      await AdMob.hideBanner();

      document.body.classList.remove('ad-banner-visible');

      console.log('Banner disembunyikan');
    } catch (error) {
      console.error('Gagal menyembunyikan banner:', error);
    }
  }

  async resumeBanner() {
    if (!this.platform.is('capacitor') || !this.isBannerLoaded) {
      return;
    }

    try {
      await AdMob.resumeBanner();

      document.body.classList.add('ad-banner-visible');

      console.log('Banner ditampilkan kembali');
    } catch (error) {
      console.error('Gagal menampilkan kembali banner:', error);
    }
  }

  async removeBanner() {
    if (!this.platform.is('capacitor')) {
      return;
    }

    try {
      await AdMob.removeBanner();

      this.isBannerLoaded = false;

      document.body.classList.remove('ad-banner-visible');

      console.log('Banner dihapus');
    } catch (error) {
      console.error('Gagal menghapus banner:', error);
    }
  }

  // ==========================================
  // INTERSTITIAL
  // ==========================================

  async prepareInterstitial() {
    if (!this.platform.is('capacitor')) {
      return;
    }

    try {
      await AdMob.prepareInterstitial({
        adId: this.interstitialAdId,

        isTesting: !environment.production
      });

      console.log('TEST Interstitial berhasil disiapkan');
    } catch (error) {
      console.error('TEST Interstitial gagal disiapkan:', error);
    }
  }

  async showInterstitial() {
    if (!this.platform.is('capacitor')) {
      return;
    }

    try {
      await AdMob.showInterstitial();

      console.log('TEST Interstitial ditampilkan');
    } catch (error) {
      console.error('TEST Interstitial gagal ditampilkan:', error);
    }
  }
}