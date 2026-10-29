import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  flask, settingsOutline, buildOutline, flashOutline, phonePortraitOutline, keyOutline, checkmarkCircle
} from 'ionicons/icons';

interface AppSettings {
  showCorrect: boolean;
  showWrong: boolean;
  showTimer: boolean;
  showNextQuestion: boolean;
  vibrateFeedback: boolean;
  displayType: 'horizontal' | 'vertical';
  numpadLayout: 'standard' | 'reverse';
  duration?: number;
  darkMode?: boolean;
}

@Component({
  selector: 'app-setelan',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template: `
    <ion-content>
      <div class="page-background">

        <div class="top-header">
          <div class="header-left">
            <div class="logo-box"><ion-icon name="flask"></ion-icon></div>
            <div class="header-titles">
              <span class="lab-title">KRAEPELIN LAB</span>
              <h1 class="page-title">Pengaturan</h1>
            </div>
          </div>
        </div>

        <div class="settings-group">
          <div class="group-header">
            <ion-icon name="flash-outline"></ion-icon>
            <h3>Tampilan Saat Tes</h3>
          </div>
          <div class="setting-item">
            <div class="s-info">
              <h4>Tampilkan Skor Real-Time</h4>
              <p>Melihat jumlah benar/salah saat tes berjalan</p>
            </div>
            <div class="toggle-wrap">
              <input type="checkbox" id="t1" class="custom-toggle" [(ngModel)]="appSettings.showCorrect" (change)="toggleScore()">
              <label for="t1"></label>
            </div>
          </div>
          <div class="setting-item">
            <div class="s-info">
              <h4>Indikator Sisa Waktu (Timer)</h4>
              <p>Munculkan bar waktu di bagian atas layar</p>
            </div>
            <div class="toggle-wrap">
              <input type="checkbox" id="t2" class="custom-toggle" [(ngModel)]="appSettings.showTimer" (change)="saveSettings()">
              <label for="t2"></label>
            </div>
          </div>
          <div class="setting-item">
            <div class="s-info">
              <h4>Tampilkan Soal Berikutnya</h4>
              <p>Melihat dua angka selanjutnya lebih awal</p>
            </div>
            <div class="toggle-wrap">
              <input type="checkbox" id="tNext" class="custom-toggle" [(ngModel)]="appSettings.showNextQuestion" (change)="saveSettings()">
              <label for="tNext"></label>
            </div>
          </div>
          <div class="setting-item">
            <div class="s-info">
              <h4>Mode Gelap (Dark Mode)</h4>
              <p>Gunakan tema gelap agar layar tidak silau</p>
            </div>
            <div class="toggle-wrap">
              <input type="checkbox" id="t3" class="custom-toggle" [(ngModel)]="appSettings.darkMode" (change)="toggleDarkMode()">
              <label for="t3"></label>
            </div>
          </div>
        </div>

        <div class="settings-group">
          <div class="group-header">
            <ion-icon name="phonePortraitOutline"></ion-icon>
            <h3>Format Layout Soal</h3>
          </div>
          <div class="layout-options">
            <div class="layout-card" [class.active]="appSettings.displayType === 'vertical'" (click)="setLayout('vertical')">
              <div class="layout-preview vert">
                <div class="num">8</div><div class="num">7</div>
              </div>
              <h4>Vertikal</h4>
              <p>Atas ke Bawah</p>
              <ion-icon name="checkmark-circle" class="check-icon"></ion-icon>
            </div>
            <div class="layout-card" [class.active]="appSettings.displayType === 'horizontal'" (click)="setLayout('horizontal')">
              <div class="layout-preview horiz">
                <div class="num">8</div><div class="num">7</div>
              </div>
              <h4>Horizontal</h4>
              <p>Kiri ke Kanan</p>
              <ion-icon name="checkmark-circle" class="check-icon"></ion-icon>
            </div>
          </div>
        </div>

        <div class="settings-group">
          <div class="group-header">
            <ion-icon name="keyOutline"></ion-icon>
            <h3>Posisi Angka Keyboard</h3>
          </div>
          <div class="numpad-options">
            <div class="numpad-card" [class.active]="appSettings.numpadLayout === 'standard'" (click)="setNumpad('standard')">
              <div class="n-grid">
                <span>1</span><span>2</span><span>3</span>
                <span>4</span><span>5</span><span>6</span>
                <span>7</span><span>8</span><span>9</span>
              </div>
              <h4>Angka 1 di Atas</h4>
              <ion-icon name="checkmark-circle" class="check-icon"></ion-icon>
            </div>
            <div class="numpad-card" [class.active]="appSettings.numpadLayout === 'reverse'" (click)="setNumpad('reverse')">
              <div class="n-grid">
                <span>7</span><span>8</span><span>9</span>
                <span>4</span><span>5</span><span>6</span>
                <span>1</span><span>2</span><span>3</span>
              </div>
              <h4>Angka 7 di Atas</h4>
              <ion-icon name="checkmark-circle" class="check-icon"></ion-icon>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    :host { display: block; height: 100%; position: relative; }
    ion-content { --background: #fafbfc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .page-background { padding: 20px; padding-bottom: 20px; padding-top: max(40px, env(safe-area-inset-top)); }

    .top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .header-left { display: flex; align-items: center; gap: 12px; }
    .logo-box { width: 40px; height: 40px; background: #005c4b; border-radius: 12px; display: flex; justify-content: center; align-items: center; color: white; font-size: 20px; }
    .header-titles { display: flex; flex-direction: column; }
    .lab-title { font-size: 10px; font-weight: 700; color: #6b7280; letter-spacing: 1px; }
    .page-title { font-size: 20px; font-weight: 800; color: #111; margin: 0; line-height: 1.2; }

    .settings-group { margin-bottom: 28px; }
    .group-header { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
    .group-header ion-icon { font-size: 18px; color: #005c4b; background: #e5f5f2; padding: 4px; border-radius: 6px; }
    .group-header h3 { font-size: 14px; font-weight: 800; color: #111; margin: 0; }

    .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: white; border-radius: 12px; border: 1px solid #f1f5f9; margin-bottom: 8px; }
    .s-info h4 { font-size: 13px; font-weight: 700; color: #1e293b; margin: 0 0 4px 0; }
    .s-info p { font-size: 11px; color: #64748b; margin: 0; line-height: 1.3; max-width: 85%; }

    /* Custom Toggle Switch */
    .toggle-wrap { position: relative; width: 44px; height: 24px; }
    .custom-toggle { opacity: 0; width: 0; height: 0; position: absolute; }
    .custom-toggle + label { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
    .custom-toggle + label:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .custom-toggle:checked + label { background-color: #10b981; }
    .custom-toggle:checked + label:before { transform: translateX(20px); }

    .layout-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .layout-card { position: relative; background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 16px; cursor: pointer; transition: 0.2s; text-align: center; }
    .layout-card.active { border-color: #005c4b; background: #f0f7f5; }
    .layout-preview { background: #f1f5f9; border-radius: 8px; padding: 12px; margin-bottom: 12px; display: flex; gap: 4px; justify-content: center; align-items: center; border: 1px solid #e2e8f0; }
    .layout-preview.vert { flex-direction: column; }
    .layout-preview.horiz { flex-direction: row; }
    .layout-preview .num { width: 24px; height: 24px; background: white; border-radius: 4px; display: flex; justify-content: center; align-items: center; font-size: 12px; font-weight: 700; color: #475569; border: 1px solid #cbd5e1; }
    .layout-card h4 { font-size: 12px; font-weight: 800; color: #1e293b; margin: 0 0 4px 0; }
    .layout-card p { font-size: 10px; color: #64748b; margin: 0; }
    .layout-card .check-icon { position: absolute; top: -8px; right: -8px; font-size: 24px; color: #005c4b; background: white; border-radius: 50%; display: none; }
    .layout-card.active .check-icon { display: block; }

    .numpad-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .numpad-card { position: relative; background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 16px; cursor: pointer; text-align: center; transition: 0.2s; }
    .numpad-card.active { border-color: #005c4b; background: #f0f7f5; }
    .n-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; width: 60px; margin: 0 auto 12px auto; background: #f1f5f9; padding: 6px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .n-grid span { background: white; border-radius: 3px; font-size: 8px; font-weight: 800; padding: 4px 0; color: #475569; border: 1px solid #cbd5e1; }
    .numpad-card h4 { font-size: 12px; font-weight: 800; color: #1e293b; margin: 0 0 4px 0; }
    .numpad-card .check-icon { position: absolute; top: -8px; right: -8px; font-size: 24px; color: #005c4b; background: white; border-radius: 50%; display: none; }
    .numpad-card.active .check-icon { display: block; }
  `]
})
export class SetelanComponent implements OnInit {
  appSettings: AppSettings = {
    showCorrect: true,
    showWrong: true,
    showTimer: true,
    showNextQuestion: true,
    vibrateFeedback: true,
    displayType: 'vertical',
    numpadLayout: 'standard',
    darkMode: false
  };

  constructor() {
    addIcons({
      flask, settingsOutline, buildOutline, flashOutline, phonePortraitOutline, keyOutline, checkmarkCircle
    });
  }

  ngOnInit() {
    try {
      const s = localStorage.getItem('kraepelin_settings');
      if (s) {
        this.appSettings = { ...this.appSettings, ...JSON.parse(s) };
      }
    } catch {}
    this.applyDarkMode();
  }

  setLayout(type: 'horizontal' | 'vertical') {
    this.appSettings.displayType = type;
    this.saveSettings();
  }

  setNumpad(type: 'standard' | 'reverse') {
    this.appSettings.numpadLayout = type;
    this.saveSettings();
  }

  toggleScore() {
    this.appSettings.showWrong = this.appSettings.showCorrect;
    this.saveSettings();
  }

  toggleDarkMode() {
    this.saveSettings();
    this.applyDarkMode();
  }

  applyDarkMode() {
    if (this.appSettings.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  saveSettings() {
    localStorage.setItem('kraepelin_settings', JSON.stringify(this.appSettings));
  }
}
