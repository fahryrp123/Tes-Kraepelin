import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  timerOutline, barChartOutline, bookOutline, settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom" class="custom-tab-bar">

        <ion-tab-button tab="beranda" href="/tabs/beranda">
          <ion-icon name="timer-outline"></ion-icon>
          <ion-label>Mulai Tes</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="riwayat" href="/tabs/riwayat">
          <ion-icon name="bar-chart-outline"></ion-icon>
          <ion-label>Analisis</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="panduan" href="/tabs/panduan">
          <ion-icon name="book-outline"></ion-icon>
          <ion-label>Metode</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="setelan" href="/tabs/setelan">
          <ion-icon name="settings-outline"></ion-icon>
          <ion-label>Kustom</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  `,
  styles: [`
    .custom-tab-bar {
      --background: #ffffff;
      --border: 0;
      box-shadow: 0 -4px 12px rgba(0,0,0,0.02);
      border-top: 1px solid #f3f4f6;
      --color: #9ca3af;
      --color-selected: #005c4b;
      height: 64px;
      padding-bottom: env(safe-area-inset-bottom, 0px);

      ion-tab-button {
        --color: #9ca3af;
        --color-selected: #005c4b;
        --padding-top: 8px;
        --padding-bottom: 8px;
        transition: color 0.2s;

        ion-icon {
          font-size: 22px;
          margin-bottom: 4px;
        }

        ion-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0px;
        }
      }
    }
  `]
})
export class TabsComponent {
  constructor() {
    addIcons({ timerOutline, barChartOutline, bookOutline, settingsOutline });
  }
}
