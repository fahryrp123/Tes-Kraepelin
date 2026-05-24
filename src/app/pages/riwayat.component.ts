import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { addOutline, closeOutline, documentTextOutline, star, trendingUp, removeOutline, calendarOutline, chevronForward } from 'ionicons/icons';

interface TestResult {
  id: string;
  mode: string;
  correct: number;
  wrong: number;
  duration: number;
  score: number;
  timestamp: string;
  chunks?: { correct: number; wrong: number }[];
}

import { Router } from '@angular/router';

@Component({
  selector: 'app-riwayat',
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
          <label class="subtitle">ARSIP TES</label>
          <h1>Riwayat Tes</h1>
          <p>Semua hasil tes kamu tersimpan di sini.</p>
        </div>

        <!-- Filter chips (Waktu) -->
        <div class="filters-row mt-16">
          <button class="filter-btn" [class.active]="filter === 'semua'" (click)="setFilter('semua')">Semua Waktu</button>
          <button class="filter-btn" [class.active]="filter === 'harian'" (click)="setFilter('harian')">Hari Ini</button>
          <button class="filter-btn" [class.active]="filter === 'kemarin'" (click)="setFilter('kemarin')">Kemarin</button>
          <label class="filter-btn calendar-btn" [class.active]="filter === 'custom'" style="position: relative; overflow: hidden; display: flex; align-items: center; gap: 4px;">
            <ion-icon name="calendar-outline"></ion-icon>
            <span>{{ filter === 'custom' && customDate ? formatShortDate(customDate) : 'Pilih Tanggal' }}</span>
            <input type="date" [ngModel]="customDate" (ngModelChange)="onNativeDateChange($event)" style="opacity: 0; position: absolute; left: 0; top: 0; width: 100%; height: 100%; cursor: pointer;" />
          </label>
        </div>

        <!-- Filter Mode -->
        <div class="mode-tabs mt-16">
          <button class="mode-tab" [class.active]="modeFilter === 'all'" (click)="modeFilter = 'all'">Semua Mode</button>
          <button class="mode-tab" [class.active]="modeFilter === 'add'" (click)="modeFilter = 'add'">Penjumlahan</button>
          <button class="mode-tab" [class.active]="modeFilter === 'subtract'" (click)="modeFilter = 'subtract'">Pengurangan</button>
          <button class="mode-tab" [class.active]="modeFilter === 'multiply'" (click)="modeFilter = 'multiply'">Perkalian</button>
          <button class="mode-tab" [class.active]="modeFilter === 'divide'" (click)="modeFilter = 'divide'">Pembagian</button>
        </div>

        <!-- Empty state -->
        <div class="empty-state mt-20" *ngIf="filteredTests.length === 0">
          <div class="empty-icon">📋</div>
          <h3>Belum ada riwayat</h3>
          <p>Hasil tes akan muncul di sini setelah kamu menyelesaikan tes.</p>
        </div>

        <!-- List riwayat -->
        <div class="history-list mt-20" *ngIf="filteredTests.length > 0">
          <div class="history-card clickable" *ngFor="let test of filteredTests" (click)="goToDetail(test)">
            <!-- Header -->
            <div class="card-header-row">
              <div class="header-left">
                <div class="icon-box" [class]="test.mode">
                  <span class="mode-sym">{{ getModeSymbol(test.mode) }}</span>
                </div>
                <div class="test-info">
                  <h3>{{ getModeLabel(test.mode) }}</h3>
                  <p>{{ formatFullDate(test.timestamp) }}</p>
                </div>
              </div>
              <ion-icon name="chevron-forward" class="arrow-icon"></ion-icon>
            </div>

            <!-- Stats -->
            <div class="card-stats-row">
              <div class="stat-col score-col">
                <span class="label">SKOR</span>
                <span class="value text-blue">{{ test.score }}</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-col">
                <span class="label">BENAR</span>
                <span class="value text-green">{{ test.correct }}</span>
              </div>
              <div class="stat-col">
                <span class="label">SALAH</span>
                <span class="value text-red">{{ test.wrong }}</span>
              </div>
              <div class="stat-col">
                <span class="label">WAKTU</span>
                <span class="value">{{ formatDuration(test.duration) }}</span>
              </div>
            </div>
          </div>
        </div>



        <!-- Ringkasan -->
        <div class="summary-card mt-20" *ngIf="allTests.length > 0">
          <h3>Ringkasan Keseluruhan</h3>
          <div class="summary-grid">
            <div class="summary-item">
              <span class="label">TOTAL TES</span>
              <div class="value">{{ allTests.length }}</div>
            </div>
            <div class="summary-item">
              <span class="label">TOTAL BENAR</span>
              <div class="value text-blue">{{ totalCorrect }}</div>
            </div>
            <div class="summary-item">
              <span class="label">SKOR TERTINGGI</span>
              <div class="value text-blue">{{ highestScore }}</div>
            </div>
            <div class="summary-item">
              <span class="label">RATA-RATA SKOR</span>
              <div class="value">{{ avgScore }}</div>
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
    .content-wrapper { padding: 16px 20px 40px; }
    .subtitle { font-size: 10px; font-weight: 700; color: #0d5dd7; letter-spacing: 1px; }
    .header-section {
      h1 { font-size: 26px; font-weight: 800; color: #111; margin: 4px 0 8px 0; }
      p { font-size: 13px; color: #555; line-height: 1.5; margin: 0; }
    }

    .filters-row {
      display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar { display: none; }
    }
    .filter-btn {
      background: #e8ebee; color: #555; border: none; padding: 8px 14px;
      border-radius: 20px; font-size: 12px; font-weight: 600; white-space: nowrap;
      cursor: pointer; display: flex; align-items: center; gap: 5px; flex-shrink: 0;
      ion-icon { font-size: 13px; }
      &.active { background: #0d5dd7; color: white; }
    }

    .date-picker-row { padding: 4px 0; }
    .date-selects {
      display: flex; gap: 8px;
    }
    .date-select {
      flex: 1; padding: 10px 8px; border: 1.5px solid #e0e0e0;
      border-radius: 10px; font-size: 13px; font-weight: 600; color: #111;
      background: white; appearance: none; -webkit-appearance: none;
      text-align: center; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
      &:focus { outline: none; border-color: #0d5dd7; }
    }

    .mode-tabs {
      display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar { display: none; }
    }
    .mode-tab {
      background: white; border: 1px solid #e5e7eb; padding: 10px 16px; border-radius: 12px;
      font-size: 12px; font-weight: 700; color: #555; white-space: nowrap; transition: 0.2s;
      &.active { background: #0d5dd7; color: white; border-color: #0d5dd7; }
    }

    .empty-state {
      text-align: center; padding: 48px 24px;
      .empty-icon { font-size: 48px; margin-bottom: 16px; }
      h3 { font-size: 16px; font-weight: 700; color: #333; margin: 0 0 8px 0; }
      p { font-size: 13px; color: #888; margin: 0; line-height: 1.5; }
    }

    .history-list { display: flex; flex-direction: column; gap: 16px; }
    .history-card {
      background: white; border-radius: 20px; padding: 20px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.03); border: 1px solid #f0f0f4;
      display: flex; flex-direction: column; gap: 16px;
      &.clickable { cursor: pointer; transition: all 0.2s; }
      &.clickable:active { transform: scale(0.98); box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
    }

    .card-header-row {
      display: flex; justify-content: space-between; align-items: center;
      .header-left { display: flex; align-items: center; gap: 12px; }
      .icon-box {
        width: 40px; height: 40px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        &.add { background: #eaf2ff; color: #0d5dd7; }
        &.subtract { background: #e8ebee; color: #334155; }
        &.multiply { background: #eef4ff; color: #0d5dd7; }
        &.divide { background: #fef3c7; color: #92400e; }
      }
      .mode-sym { font-size: 22px; font-weight: 800; line-height: 1; }
      .test-info {
        h3 { font-size: 14px; font-weight: 800; color: #111; margin: 0 0 2px 0; }
        p { font-size: 10px; font-weight: 600; color: #888; margin: 0; }
      }
      .arrow-icon { font-size: 20px; color: #ccc; }
    }

    .card-stats-row {
      display: flex; align-items: center; justify-content: space-between;
      background: #f8f9fa; border-radius: 12px; padding: 12px 16px;
    }
    .stat-col {
      display: flex; flex-direction: column; align-items: flex-start;
      .label { font-size: 9px; font-weight: 800; color: #888; letter-spacing: 0.5px; margin-bottom: 4px; }
      .value { font-size: 14px; font-weight: 800; color: #333; }
      .text-blue { color: #0d5dd7; font-size: 20px; }
      .text-green { color: #10b981; }
      .text-red { color: #ef4444; }
    }
    .score-col { min-width: 60px; }
    .stat-divider { width: 1px; height: 28px; background: #e5e7eb; margin: 0 12px; }



    .summary-card {
      background: #f8f9fa; border-radius: 16px; padding: 20px; border: 1px solid #eee;
      h3 { font-size: 14px; font-weight: 700; color: #111; margin: 0 0 16px 0; }
    }
    .summary-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px;
      .summary-item {
        display: flex; flex-direction: column;
        .label { font-size: 9px; font-weight: 700; color: #888; margin-bottom: 4px; }
        .value { font-size: 20px; font-weight: 800; color: #111; &.text-blue { color: #0d5dd7; } }
      }
    }

    .mt-12 { margin-top: 12px; }
    .mt-16 { margin-top: 16px; }
    .mt-20 { margin-top: 20px; }
  `]
})
export class RiwayatComponent {
  filter = 'semua';
  modeFilter = 'all';
  allTests: TestResult[] = [];
  customDate = '';

  constructor(private router: Router) {
    addIcons({ addOutline, closeOutline, documentTextOutline, star, trendingUp, removeOutline, calendarOutline, chevronForward });
  }

  ionViewWillEnter() {
    this.allTests = JSON.parse(localStorage.getItem('kraepelin_tests') || '[]');
  }

  setFilter(f: string) {
    this.filter = f;
    if (f !== 'custom') {
      this.customDate = '';
    }
  }

  // Handler untuk Native Date Input
  onNativeDateChange(val: string) {
    if (val) {
      this.customDate = val;
      this.setFilter('custom');
    }
  }

  get filteredTests(): TestResult[] {
    const now = new Date();
    let list = this.allTests;

    if (this.modeFilter !== 'all') {
      list = list.filter(t => t.mode === this.modeFilter);
    }

    switch (this.filter) {
      case 'harian':
        return list.filter(t => new Date(t.timestamp).toDateString() === now.toDateString());
      case 'kemarin': {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return list.filter(t => new Date(t.timestamp).toDateString() === yesterday.toDateString());
      }
      case 'mingguan': {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return list.filter(t => new Date(t.timestamp) >= weekAgo);
      }
      case 'custom': {
        if (!this.customDate) return list;
        return list.filter(t => {
          const d = new Date(t.timestamp);
          const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          return dStr === this.customDate;
        });
      }
      default: return list;
    }
  }

  get totalCorrect() { return this.allTests.reduce((s, t) => s + t.correct, 0); }
  get highestScore() { return this.allTests.length ? Math.max(...this.allTests.map(t => t.score)) : 0; }
  get avgScore() {
    if (!this.allTests.length) return 0;
    return Math.round(this.allTests.reduce((s, t) => s + t.score, 0) / this.allTests.length);
  }

  getModeLabel(mode: string) {
    return ({ add: 'Penjumlahan', subtract: 'Pengurangan', multiply: 'Perkalian', divide: 'Pembagian' } as any)[mode] || mode;
  }
  getModeSymbol(mode: string) {
    return ({ add: '+', subtract: '−', multiply: '×', divide: '÷' } as any)[mode] || '+';
  }

  formatFullDate(ts: string): string {
    const d = new Date(ts);
    const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${dateStr} ${timeStr}`;
  }

  formatShortDate(dateStr: string): string {
    if (!dateStr) return 'Pilih Tanggal';
    const [y, m, d] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
  }

  formatDuration(sec: number): string {
    const m = Math.floor(sec / 60), s = sec % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `0:${s.toString().padStart(2, '0')}`;
  }

  goToDetail(test: TestResult) {
    if (!test.chunks) {
      test.chunks = Array.from({ length: 10 }, () => ({
        correct: Math.floor(test.correct / 10),
        wrong: Math.floor(test.wrong / 10)
      }));
    }
    this.router.navigate(['/hasil-tes'], { state: { result: test, isHistory: true } });
  }
}
