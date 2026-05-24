import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { documentTextOutline, helpCircleOutline, phonePortraitOutline, notificationsOutline, eyeOutline, timerOutline } from 'ionicons/icons';

interface AppSettings {
  showCorrect: boolean;
  showWrong: boolean;
  showTimer: boolean;
  showNextQuestion: boolean;
  vibrateFeedback: boolean;
  displayType: 'horizontal' | 'vertical';
  numpadLayout: 'standard' | 'reverse';
}

@Component({
  selector: 'app-setelan',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>
          <div class="logo-container">
            <ion-icon name="document-text-outline" class="brand-icon"></ion-icon>
            <span class="brand-text">Kraepelin</span>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="content-wrapper">
        <div class="header-section">
          <h1>Pengaturan</h1>
          <p>Sesuaikan tampilan dan pengalaman tes sesuai kebutuhanmu.</p>
        </div>

        <!-- Tampilan Tes -->
        <div class="section-label-row mt-20">
          <ion-icon name="eye-outline" class="section-icon"></ion-icon>
          <span class="section-label">TAMPILAN SAAT TES</span>
        </div>
        <div class="card p-0 mt-8">
          <ion-list lines="full">
            <ion-item>
              <ion-label>Tampilkan jumlah benar</ion-label>
              <ion-toggle slot="end" [(ngModel)]="settings.showCorrect" color="primary" (ionChange)="saveSettings()"></ion-toggle>
            </ion-item>
            <ion-item>
              <ion-label>Tampilkan jumlah salah</ion-label>
              <ion-toggle slot="end" [(ngModel)]="settings.showWrong" color="primary" (ionChange)="saveSettings()"></ion-toggle>
            </ion-item>
            <ion-item>
              <ion-label>Tampilkan sisa waktu</ion-label>
              <ion-toggle slot="end" [(ngModel)]="settings.showTimer" color="primary" (ionChange)="saveSettings()"></ion-toggle>
            </ion-item>
            <ion-item>
              <ion-label>Tampilkan soal berikutnya</ion-label>
              <ion-toggle slot="end" [(ngModel)]="settings.showNextQuestion" color="primary" (ionChange)="saveSettings()"></ion-toggle>
            </ion-item>
          </ion-list>
        </div>

        <!-- Tampilan Soal -->
        <div class="section-label-row mt-20">
          <ion-icon name="timer-outline" class="section-icon"></ion-icon>
          <span class="section-label">TAMPILAN SOAL</span>
        </div>
        <div class="grid-2 mt-8">
          <div class="option-card" [class.active]="settings.displayType === 'horizontal'" (click)="settings.displayType = 'horizontal'; saveSettings()">
            <span class="text-large font-bold" [class.text-blue]="settings.displayType === 'horizontal'">4+8</span>
          </div>
          <div class="option-card vertical-math" [class.active]="settings.displayType === 'vertical'" (click)="settings.displayType = 'vertical'; saveSettings()">
            <div class="math-col">
              <span class="text-medium font-bold" [class.text-blue]="settings.displayType === 'vertical'">4</span>
              <span class="text-medium font-bold" [class.text-blue]="settings.displayType === 'vertical'">+ 8</span>
            </div>
          </div>
        </div>

        <!-- Tata Letak Numpad -->
        <div class="section-label-row mt-20">
          <ion-icon name="notifications-outline" class="section-icon"></ion-icon>
          <span class="section-label">TATA LETAK ANGKA</span>
        </div>
        <div class="grid-2 mt-8">
          <div class="option-card pad-card" [class.active]="settings.numpadLayout === 'standard'" (click)="settings.numpadLayout = 'standard'; saveSettings()">
            <div class="numpad-grid" [class.text-blue]="settings.numpadLayout === 'standard'" [class.text-black]="settings.numpadLayout !== 'standard'">
              <span class="font-bold">1</span><span class="font-bold">2</span><span class="font-bold">3</span>
              <span class="font-bold">4</span><span class="font-bold">5</span><span class="font-bold">6</span>
              <span class="font-bold">7</span><span class="font-bold">8</span><span class="font-bold">9</span>
              <span></span><span class="font-bold">0</span><span></span>
            </div>
          </div>
          <div class="option-card pad-card" [class.active]="settings.numpadLayout === 'reverse'" (click)="settings.numpadLayout = 'reverse'; saveSettings()">
            <div class="numpad-grid" [class.text-blue]="settings.numpadLayout === 'reverse'" [class.text-black]="settings.numpadLayout !== 'reverse'">
              <span class="font-bold">7</span><span class="font-bold">8</span><span class="font-bold">9</span>
              <span class="font-bold">4</span><span class="font-bold">5</span><span class="font-bold">6</span>
              <span class="font-bold">1</span><span class="font-bold">2</span><span class="font-bold">3</span>
              <span></span><span class="font-bold">0</span><span></span>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    ion-content { --background: #f7f9fa; }
    ion-toolbar { --background: #f7f9fa; }
    .logo-container {
      display: flex; align-items: center; gap: 8px;
      .brand-icon { color: #0d5dd7; font-size: 22px; }
      .brand-text { font-weight: 700; font-size: 18px; color: #0d5dd7; }
    }
    .help-icon { font-size: 24px; color: #555; margin-right: 16px; }

    .content-wrapper { padding: 16px 20px 40px; }
    .header-section {
      margin-bottom: 8px;
      h1 { font-size: 26px; font-weight: 800; color: #111; margin: 0 0 8px 0; }
      p { font-size: 13px; color: #666; margin: 0; }
    }

    .section-label-row {
      display: flex; align-items: center; gap: 8px;
      .section-icon { color: #0d5dd7; font-size: 16px; }
      .section-label { font-size: 10px; font-weight: 700; color: #555; letter-spacing: 0.5px; }
    }

    .card {
      background: white; border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.03); overflow: hidden;
      ion-item {
        --padding-start: 16px; --inner-padding-end: 16px; --min-height: 52px;
        --background: white; --border-color: #f5f5f5;
        ion-label { font-size: 14px; color: #111; }
      }
    }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .option-card {
      background: white; border-radius: 12px; border: 2px solid transparent;
      padding: 16px; display: flex; align-items: center; justify-content: center;
      min-height: 80px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); cursor: pointer;
      &.active { border-color: #0d5dd7; }
    }

    .text-large { font-size: 24px; }
    .text-medium { font-size: 18px; }
    .text-blue { color: #0d5dd7; }
    .text-black { color: #111; }
    .font-bold { font-weight: 700; }

    .vertical-math {
      display: flex; gap: 12px;
      .math-col { display: flex; flex-direction: column; align-items: flex-end; line-height: 1.2; }
    }

    .pad-card {
      padding: 12px; min-height: auto;
      .numpad-grid {
        display: grid; grid-template-columns: repeat(3, 1fr);
        gap: 8px 12px; width: 100%; text-align: center;
        span { font-size: 13px; }
      }
    }

    .version-text { font-size: 11px; color: #999; margin-top: 16px; }

    .mt-8 { margin-top: 8px; }
    .mt-16 { margin-top: 16px; }
    .mt-20 { margin-top: 20px; }
    .mt-24 { margin-top: 24px; }
    .p-0 { padding: 0; }
    .text-center { text-align: center; }
  `]
})
export class SetelanComponent implements OnInit {
  settings: AppSettings = {
    showCorrect: true,
    showWrong: true,
    showTimer: true,
    showNextQuestion: true,
    vibrateFeedback: true,
    displayType: 'vertical',
    numpadLayout: 'standard'
  };

  constructor() {
    addIcons({ documentTextOutline, helpCircleOutline, phonePortraitOutline, notificationsOutline, eyeOutline, timerOutline });
  }

  ngOnInit() {
    const stored = localStorage.getItem('kraepelin_settings');
    if (stored) {
      try { this.settings = { ...this.settings, ...JSON.parse(stored) }; } catch {}
    }
  }

  saveSettings() {
    localStorage.setItem('kraepelin_settings', JSON.stringify(this.settings));
  }
}
