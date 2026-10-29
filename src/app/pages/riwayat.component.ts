import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  flask, analyticsOutline, calendarOutline, informationCircleOutline, documentTextOutline, checkmark, checkmarkDoneOutline, warningOutline, trophyOutline, flashOutline, speedometerOutline, trendingDownOutline, searchOutline, bulbOutline, timeOutline, add, layersOutline, downloadOutline, playOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-riwayat',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-content>
      <div class="page-background">

        <div class="top-header">
          <div class="header-left">
            <div class="logo-box"><ion-icon name="flask"></ion-icon></div>
            <div class="header-titles">
              <span class="lab-title">KRAEPELIN LAB</span>
              <h1 class="page-title">Analisis</h1>
            </div>
          </div>
        </div>

        <div class="analysis-banner">
          <div class="banner-badge"><ion-icon name="analytics-outline"></ion-icon> REKAM JEJAK</div>
          <div class="banner-title-row">
            <h2>Riwayat Latihan</h2>
          </div>
          <p>Lihat perkembangan skor, akurasi, dan kecepatan Anda setiap saat.</p>
        </div>

        <div class="filters-section">
          <div class="filter-header">
            <span class="f-label">FILTER WAKTU</span>
            <span class="f-count">{{ filteredHistory.length }} Sesi Tercatat</span>
          </div>
          <div class="chips-row">
            <div class="chip" [class.active]="filterTime === 'all'" (click)="setFilterTime('all')">Semua</div>
            <div class="chip" [class.active]="filterTime === 'today'" (click)="setFilterTime('today')">Hari Ini</div>
            <div class="chip" [class.active]="filterTime === 'week'" (click)="setFilterTime('week')">Minggu Ini</div>
          </div>
          <div class="filter-row-inline mt-3">
            <span class="f-inline-label">Mode:</span>
            <div class="chip" [class.active]="filterMode === 'all'" (click)="setFilterMode('all')">Semua</div>
            <div class="chip" [class.active]="filterMode === 'add'" (click)="setFilterMode('add')">Penjumlahan</div>
            <div class="chip" [class.active]="filterMode === 'subtract'" (click)="setFilterMode('subtract')">Pengurangan</div>
            <div class="chip" [class.active]="filterMode === 'multiply'" (click)="setFilterMode('multiply')">Perkalian</div>
            <div class="chip" [class.active]="filterMode === 'divide'" (click)="setFilterMode('divide')">Pembagian</div>
          </div>
        </div>

        <div class="section-container">
          <div class="section-title-row">
            <h3>Ringkasan Metrik</h3>
          </div>
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="m-head">TOTAL TES <ion-icon name="document-text-outline"></ion-icon></div>
              <div class="m-val">{{ totalTests }} <span>Sesi</span></div>
            </div>
            <div class="metric-card">
              <div class="m-head">TOTAL BENAR <ion-icon name="checkmark-done-outline"></ion-icon></div>
              <div class="m-val">{{ totalCorrect }} <span>Butir</span></div>
            </div>
            <div class="metric-card">
              <div class="m-head">SKOR TERTINGGI <ion-icon name="trophy-outline"></ion-icon></div>
              <div class="m-val">{{ highestScore }} <span>Poin</span></div>
            </div>
            <div class="metric-card">
              <div class="m-head">KECEPATAN <ion-icon name="speedometer-outline"></ion-icon></div>
              <div class="m-val">{{ avgSpeed }} <span>/ detik</span></div>
            </div>
          </div>
        </div>

        <div class="section-container chart-section" *ngIf="filteredHistory.length > 0">
          <div class="chart-header-row">
            <div class="chart-titles">
              <span class="c-subtitle">TREN SKOR ANDA</span>
              <h3>Grafik Performa Latihan</h3>
            </div>
          </div>
          <div class="fake-chart-area">
            <div class="chart-graph">
               <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:rgba(0,92,75,0.2);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:1" />
                  </linearGradient>
                  <!-- Ini hanya visualisasi sederhana -->
                  <path d="M 0 50 Q 50 10, 100 60 T 200 40 T 300 30 L 300 100 L 0 100 Z" fill="url(#grad1)"/>
                  <path d="M 0 50 Q 50 10, 100 60 T 200 40 T 300 30" stroke="#005c4b" stroke-width="3" fill="none"/>
               </svg>
            </div>
          </div>

          <div class="chart-insight-box">
            <h4><ion-icon name="search-outline"></ion-icon> Analisis Singkat</h4>
            <p>Terus pertahankan konsistensi Anda. Jangan terlalu terburu-buru di awal agar tidak mudah lelah. Kunci utamanya adalah ritme pengerjaan yang stabil.</p>
          </div>
        </div>

        <div class="section-container log-section">
          <div class="section-title-row">
            <h3>Riwayat Tersimpan</h3>
          </div>
          
          <div *ngIf="filteredHistory.length === 0" class="empty-state">
             Belum ada data latihan. Yuk, mulai tes pertama Anda!
          </div>

          <div class="log-card" *ngFor="let item of filteredHistory" (click)="openResult(item)">
            <div class="log-header">
              <div class="log-icon-box" [ngClass]="item.mode"><ion-icon [name]="getModeIcon(item.mode)"></ion-icon></div>
              <div class="log-titles">
                <h4>{{ getModeName(item.mode) }}</h4>
                <span class="log-date">{{ formatDate(item.timestamp) }}</span>
              </div>
              <div class="log-score">
                <span class="score-label">SKOR</span>
                <span class="score-val">{{ item.score }}</span>
              </div>
            </div>
            <div class="log-stats">
              <div class="ls-box blue"><span>Benar</span><strong>{{ item.correct }}</strong></div>
              <div class="ls-box red"><span>Salah</span><strong>{{ item.wrong }}</strong></div>
              <div class="ls-box grey"><span>Waktu</span><strong>{{ item.duration }}s</strong></div>
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

    .section-container { margin-bottom: 24px; }
    .section-title-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; }
    .section-title-row h3 { font-size: 15px; font-weight: 800; color: #005c4b; margin: 0; display: flex; align-items: center; gap: 6px; }
    
    .empty-state { padding: 20px; text-align: center; color: #6b7280; font-size: 13px; background: white; border-radius: 12px; border: 1px dashed #cbd5e1; }

    .mt-3 { margin-top: 12px; }

    .analysis-banner { background: #eef8f5; border-radius: 16px; padding: 16px; margin-bottom: 24px; border: 1px solid #dff0ea; }
    .banner-badge { display: inline-flex; align-items: center; gap: 4px; background: #c6ebd9; color: #005c4b; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 12px; }
    .banner-title-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; }
    .banner-title-row h2 { font-size: 20px; font-weight: 800; color: #111; margin: 0; }
    .analysis-banner p { margin: 0; font-size: 12px; color: #4b5563; line-height: 1.5; }

    .filters-section { margin-bottom: 24px; }
    .filter-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
    .f-label { font-size: 11px; font-weight: 700; color: #4b5563; letter-spacing: 0.5px; }
    .f-count { font-size: 11px; font-weight: 700; color: #005c4b; }
    .chips-row { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 8px; }
    .chips-row::-webkit-scrollbar { display: none; }
    .chip { padding: 6px 14px; border-radius: 20px; background: #ffffff; border: 1px solid #e5e7eb; font-size: 12px; font-weight: 600; color: #4b5563; white-space: nowrap; cursor: pointer; }
    .chip.active { background: #005c4b; color: white; border-color: #005c4b; }
    
    .filter-row-inline { display: flex; gap: 8px; align-items: center; overflow-x: auto; }
    .f-inline-label { font-size: 11px; font-weight: 600; color: #6b7280; }
    .filter-row-inline .chip { padding: 4px 12px; font-size: 11px; background: #f3f4f6; border-color: transparent; }
    .filter-row-inline .chip.active { background: #c6ebd9; color: #005c4b; }

    .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .metric-card { background: white; border-radius: 16px; padding: 12px; border: 1px solid #f3f4f6; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
    .m-head { font-size: 10px; font-weight: 700; color: #6b7280; display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .m-head ion-icon { font-size: 14px; background: #f3f4f6; padding: 4px; border-radius: 6px; }
    .m-val { font-size: 20px; font-weight: 800; color: #111; margin-bottom: 4px; display: flex; align-items: baseline; gap: 4px; }
    .m-val span { font-size: 11px; font-weight: 600; color: #6b7280; }

    .chart-section { background: white; border-radius: 16px; padding: 16px; border: 1px solid #f3f4f6; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
    .chart-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
    .c-subtitle { font-size: 10px; font-weight: 700; color: #005c4b; letter-spacing: 0.5px; margin-bottom: 4px; display: block; }
    .chart-titles h3 { font-size: 16px; font-weight: 800; color: #111; margin: 0; }
    
    .fake-chart-area { position: relative; height: 100px; margin-bottom: 16px; }
    .chart-graph { position: absolute; left: 0; right: 0; top: 0; bottom: 0; }

    .chart-insight-box { background: #f8fafc; border-radius: 12px; padding: 16px; }
    .chart-insight-box h4 { font-size: 12px; font-weight: 800; color: #005c4b; margin: 0 0 8px 0; display: flex; align-items: center; gap: 6px; }
    .chart-insight-box p { font-size: 11px; color: #4b5563; line-height: 1.5; margin: 0; }

    .log-card { background: white; border-radius: 16px; padding: 16px; border: 1px solid #f3f4f6; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.02); cursor: pointer; transition: all 0.2s; }
    .log-card:active { transform: scale(0.98); background: #f8fafc; }
    .log-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .log-icon-box { width: 36px; height: 36px; border-radius: 10px; display: flex; justify-content: center; align-items: center; font-size: 20px; font-weight: 700; background: #e0e7ff; color: #4338ca; }
    .log-icon-box.subtract { background: #ffedd5; color: #c2410c; }
    .log-icon-box.multiply { background: #fce7f3; color: #be185d; }
    .log-icon-box.divide { background: #c8f5e9; color: #005c4b; }
    
    .log-titles { flex: 1; }
    .log-titles h4 { font-size: 14px; font-weight: 800; color: #111; margin: 0 0 4px 0; }
    .log-date { font-size: 11px; color: #6b7280; font-weight: 500; }
    .log-score { text-align: right; }
    .score-label { display: block; font-size: 9px; font-weight: 700; color: #6b7280; letter-spacing: 0.5px; }
    .score-val { font-size: 20px; font-weight: 800; color: #111; }
    
    .log-stats { display: flex; gap: 6px; }
    .ls-box { flex: 1; background: #f8fafc; border-radius: 8px; padding: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
    .ls-box.blue { background: #eff6ff; }
    .ls-box.red { background: #fef2f2; }
    .ls-box.grey { background: #f3f4f6; }
    .ls-box span { font-size: 10px; font-weight: 600; color: #6b7280; }
    .ls-box strong { font-size: 14px; font-weight: 800; color: #111; }
    .ls-box.red strong { color: #ef4444; }
    .ls-box.blue strong { color: #3b82f6; }

  `]
})
export class RiwayatComponent implements OnInit {
  allHistory: any[] = [];
  filteredHistory: any[] = [];
  
  filterTime = 'all';
  filterMode = 'all';

  totalTests = 0;
  totalCorrect = 0;
  highestScore = 0;
  avgSpeed = '0.0';

  constructor(private router: Router) {
    addIcons({
      flask, analyticsOutline, calendarOutline, informationCircleOutline, documentTextOutline, checkmark, checkmarkDoneOutline, warningOutline, trophyOutline, flashOutline, speedometerOutline, trendingDownOutline, searchOutline, bulbOutline, timeOutline, add, layersOutline, downloadOutline, playOutline
    });
  }

  ngOnInit() {
    this.loadHistory();
  }
  
  ionViewWillEnter() {
    this.loadHistory();
  }

  loadHistory() {
    try {
      this.allHistory = JSON.parse(localStorage.getItem('kraepelin_tests') || '[]');
    } catch {
      this.allHistory = [];
    }
    this.applyFilters();
  }

  setFilterTime(val: string) {
    this.filterTime = val;
    this.applyFilters();
  }

  setFilterMode(val: string) {
    this.filterMode = val;
    this.applyFilters();
  }

  applyFilters() {
    let temp = [...this.allHistory];
    
    if (this.filterMode !== 'all') {
      temp = temp.filter(t => t.mode === this.filterMode);
    }
    
    if (this.filterTime === 'today') {
       const today = new Date().toDateString();
       temp = temp.filter(t => new Date(t.timestamp).toDateString() === today);
    } else if (this.filterTime === 'week') {
       const weekAgo = new Date();
       weekAgo.setDate(weekAgo.getDate() - 7);
       temp = temp.filter(t => new Date(t.timestamp) >= weekAgo);
    }
    
    this.filteredHistory = temp;
    this.calculateMetrics();
  }

  calculateMetrics() {
    this.totalTests = this.filteredHistory.length;
    this.totalCorrect = this.filteredHistory.reduce((acc, curr) => acc + curr.correct, 0);
    this.highestScore = this.filteredHistory.reduce((max, curr) => curr.score > max ? curr.score : max, 0);
    
    let totalDuration = this.filteredHistory.reduce((acc, curr) => acc + curr.duration, 0);
    if (totalDuration > 0) {
      this.avgSpeed = (this.totalCorrect / totalDuration).toFixed(1);
    } else {
      this.avgSpeed = '0.0';
    }
  }

  getModeName(mode: string) {
    const modes: any = { add: 'Penjumlahan', subtract: 'Pengurangan', multiply: 'Perkalian', divide: 'Pembagian' };
    return modes[mode] || 'Latihan';
  }

  getModeIcon(mode: string) {
    return 'document-text-outline';
  }

  formatDate(d: string) {
    if (!d) return '';
    const date = new Date(d);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  openResult(item: any) {
    this.router.navigate(['/hasil-tes'], { state: { result: item, isHistory: true } });
  }
}
