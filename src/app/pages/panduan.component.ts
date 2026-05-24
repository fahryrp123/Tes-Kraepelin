import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { menuOutline, createOutline, bulbOutline, arrowUpOutline } from 'ionicons/icons';

@Component({
  selector: 'app-panduan',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="ion-text-center header-title">Panduan Tes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="content-wrapper">
        <div class="header-section">
          <div class="title-container">
            <h1>Instruksi Kerja<br><span class="highlight">Tes Kraepelin</span></h1>
          </div>
          <p class="description">
            Tes Kraepelin, atau sering dikenal sebagai "tes koran", adalah alat ukur psikologis yang menilai kecepatan, ketelitian, konsistensi, dan ketahanan kerja seseorang melalui penjumlahan angka yang sistematis.
          </p>
        </div>

        <div class="card p-4 mt-20">
          <div class="card-header">
            <div class="icon-box">
              <ion-icon name="create-outline"></ion-icon>
            </div>
            <div>
              <h2>Langkah Pengerjaan</h2>
              <span class="badge">SCIENTIFIC PROTOCOL</span>
            </div>
          </div>

          <div class="steps-list">
            <div class="step-item">
              <div class="step-number">1</div>
              <p>Jumlahkan dua angka yang berdekatan dari <strong>bawah ke atas</strong> di setiap kolom.</p>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <p>Tuliskan <strong>angka terakhir</strong> saja dari hasil penjumlahan tersebut di sebelah kanan ruang antara kedua angka.</p>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <p>Bila terdengar aba-aba <strong>"Pindah"</strong>, segera hentikan pekerjaan di kolom tersebut dan pindah ke bagian bawah kolom berikutnya.</p>
            </div>
          </div>
        </div>

        <div class="card p-4 mt-16 text-center viz-card">
          <h3 class="viz-title">VISUALISASI CONTOH</h3>

          <div class="example-column">
            <div class="number-box">4</div>
            <div class="arrow-row">
              <ion-icon name="arrow-up-outline" class="text-blue"></ion-icon>
              <div class="answer-box">3</div>
            </div>
            <div class="number-box">9</div>
          </div>

          <div class="formula-badge">
            9 + 4 = <strong>13</strong> &rarr; Tulis <strong>3</strong>
          </div>
        </div>

        <div class="card p-4 mt-16">
          <div class="tips-header">
            <ion-icon name="bulb-outline" color="danger"></ion-icon>
            <h2>Tips Pengerjaan</h2>
          </div>

          <div class="tip-item">
            <h4>Jaga Ritme</h4>
            <p>Konsisten lebih penting daripada terburu-buru. Usahakan kecepatan tetap stabil dari awal sampai akhir.</p>
          </div>

          <hr class="divider">

          <div class="tip-item">
            <h4>Tetap Teliti</h4>
            <p>Kelelahan wajar terjadi seiring waktu. Tetap waspada terutama saat menghitung angka yang lebih besar.</p>
          </div>

          <hr class="divider">

          <div class="tip-item">
            <h4>Jangan Hapus</h4>
            <p>Kalau salah, langsung timpa saja dengan jawaban yang benar. Jangan buang waktu untuk menghapus.</p>
          </div>
        </div>


      </div>
    </ion-content>
  `,
  styles: [`
    ion-content { --background: #f7f9fa; }
    ion-toolbar { --background: #f7f9fa; }
    .header-title { font-size: 16px; font-weight: 700; color: #0d5dd7; }

    .content-wrapper { padding: 16px 20px 40px; }
    .header-section {
      padding-left: 16px; border-left: 4px solid #0d5dd7; margin-bottom: 24px;
    }
    h1 { font-size: 26px; font-weight: 800; color: #111; line-height: 1.2; margin: 0; }
    .highlight { color: #0d5dd7; }
    .description { font-size: 13px; color: #555; line-height: 1.6; margin-top: 12px; margin-bottom: 0; }

    .card { background: white; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.03); }
    .p-4 { padding: 20px; }
    .mt-20 { margin-top: 20px; }
    .mt-16 { margin-top: 16px; }
    .mt-24 { margin-top: 24px; }
    .text-center { text-align: center; }

    .card-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
      .icon-box {
        width: 36px; height: 36px; background: #eaf2ff; border-radius: 8px;
        display: flex; align-items: center; justify-content: center; color: #0d5dd7; font-size: 18px;
      }
      h2 { font-size: 15px; font-weight: 700; margin: 0 0 4px 0; color: #111; }
      .badge { font-size: 9px; font-weight: 700; color: #555; letter-spacing: 0.5px; }
    }

    .steps-list { display: flex; flex-direction: column; gap: 16px; }
    .step-item {
      display: flex; gap: 16px; align-items: flex-start;
      .step-number {
        width: 24px; height: 24px; background: #e8ebee; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 11px; font-weight: 700; color: #0d5dd7; flex-shrink: 0;
      }
      p { margin: 0; font-size: 13px; color: #444; line-height: 1.5; strong { color: #111; } }
    }

    .viz-card { background: #f8f9fa; }
    .viz-title { font-size: 11px; font-weight: 700; color: #666; letter-spacing: 1px; margin: 0 0 20px 0; }
    .example-column { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 20px; }
    .number-box {
      background: white; padding: 8px 16px; font-size: 20px; font-weight: 700;
      border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .arrow-row { display: flex; align-items: center; gap: 12px; margin-left: 36px; }
    .text-blue { color: #0d5dd7; font-size: 20px; }
    .answer-box {
      background: white; border: 2px solid #0d5dd7; color: #0d5dd7;
      font-size: 16px; font-weight: 700; padding: 4px 12px; border-radius: 6px;
    }
    .formula-badge {
      display: inline-block; background: #e8ebee; padding: 8px 16px;
      border-radius: 20px; font-size: 11px; color: #555;
    }

    .tips-header {
      display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
      ion-icon { font-size: 20px; }
      h2 { font-size: 16px; font-weight: 700; margin: 0; color: #111; }
    }
    .tip-item {
      h4 { font-size: 13px; font-weight: 700; color: #111; margin: 0 0 8px 0; }
      p { font-size: 12px; color: #555; line-height: 1.5; margin: 0; }
    }
    .divider {
      border: none; border-top: 1px solid #f0f0f0; margin: 16px 0;
    }

    .actions { display: flex; flex-direction: column; gap: 12px; }
    .primary-btn {
      width: 100%; background: #0d5dd7; color: white; border: none;
      padding: 16px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer;
    }
    .text-btn {
      width: 100%; background: transparent; color: #0d5dd7; border: none;
      padding: 16px; font-size: 13px; font-weight: 700; cursor: pointer;
    }
  `]
})
export class PanduanComponent {
  constructor(private router: Router) {
    addIcons({ menuOutline, createOutline, bulbOutline, arrowUpOutline });
  }
}
