import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  flask, person, checkmarkCircleOutline, scanOutline, pulse, stopCircleOutline,
  add, remove, close, checkmarkCircle, bulb, arrowForward, timerOutline
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beranda',
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
              <h1 class="page-title">Mulai Tes</h1>
            </div>
          </div>
        </div>

        <div class="greeting-section">
          <div class="greeting-header">
            <div class="greeting-left">
              <h2 (click)="promptName(true)">Halo, {{ userName || 'TAMU' | uppercase }}</h2>
              <div class="streak-badge"><span class="fire-icon">🔥</span> {{ streak }} Hari Rutin</div>
            </div>
          </div>
        </div>

        <div class="section-container">
          <div class="section-header-row">
            <h4>MODE HITUNGAN</h4>
          </div>
          <div class="mode-grid">
            <div class="mode-card" [class.active]="mode === 'add'" (click)="mode = 'add'">
              <div class="mode-card-header">
                <div class="mode-icon-box" [class.light-box]="mode !== 'add'"><ion-icon name="add"></ion-icon></div>
                <ion-icon name="checkmark-circle" class="check-icon" *ngIf="mode === 'add'"></ion-icon>
              </div>
              <div class="mode-info">
                <h5>Penjumlahan</h5><p>Aritmatika standar</p>
              </div>
            </div>
            <div class="mode-card" [class.active]="mode === 'subtract'" (click)="mode = 'subtract'">
              <div class="mode-card-header">
                <div class="mode-icon-box" [class.light-box]="mode !== 'subtract'"><span class="math-sym">-</span></div>
                <ion-icon name="checkmark-circle" class="check-icon" *ngIf="mode === 'subtract'"></ion-icon>
              </div>
              <div class="mode-info">
                <h5>Pengurangan</h5><p>Selisih dua angka</p>
              </div>
            </div>
            <div class="mode-card" [class.active]="mode === 'multiply'" (click)="mode = 'multiply'">
              <div class="mode-card-header">
                <div class="mode-icon-box" [class.light-box]="mode !== 'multiply'"><ion-icon name="close"></ion-icon></div>
                <ion-icon name="checkmark-circle" class="check-icon" *ngIf="mode === 'multiply'"></ion-icon>
              </div>
              <div class="mode-info">
                <h5>Perkalian</h5><p>Digit akhir (1-9)</p>
              </div>
            </div>
            <div class="mode-card" [class.active]="mode === 'divide'" (click)="mode = 'divide'">
              <div class="mode-card-header">
                <div class="mode-icon-box" [class.light-box]="mode !== 'divide'"><span class="math-sym">÷</span></div>
                <ion-icon name="checkmark-circle" class="check-icon" *ngIf="mode === 'divide'"></ion-icon>
              </div>
              <div class="mode-info">
                <h5>Pembagian</h5><p>Hasil bagi angka</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section-container">
          <div class="section-header-row">
            <h4>DURASI WAKTU</h4>
          </div>
          <div class="duration-pills">
            <div class="d-pill" [class.active]="time === 60" (click)="time = 60">
              <strong>1 Menit</strong><span>Singkat</span>
            </div>
            <div class="d-pill" [class.active]="time === 120" (click)="time = 120">
              <strong>2 Menit</strong><span>Sedang</span>
            </div>
            <div class="d-pill" [class.active]="time === 300" (click)="time = 300">
              <strong>5 Menit</strong><span>Lama</span>
            </div>
          </div>
          <div class="duration-adjuster">
            <button class="adj-btn" (click)="decreaseTime()"><ion-icon name="remove"></ion-icon></button>
            <div class="adj-center">
              <div class="time-input-container">
                <input type="number" class="time-input-large" [(ngModel)]="time" min="1" />
                <span class="time-unit-label">DETIK</span>
              </div>
              <span class="time-sub-label">Waktu pengerjaan tes</span>
            </div>
            <button class="adj-btn" (click)="increaseTime()"><ion-icon name="add"></ion-icon></button>
          </div>
        </div>

        <div class="pro-tip-box">
          <div class="bulb-wrapper"><ion-icon name="bulb"></ion-icon></div>
          <div class="pro-tip-content">
            <strong>Catatan Penting:</strong>
            <p>Hanya ketik angka terakhir (satuan) dari hasil hitungan. Contoh: <strong>7 + 8 = 15</strong>, maka cukup ketik <strong>5</strong>.</p>
          </div>
        </div>

        <div class="action-section">
          <button class="btn-start" (click)="startTest()">
            Mulai Tes Sekarang <ion-icon name="arrow-forward"></ion-icon>
          </button>
          <div class="bottom-info">
            <ion-icon name="timer-outline"></ion-icon><span>Total waktu {{time}} detik</span>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    :host { display: block; height: 100%; position: relative; }
    ion-content { --background: #fafbfc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .page-background { padding: 20px; padding-bottom: 20px; padding-top: max(40px, env(safe-area-inset-top)); display: flex; flex-direction: column; min-height: 100%; justify-content: space-between; }

    /* Common Header */
    .top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .header-left { display: flex; align-items: center; gap: 12px; }
    .logo-box { width: 40px; height: 40px; background: #005c4b; border-radius: 12px; display: flex; justify-content: center; align-items: center; color: white; font-size: 20px; }
    .header-titles { display: flex; flex-direction: column; }
    .lab-title { font-size: 10px; font-weight: 700; color: #6b7280; letter-spacing: 1px; }
    .page-title { font-size: 20px; font-weight: 800; color: #111; margin: 0; line-height: 1.2; }

    /* Common Utils */
    .section-container { margin-bottom: 20px; }
    .section-header-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 12px; }
    .section-header-row h4 { font-size: 12px; font-weight: 700; color: #6b7280; letter-spacing: 0.5px; margin: 0; }
    .math-sym { font-weight: 600; font-size: 20px; line-height: 1; margin-top: -2px; }

    /* TAB 1: MULAI TES */
    .greeting-section { margin-bottom: 20px; }
    .greeting-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .greeting-left h2 { font-size: 22px; font-weight: 800; color: #111; margin: 0 0 8px 0; display: inline-block; cursor: pointer; }
    .streak-badge { display: inline-flex; align-items: center; background: #ffece2; color: #d3511f; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-left: 8px; vertical-align: middle; margin-top: -4px; }
    .fire-icon { margin-right: 4px; font-size: 14px; }

    .mode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .mode-card { background: #ffffff; border-radius: 16px; padding: 16px; border: 1px solid #f3f4f6; cursor: pointer; transition: all 0.2s; }
    .mode-card.active { background: #e9f2f0; border-color: #e9f2f0; }
    .mode-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .mode-icon-box { width: 36px; height: 36px; background: #005c4b; border-radius: 10px; display: flex; justify-content: center; align-items: center; color: white; font-size: 20px; }
    .mode-icon-box.light-box { background: #eef2fa; color: #4b5563; }
    .check-icon { color: #005c4b; font-size: 20px; }
    .mode-info h5 { font-size: 14px; font-weight: 800; color: #111; margin: 0 0 4px 0; }
    .mode-info p { font-size: 11px; color: #6b7280; margin: 0; line-height: 1.4; }

    .duration-pills { display: flex; gap: 12px; margin-bottom: 16px; }
    .d-pill { flex: 1; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 12px 0; display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; transition: all 0.2s; }
    .d-pill.active { background: #005c4b; border-color: #005c4b; color: white; }
    .d-pill strong { font-size: 14px; font-weight: 800; color: #111; }
    .d-pill.active strong { color: white; }
    .d-pill span { font-size: 11px; color: #6b7280; font-weight: 500; }
    .d-pill.active span { color: rgba(255,255,255,0.8); }

    .duration-adjuster { display: flex; align-items: center; justify-content: space-between; background: #ffffff; border-radius: 20px; padding: 12px 16px; border: 1px solid #f3f4f6; }
    .adj-btn { width: 44px; height: 44px; border-radius: 12px; background: #eef2fa; border: none; display: flex; justify-content: center; align-items: center; font-size: 20px; color: #111; cursor: pointer; }
    .adj-btn:active { background: #e2e8f0; }
    .adj-center { display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .time-input-container { display: flex; align-items: flex-end; gap: 4px; }
    .time-input-large { font-size: 32px; font-weight: 800; color: #005c4b; border: none; background: transparent; width: 60px; text-align: center; outline: none; padding: 0; margin: 0; display: inline-block; }
    .time-input-large::-webkit-outer-spin-button, .time-input-large::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    .time-unit-label { font-size: 12px; font-weight: 800; color: #4b5563; margin-bottom: 4px; }
    .time-sub-label { font-size: 11px; color: #6b7280; margin-top: 4px; text-align: center; }

    .pro-tip-box { display: flex; gap: 12px; background: #f0f7f5; border-radius: 16px; padding: 16px; margin-bottom: 16px; border: 1px solid #e1efe9; }
    .bulb-wrapper { color: #005c4b; font-size: 24px; flex-shrink: 0; }
    .pro-tip-content { font-size: 12px; color: #111; line-height: 1.5; }
    .pro-tip-content strong { color: #005c4b; font-weight: 700; display: block; margin-bottom: 4px; }
    .pro-tip-content p { margin: 0; color: #4b5563; }

    .action-section { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-top: auto; }
    .btn-start { width: 100%; background: #005c4b; color: white; border: none; border-radius: 16px; padding: 18px; font-size: 16px; font-weight: 700; display: flex; justify-content: center; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(0, 92, 75, 0.2); }
    .btn-start:active { transform: scale(0.98); }
    .btn-start ion-icon { font-size: 20px; }
    .bottom-info { display: flex; align-items: center; gap: 6px; color: #6b7280; font-size: 12px; font-weight: 500; }
    .bottom-info ion-icon { font-size: 16px; }

  `]
})
export class BerandaComponent implements OnInit {
  time = 60;
  mode = 'add';
  userName: string = '';
  streak = 1;

  constructor(private router: Router, private alertController: AlertController) {
    addIcons({
      flask, person, checkmarkCircleOutline, scanOutline, pulse, stopCircleOutline,
      add, remove, close, checkmarkCircle, bulb, arrowForward, timerOutline
    });
  }

  ngOnInit() {
    this.userName = localStorage.getItem('kraepelin_username') || '';
    this.checkStreak();
  }

  checkStreak() {
    const lastActive = localStorage.getItem('kraepelin_last_active');
    const today = new Date().toDateString();
    
    let currentStreak = parseInt(localStorage.getItem('kraepelin_streak') || '0', 10);
    
    if (lastActive) {
      if (lastActive === today) {
        // Already active today
      } else {
        const lastDate = new Date(lastActive);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate.toDateString() === yesterday.toDateString()) {
          // Active yesterday, increment streak
          currentStreak++;
        } else {
          // Missed a day, reset
          currentStreak = 1;
        }
        localStorage.setItem('kraepelin_last_active', today);
        localStorage.setItem('kraepelin_streak', currentStreak.toString());
      }
    } else {
      currentStreak = 1;
      localStorage.setItem('kraepelin_last_active', today);
      localStorage.setItem('kraepelin_streak', currentStreak.toString());
    }
    
    this.streak = currentStreak;
  }

  async promptName(isEdit: boolean) {
    const alert = await this.alertController.create({
      header: isEdit ? 'Ubah Nama' : 'Selamat Datang!',
      subHeader: isEdit ? '' : 'Siapa namamu?',
      backdropDismiss: isEdit,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Masukkan nama...',
          value: this.userName,
          attributes: { maxlength: 12 },
        }
      ],
      buttons: [
        ...(isEdit ? [{ text: 'Batal', role: 'cancel', cssClass: 'secondary' }] : []),
        {
          text: 'Simpan',
          handler: (data) => {
            if (data.name && data.name.trim() !== '') {
              this.userName = data.name.trim();
              localStorage.setItem('kraepelin_username', this.userName);
            } else if (!isEdit) {
              return false;
            }
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  increaseTime() { if (this.time < 3600) this.time += 10; }
  decreaseTime() { if (this.time > 10) this.time -= 10; }

  startTest() {
    try {
      const s = JSON.parse(localStorage.getItem('kraepelin_settings') || '{}');
      s.duration = this.time;
      localStorage.setItem('kraepelin_settings', JSON.stringify(s));
    } catch {}

    this.router.navigate(['/test-session'], {
      state: { mode: this.mode, duration: this.time }
    });
  }
}
