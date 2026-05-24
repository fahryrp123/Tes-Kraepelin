import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  stopwatchOutline, trendingUpOutline, bookOutline, settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom" class="custom-tab-bar">

        <ion-tab-button tab="beranda" href="/tabs/beranda">
          <ion-icon name="stopwatch-outline"></ion-icon>
          <ion-label>Tes</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="riwayat" href="/tabs/riwayat">
          <ion-icon name="trending-up-outline"></ion-icon>
          <ion-label>Riwayat</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="panduan" href="/tabs/panduan">
          <ion-icon name="book-outline"></ion-icon>
          <ion-label>Panduan</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="setelan" href="/tabs/setelan">
          <ion-icon name="settings-outline"></ion-icon>
          <ion-label>Setelan</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  `,
  styles: [`
    .custom-tab-bar {
      --background: #ffffff;
      --border: 1px solid #f0f0f0;
      --color: #aaaaaa;
      --color-selected: #0d5dd7;
      height: 60px;
      padding-bottom: env(safe-area-inset-bottom, 0px);

      ion-tab-button {
        --color: #aaaaaa;
        --color-selected: #0d5dd7;
        --padding-top: 8px;
        --padding-bottom: 8px;

        ion-icon {
          font-size: 22px;
          margin-bottom: 2px;
        }

        ion-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2px;
        }
      }
    }
  `]
})
export class TabsComponent {
  constructor() {
    addIcons({ stopwatchOutline, trendingUpOutline, bookOutline, settingsOutline });
  }
}
