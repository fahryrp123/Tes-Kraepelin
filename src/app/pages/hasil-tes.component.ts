import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hasil-tes',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-content class="light-theme">
      <div class="result-container">
        
        <div class="header-section">
          <label class="subtitle">HASIL TES KRAEPELIN</label>
          <h1>Skor Akhir</h1>
          <div class="score-display">
            <span class="score-value text-blue">{{ result?.score }}</span>
          </div>
        </div>

        <!-- Chart Bento Card -->
        <div class="bento-card chart-card mt-20">
          <h3>Performa Tiap Sesi (10 Bagian)</h3>
          <div class="chart-wrapper">
            <div class="grid-lines">
               <div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div>
            </div>
            
            <div class="bars-container">
              <div class="chunk-group" *ngFor="let c of chunks; let i = index">
                <div class="bars">
                   <div class="bar bar-correct" [style.height.%]="getPercent(c.correct)"></div>
                   <div class="bar bar-wrong" [style.height.%]="getPercent(c.wrong)"></div>
                </div>
                <span class="chunk-label">S{{ i + 1 }}</span>
              </div>
            </div>
          </div>
          <div class="chart-legend">
             <div class="legend-item"><span class="dot green"></span> Benar</div>
             <div class="legend-item"><span class="dot red"></span> Salah</div>
          </div>
        </div>

        <!-- Quick Stats Grid -->
        <div class="stats-grid mt-16">
          <div class="stat-card">
            <span class="label">TOTAL BENAR</span>
            <span class="value text-green">{{ result?.correct }}</span>
          </div>
          <div class="stat-card">
            <span class="label">TOTAL SALAH</span>
            <span class="value text-red">{{ result?.wrong }}</span>
          </div>
        </div>

        <!-- Detailed Stats List -->
        <div class="bento-card details-card mt-16">
          <div class="d-row">
            <div class="d-info">
              <span class="d-title">Kecepatan</span>
              <span class="d-desc">Rata-rata detik per soal</span>
            </div>
            <span class="d-val">{{ kecepatan }}</span>
          </div>
          <div class="d-row">
            <div class="d-info">
              <span class="d-title">Ketelitian</span>
              <span class="d-desc">Akurasi dari semua jawaban</span>
            </div>
            <span class="d-val">{{ ketelitian }}</span>
          </div>
          <div class="d-row border-none">
            <div class="d-info">
              <span class="d-title">Kestabilan</span>
              <span class="d-desc">Konsistensi tempo pengerjaan</span>
            </div>
            <span class="d-val">{{ kestabilan }}</span>
          </div>
        </div>

      </div>
    </ion-content>

    <ion-footer class="ion-no-border" style="background: #f7f9fa;">
      <div class="action-buttons" style="padding: 16px 20px 24px;">
        <button class="btn-primary" (click)="keluar()">KEMBALI</button>
      </div>
    </ion-footer>
  `,
  styles: [`
    ion-content { --background: #f7f9fa; }
    .result-container {
      display: flex; flex-direction: column; padding: 24px 20px 40px; font-family: 'Inter', sans-serif;
    }
    
    .header-section {
      text-align: center; margin-top: 10px;
      .subtitle { font-size: 10px; font-weight: 800; color: #0d5dd7; letter-spacing: 1px; }
      h1 { font-size: 20px; font-weight: 700; color: #111; margin: 4px 0 16px; }
    }
    .score-display {
      background: white; border-radius: 24px; padding: 20px; display: inline-block;
      min-width: 160px; box-shadow: 0 8px 24px rgba(13, 93, 215, 0.08); border: 1px solid #eef4ff;
    }
    .score-value { font-size: 56px; font-weight: 800; line-height: 1; }
    .text-blue { color: #0d5dd7; }
    .text-green { color: #10b981; }
    .text-red { color: #ef4444; }

    .bento-card {
      background: white; border-radius: 20px; padding: 20px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.03); border: 1px solid #f0f0f4;
    }
    .mt-16 { margin-top: 16px; }
    .mt-20 { margin-top: 20px; }
    .mt-24 { margin-top: 24px; }

    /* Chart */
    .chart-card h3 { font-size: 14px; font-weight: 800; color: #111; margin: 0 0 16px 0; }
    .chart-wrapper { position: relative; height: 180px; margin-bottom: 16px; }
    .grid-lines {
      position: absolute; top: 0; left: 0; right: 0; bottom: 20px;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .line { border-bottom: 1px dashed #e5e7eb; width: 100%; height: 1px; }
    
    .bars-container {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      display: flex; justify-content: space-between; align-items: flex-end;
      padding-bottom: 20px;
    }
    .chunk-group { display: flex; flex-direction: column; align-items: center; width: 100%; }
    .bars { display: flex; gap: 4px; align-items: flex-end; height: 160px; justify-content: center; width: 100%; }
    .bar { width: 8px; border-radius: 4px; min-height: 4px; animation: grow 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards; }
    .bar-correct { background: linear-gradient(180deg, #10b981, #34d399); }
    .bar-wrong { background: linear-gradient(180deg, #ef4444, #f87171); }
    @keyframes grow { from { height: 0; opacity: 0; } to { opacity: 1; } }

    .chunk-label { font-size: 9px; color: #888; margin-top: 8px; font-weight: 700; }
    
    .chart-legend { display: flex; gap: 16px; justify-content: center; }
    .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #555; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot.green { background: #10b981; }
    .dot.red { background: #ef4444; }

    /* Quick Stats Grid */
    .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .stat-card {
      background: white; border-radius: 16px; padding: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.03); border: 1px solid #f0f0f4;
      display: flex; flex-direction: column; align-items: center;
      .label { font-size: 10px; font-weight: 800; color: #888; letter-spacing: 0.5px; margin-bottom: 6px; }
      .value { font-size: 32px; font-weight: 800; line-height: 1; }
    }

    /* Detailed Stats */
    .details-card { padding: 10px 20px; }
    .d-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 0; border-bottom: 1px solid #f0f0f4;
      &.border-none { border-bottom: none; }
      .d-info { display: flex; flex-direction: column; gap: 4px; }
      .d-title { font-size: 14px; font-weight: 800; color: #111; }
      .d-desc { font-size: 11px; color: #888; font-weight: 600; }
      .d-val { font-size: 14px; font-weight: 800; color: #0d5dd7; background: #eaf2ff; padding: 6px 12px; border-radius: 8px; }
    }

    /* Buttons */
    .action-buttons { display: flex; gap: 12px; }
    .btn-primary {
      flex: 1; background: #0d5dd7; border: none;
      border-radius: 16px; padding: 16px 0; font-size: 14px; font-weight: 800;
      color: #fff; cursor: pointer; box-shadow: 0 4px 12px rgba(13, 93, 215, 0.2);
    }
  `]
})
export class HasilTesComponent implements OnInit {
  result: any;
  chunks: any[] = [];
  maxVal = 35;
  isHistory = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['result']) {
      this.result = nav.extras.state['result'];
      this.isHistory = nav.extras.state['isHistory'] || false;
      this.chunks = this.result.chunks || Array.from({ length: 10 }, () => ({ correct: 0, wrong: 0 }));

      const highest = Math.max(...this.chunks.map(c => Math.max(c.correct, c.wrong)));
      if (highest > 30) this.maxVal = Math.ceil(highest / 5) * 5;
    } else {
      this.keluar();
    }
  }

  getPercent(val: number) {
    if (!val) return 0;
    return Math.min(100, (val / this.maxVal) * 100);
  }

  get kecepatan() {
    const total = (this.result?.correct || 0) + (this.result?.wrong || 0);
    const spd = total > 0 ? this.result?.duration / total : 0;
    if (!spd || spd > 3) return 'Rendah';
    if (spd < 1.5) return 'Tinggi';
    return 'Sedang';
  }

  get ketelitian() {
    const total = (this.result?.correct || 0) + (this.result?.wrong || 0);
    const acc = total > 0 ? this.result?.correct / total : 0;
    if (!acc || acc < 0.5) return 'Sangat Rendah';
    if (acc > 0.9) return 'Sangat Tinggi';
    if (acc > 0.75) return 'Tinggi';
    return 'Sedang';
  }

  get kestabilan() {
    return 'Sedang';
  }

  keluar() {
    this.router.navigate(['/tabs/riwayat']);
  }
}
