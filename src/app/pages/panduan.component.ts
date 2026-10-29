import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  flask, bookOutline, alertCircleOutline, checkmarkCircle, checkmarkCircleOutline, arrowDownOutline, informationCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-panduan',
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
              <h1 class="page-title">Metode</h1>
            </div>
          </div>
        </div>

        <div class="method-banner">
          <div class="banner-badge"><ion-icon name="book-outline"></ion-icon> PANDUAN TES</div>
          <h2>Aturan Pengerjaan</h2>
          <p>Pahami cara pengerjaan tes Kraepelin agar hasil latihan Anda lebih maksimal.</p>
        </div>

        <div class="section-container">
          <div class="section-title-row">
            <h3>3 Aturan Dasar</h3>
          </div>
          
          <div class="rule-card">
            <div class="rule-number">1</div>
            <div class="rule-content">
              <h4>Hitung Secara Vertikal</h4>
              <p>Tambahkan dua angka yang berdekatan. Arah pengerjaan di aplikasi ini adalah <strong>Bawah ke Atas</strong> (Kraepelin).</p>
            </div>
          </div>
          
          <div class="rule-card">
            <div class="rule-number">2</div>
            <div class="rule-content">
              <h4>Hanya Tulis Angka Terakhir</h4>
              <p>Jika hasil hitungan lebih dari 9, tuliskan hanya angka terakhirnya saja. <em>Contoh: 8 + 7 = 15, cukup ketik angka 5.</em></p>
            </div>
          </div>
          
          <div class="rule-card">
            <div class="rule-number">3</div>
            <div class="rule-content">
              <h4>Perhatikan Waktu</h4>
              <p>Teruslah berhitung secepat mungkin sampai waktu habis. Tidak usah ragu, kecepatan adalah kunci!</p>
            </div>
          </div>
        </div>

        <div class="section-container">
          <div class="section-title-row">
            <h3>Ilustrasi Pengerjaan</h3>
            <span class="s-link text-green"><ion-icon name="checkmark-circle"></ion-icon> Contoh Valid</span>
          </div>

          <div class="simulation-box">
             <div class="sim-body">
                <div class="sim-col">
                   <div class="num-box empty"></div>
                   <div class="num-box">4</div>
                   <div class="input-box valid">7</div>
                   <div class="num-box">3</div>
                   <div class="input-box valid">1</div>
                   <div class="num-box">8</div>
                </div>
                <div class="sim-explanation">
                  <div class="exp-item">
                    <ion-icon name="arrow-down-outline" class="rotate-180"></ion-icon>
                    <span><strong>4 + 3 = 7</strong> (Ketik 7)</span>
                  </div>
                  <div class="exp-item">
                    <ion-icon name="arrow-down-outline" class="rotate-180"></ion-icon>
                    <span><strong>3 + 8 = 11</strong> (Ketik 1)</span>
                  </div>
                </div>
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
    .s-link { font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
    .text-green { color: #10b981; }

    .method-banner { background: #1e293b; border-radius: 16px; padding: 20px; margin-bottom: 24px; color: white; }
    .banner-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); color: #94a3b8; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.05); }
    .method-banner h2 { font-size: 20px; font-weight: 800; margin: 0 0 8px 0; color: white; }
    .method-banner p { margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5; }

    .rule-card { display: flex; gap: 16px; background: white; border-radius: 16px; padding: 16px; margin-bottom: 12px; border: 1px solid #f3f4f6; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
    .rule-number { width: 32px; height: 32px; border-radius: 50%; background: #005c4b; color: white; display: flex; justify-content: center; align-items: center; font-size: 16px; font-weight: 800; flex-shrink: 0; }
    .rule-content h4 { font-size: 14px; font-weight: 800; color: #111; margin: 0 0 6px 0; }
    .rule-content p { font-size: 12px; color: #4b5563; margin: 0; line-height: 1.5; }

    .simulation-box { background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .sim-body { padding: 20px; display: flex; gap: 32px; align-items: center; justify-content: center; }
    .sim-col { display: flex; flex-direction: column; gap: 8px; width: 40px; }
    .num-box, .input-box { width: 40px; height: 40px; border-radius: 8px; display: flex; justify-content: center; align-items: center; font-size: 18px; font-weight: 700; }
    .num-box { background: white; border: 1px solid #cbd5e1; color: #334155; }
    .num-box.empty { background: transparent; border: 1px dashed #cbd5e1; }
    .input-box { background: #eef2fa; border: 2px solid #3b82f6; color: #1d4ed8; font-weight: 800; transform: translateX(12px); width: 36px; height: 36px; font-size: 16px; margin: -10px 0; z-index: 2; position: relative; }
    .input-box.valid { background: #ecfdf5; border-color: #10b981; color: #047857; }
    
    .sim-explanation { display: flex; flex-direction: column; gap: 36px; margin-top: 10px; }
    .exp-item { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #475569; }
    .rotate-180 { transform: rotate(180deg); color: #005c4b; font-size: 14px; font-weight: 800; }
    .exp-item strong { color: #005c4b; }
  `]
})
export class PanduanComponent {
  constructor() {
    addIcons({
      flask, bookOutline, alertCircleOutline, checkmarkCircle, checkmarkCircleOutline, arrowDownOutline, informationCircleOutline
    });
  }
}
