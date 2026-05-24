import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  addOutline, removeOutline, closeOutline, documentTextOutline,
  personCircleOutline, add, remove, close, rocket, checkmarkCircle,
  timerOutline, appsOutline, alertCircleOutline
} from 'ionicons/icons';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beranda',
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
        <label class="subtitle">KONFIGURASI TES</label>
        <h1 class="page-title">Pilihan Mode</h1>
        <p class="description">
          Pilih jenis operasi yang ingin dilatih dan atur durasi sesuai kebutuhanmu. Kalau sudah siap, langsung mulai saja.
        </p>

        <!-- Operasi Matematika -->
        <div class="section-card">
          <div class="section-card-header">
            <ion-icon name="apps-outline" color="primary"></ion-icon>
            <h2>Operasi Matematika</h2>
          </div>
          <div class="operations-grid">
            <div class="op-button" [class.selected]="mode === 'add'" (click)="mode = 'add'">
              <div class="op-icon-container">
                <ion-icon name="add" class="op-icon"></ion-icon>
                <ion-icon name="checkmark-circle" class="check-icon"></ion-icon>
              </div>
              <h3>Penjumlahan</h3>
            </div>

            <div class="op-button" [class.selected]="mode === 'subtract'" (click)="mode = 'subtract'">
              <div class="op-icon-container">
                <ion-icon name="remove" class="op-icon"></ion-icon>
                <ion-icon name="checkmark-circle" class="check-icon"></ion-icon>
              </div>
              <h3>Pengurangan</h3>
            </div>

            <div class="op-button" [class.selected]="mode === 'multiply'" (click)="mode = 'multiply'">
              <div class="op-icon-container">
                <ion-icon name="close" class="op-icon"></ion-icon>
                <ion-icon name="checkmark-circle" class="check-icon"></ion-icon>
              </div>
              <h3>Perkalian</h3>
            </div>

            <div class="op-button" [class.selected]="mode === 'divide'" (click)="mode = 'divide'">
              <div class="op-icon-container">
                <span class="percent-icon">÷</span>
                <ion-icon name="checkmark-circle" class="check-icon"></ion-icon>
              </div>
              <h3>Pembagian</h3>
            </div>
          </div>
        </div>

        <!-- Durasi Tes -->
        <div class="section-card mt-24">
          <div class="section-card-header">
            <ion-icon name="timer-outline" color="primary"></ion-icon>
            <h2>Durasi Tes (Detik)</h2>
          </div>

          <div class="duration-selector">
            <div class="duration-controls">
              <button class="circle-btn" (click)="decreaseTime()">
                <ion-icon name="remove"></ion-icon>
              </button>
              <div class="duration-display">
                <input type="number" class="time-input" [(ngModel)]="time" min="1" />
                <span class="unit">DETIK</span>
              </div>
              <button class="circle-btn" (click)="increaseTime()">
                <ion-icon name="add"></ion-icon>
              </button>
            </div>
            <div class="duration-presets">
              <button [class.active]="time === 20" (click)="time = 20">20s</button>
              <button [class.active]="time === 30" (click)="time = 30">30s</button>
              <button [class.active]="time === 60" (click)="time = 60">60s</button>
              <button [class.active]="time === 120" (click)="time = 120">2m</button>
              <button [class.active]="time === 300" (click)="time = 300">5m</button>
            </div>
          </div>
        </div>

        <!-- Persiapan -->
        <div class="preparation-card mt-24">
          <div class="prep-content">
            <div class="prep-icon-wrapper">
              <ion-icon name="alert-circle-outline" color="primary"></ion-icon>
            </div>
            <div class="prep-text">
              <h3>Sebelum Mulai</h3>
              <p>Cari tempat yang tenang dan pastikan tidak ada gangguan. Tes ini butuh fokus penuh dari awal sampai selesai.</p>
            </div>
          </div>

          <button class="primary-btn" (click)="startTest()">
            Mulai Tes
            <ion-icon name="rocket"></ion-icon>
          </button>
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
    .user-profile { font-size: 28px; color: #333; margin-right: 16px; }

    .content-wrapper { padding: 16px 20px; padding-bottom: 40px; }

    .subtitle { font-size: 12px; font-weight: 700; color: #0d5dd7; letter-spacing: 1px; }
    .page-title { font-size: 28px; font-weight: 800; color: #111; line-height: 1.2; margin: 8px 0 12px; }
    .description { font-size: 14px; color: #555; line-height: 1.5; margin-bottom: 24px; }

    .section-card {
      background: white; border-radius: 16px; padding: 20px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.03);
    }
    .mt-24 { margin-top: 24px; }

    .section-card-header {
      display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
      ion-icon { font-size: 18px; }
      h2 { font-size: 16px; font-weight: 700; color: #111; margin: 0; }
    }

    .operations-grid { display: flex; flex-direction: column; gap: 10px; }

    .op-button {
      background: #f3f5f7; border-radius: 12px; padding: 14px 16px;
      position: relative; cursor: pointer; transition: background 0.2s;

      .op-icon-container {
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;
      }
      .op-icon { font-size: 22px; color: #333; }
      .percent-icon { font-size: 22px; color: #333; font-weight: 600; }
      .check-icon { display: none; }

      h3 { font-size: 15px; font-weight: 700; margin: 0; color: #111; }

      &.selected {
        background: #065cc9;
        .op-icon, h3, .percent-icon { color: white; }
        .check-icon { display: block; color: white; font-size: 20px; }
      }
    }

    .duration-selector {
      background: #f8f9fa; border-radius: 12px; padding: 20px;

      .duration-controls {
        display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;

        .circle-btn {
          width: 44px; height: 44px; border-radius: 50%; border: none;
          background: #e8ebee; color: #555; display: flex; align-items: center;
          justify-content: center; font-size: 22px; cursor: pointer;
          &:active { background: #d0d5db; }
        }

        .duration-display {
          display: flex; flex-direction: column; align-items: center;
          .time-input { 
            font-size: 36px; font-weight: 800; color: #065cc9; line-height: 1;
            border: none; background: transparent; width: 100px; text-align: center;
            outline: none; padding: 0; margin: 0;
            &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
              -webkit-appearance: none; margin: 0;
            }
          }
          .unit { font-size: 10px; font-weight: 700; letter-spacing: 1px; color: #111; margin-top: 4px; }
        }
      }

      .duration-presets {
        display: flex; justify-content: space-between; gap: 8px;
        button {
          flex: 1; background: #e8ebee; border: none; padding: 8px 0;
          border-radius: 20px; font-size: 12px; font-weight: 600; color: #555; cursor: pointer;
          &.active { background: #065cc9; color: white; }
        }
      }
    }

    .preparation-card {
      background: white; border-radius: 16px; padding: 0;
      overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.03);

      .prep-content { padding: 20px; display: flex; gap: 16px; }

      .prep-icon-wrapper {
        width: 40px; height: 40px; background: #ebf4ff; border-radius: 10px;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        ion-icon { font-size: 20px; color: #065cc9; }
      }

      .prep-text {
        h3 { font-size: 14px; font-weight: 700; margin: 0 0 6px 0; color: #111; }
        p { font-size: 12px; color: #666; margin: 0; line-height: 1.5; }
      }

      .primary-btn {
        width: 100%; background: #065cc9; color: white; border: none;
        padding: 18px; font-size: 15px; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        gap: 8px; border-radius: 0; cursor: pointer;
        ion-icon { font-size: 18px; }
        &:active { background: #0551b5; }
      }
    }
  `]
})
export class BerandaComponent {
  time = 60;
  mode = 'add';

  constructor(private router: Router) {
    addIcons({
      addOutline, removeOutline, closeOutline, documentTextOutline,
      personCircleOutline, add, remove, close, rocket, checkmarkCircle,
      timerOutline, appsOutline, alertCircleOutline
    });
  }

  increaseTime() { if (this.time < 3600) this.time += 10; }
  decreaseTime() { if (this.time > 10) this.time -= 10; }

  startTest() {
    this.router.navigate(['/test-session'], {
      state: { mode: this.mode, duration: this.time }
    });
  }
}
