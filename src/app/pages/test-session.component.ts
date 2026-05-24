import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline, documentTextOutline } from 'ionicons/icons';

interface NavState { mode?: string; duration?: number; }
interface AppSettings {
  showCorrect: boolean;
  showWrong: boolean;
  showTimer: boolean;
  showNextQuestion: boolean;
  vibrateFeedback: boolean;
  displayType: 'horizontal' | 'vertical';
  numpadLayout: 'standard' | 'reverse';
  duration?: number;
}

@Component({
  selector: 'app-test-session',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="header-content">
          <div class="logo-container">
            <ion-icon name="document-text-outline" class="brand-icon"></ion-icon>
            <span class="brand-text">KRAEPELIN</span>
          </div>

          <ion-icon name="close-outline" class="close-icon" (click)="confirmEnd()"></ion-icon>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content scroll-y="false">
      <div class="test-container">

        <!-- Stats Row -->
        <div class="stats-container">
          <div class="stat-box time-box" *ngIf="appSettings.showTimer">
            <span class="label">SISA WAKTU</span>
            <div class="value-row">
              <span class="time">{{ timeDisplay.min }}:{{ timeDisplay.sec }}</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-fill" [style.width.%]="(timeLeft / totalTime) * 100"></div>
            </div>
          </div>

          <div class="stat-box score-box" [class.full-width]="!appSettings.showTimer">
            <div class="score-item" *ngIf="appSettings.showCorrect">
              <span class="label">BENAR</span>
              <div class="value text-blue">{{ correct }}</div>
            </div>
            <div class="score-divider" *ngIf="appSettings.showCorrect && appSettings.showWrong"></div>
            <div class="score-item" *ngIf="appSettings.showWrong">
              <span class="label">SALAH</span>
              <div class="value text-red">{{ wrong }}</div>
            </div>
            <div class="score-item" *ngIf="!appSettings.showCorrect && !appSettings.showWrong">
              <span class="label">SOAL</span>
              <div class="value">{{ correct + wrong }}</div>
            </div>
          </div>
        </div>

        <!-- Gameplay Area -->
        <div class="gameplay-area">
          <div class="numbers-column">
            <!-- Nomor Berikutnya -->
            <div class="next-numbers-row" *ngIf="appSettings.showNextQuestion">
              <div class="next-box">
                <span class="next-label">KIRI BERIKUTNYA</span>
                <span class="next-val">{{ numChain[chainIndex + 1] }}</span>
              </div>
              <div class="next-box">
                <span class="next-label">KANAN BERIKUTNYA</span>
                <span class="next-val">{{ numChain[chainIndex + 2] }}</span>
              </div>
            </div>

            <!-- === VERTICAL MODE === -->
            <div class="challenge-card"
              *ngIf="appSettings.displayType !== 'horizontal'"
              [class.correct-flash]="flashCorrect"
              [class.wrong-flash]="flashWrong">
              <div class="op-badge">{{ opLabel }}</div>
              <div class="num-op1">{{ currentNum1 }}</div>
              <div class="num-op2">{{ currentNum2 }}</div>
              <div class="input-zone">
                <span class="question-mark" *ngIf="!userInput">?</span>
                <span class="entered-val" *ngIf="userInput">{{ userInput }}</span>
                <div class="underline"></div>
              </div>
            </div>

            <!-- === HORIZONTAL MODE === -->
            <div class="challenge-card challenge-h"
              *ngIf="appSettings.displayType === 'horizontal'"
              [class.correct-flash]="flashCorrect"
              [class.wrong-flash]="flashWrong">
              <div class="op-badge">{{ opLabel }}</div>
              <div class="h-row">
                <span class="h-num1">{{ currentNum1 }}</span>
                <span class="h-op">{{ opSymbol }}</span>
                <span class="h-num2">{{ currentNum2 }}</span>
                <span class="h-eq">=</span>
                <div class="input-zone-h">
                  <span class="question-mark" *ngIf="!userInput">?</span>
                  <span class="entered-val" *ngIf="userInput">{{ userInput }}</span>
                  <div class="underline"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Numpad — dynamic layout from settings -->
        <div class="keyboard-area">
          <div class="numpad">
            <button
              class="num-btn"
              *ngFor="let k of numpadKeys"
              [class.zero-btn]="k === 0"
              (click)="pressKey(k)">{{ k }}</button>
          </div>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    ion-content { --background: #f7f9fa; }
    ion-toolbar { --background: white; border-bottom: 1px solid #f0f0f0; }

    .header-content {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 16px; height: 56px;
    }
    .logo-container {
      display: flex; align-items: center; gap: 6px;
      .brand-icon { color: #0d5dd7; font-size: 20px; }
      .brand-text { font-weight: 800; font-size: 16px; color: #0d5dd7; letter-spacing: 0.5px; }
    }

    .close-icon { font-size: 28px; color: #555; cursor: pointer; }

    .test-container { display: flex; flex-direction: column; height: 100%; }

    /* Stats */
    .stats-container { display: flex; gap: 12px; padding: 8px 16px; }
    .stat-box {
      background: white; border-radius: 12px; padding: 10px 14px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    }
    .time-box {
      flex: 1.4;
      .label { font-size: 9px; font-weight: 800; color: #888; letter-spacing: 0.5px; display: block; margin-bottom: 2px; }
      .value-row { display: flex; align-items: baseline; gap: 4px; margin-bottom: 6px;
        .time { font-size: 20px; font-weight: 800; color: #0d5dd7; line-height: 1; }
        .unit { font-size: 9px; color: #888; font-weight: 700; }
      }
      .progress-bar-bg {
        height: 4px; background: #f0f0f0; border-radius: 2px; overflow: hidden;
        .progress-fill { height: 100%; background: linear-gradient(90deg, #0d5dd7, #4f9cf9); transition: width 1s linear; }
      }
    }
    .score-box {
      flex: 1; display: flex; align-items: center; justify-content: space-around;
      &.full-width { flex: 2; }
    }
    .score-item {
      display: flex; flex-direction: column; align-items: center;
      .label { font-size: 9px; font-weight: 800; color: #888; letter-spacing: 0.5px; margin-bottom: 2px; }
      .value { font-size: 18px; font-weight: 800; }
    }
    .score-divider { width: 1px; height: 28px; background: #eee; }
    .text-blue { color: #0d5dd7; }
    .text-red { color: #d93838; }

    /* Gameplay */
    .gameplay-area {
      flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
      overflow-y: auto; padding: 10px 0;
    }
    .numbers-column { 
      display: flex; flex-direction: column; align-items: center; width: 100%; margin: auto 0;
    }
    .next-numbers-row {
      display: flex; gap: 12px; margin-bottom: 12px;
    }
    .next-box {
      background: #eaf2ff; padding: 8px 16px; border-radius: 12px;
      display: flex; flex-direction: column; align-items: center;
      border: 1px solid #dce8fc; box-shadow: 0 4px 12px rgba(13, 93, 215, 0.08);
      min-width: 90px;
    }
    .next-label { font-size: 8px; font-weight: 800; color: #0d5dd7; letter-spacing: 0.5px; }
    .next-val { font-size: 22px; font-weight: 800; color: #111; margin-top: 2px; line-height: 1; }

    /* Vertical card */
    .challenge-card {
      background: white; border-radius: 24px; padding: 16px 36px 20px;
      display: flex; flex-direction: column; align-items: center;
      margin: 4px 0; box-shadow: 0 8px 32px rgba(0,0,0,0.06);
      min-width: 170px; transition: box-shadow 0.15s ease;
      &.correct-flash { box-shadow: 0 0 0 3px #22c55e; }
      &.wrong-flash { box-shadow: 0 0 0 3px #ef4444; }
    }
    .op-badge {
      background: #eaf2ff; color: #0d5dd7; font-size: 9px; font-weight: 800;
      padding: 4px 12px; border-radius: 6px; margin-bottom: 6px;
      border: 1px solid #dce8fc; letter-spacing: 0.5px;
    }
    .num-op1 { font-size: 46px; font-weight: 800; color: #334155; line-height: 1; }
    .num-op2 { font-size: 56px; font-weight: 800; color: #111; line-height: 1.15; }

    .input-zone {
      margin-top: 6px; display: flex; flex-direction: column; align-items: center; min-width: 56px;
      .question-mark { font-size: 38px; font-weight: 700; color: #8ab4f8; }
      .entered-val { font-size: 38px; font-weight: 700; color: #0d5dd7; }
      .underline { width: 80%; height: 2.5px; background: #0d5dd7; margin-top: 2px; border-radius: 2px; }
    }

    /* Horizontal card */
    .challenge-h {
      padding: 16px 20px 20px; min-width: 260px;
    }
    .h-row {
      display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .h-num1 { font-size: 38px; font-weight: 800; color: #334155; line-height: 1; }
    .h-op   { font-size: 32px; font-weight: 700; color: #0d5dd7; line-height: 1; }
    .h-num2 { font-size: 46px; font-weight: 800; color: #111; line-height: 1; }
    .h-eq   { font-size: 32px; font-weight: 700; color: #888; line-height: 1; }
    .input-zone-h {
      display: flex; flex-direction: column; align-items: center; min-width: 44px;
      .question-mark { font-size: 38px; font-weight: 700; color: #8ab4f8; }
      .entered-val { font-size: 38px; font-weight: 700; color: #0d5dd7; }
      .underline { width: 100%; height: 2.5px; background: #0d5dd7; margin-top: 2px; border-radius: 2px; }
    }

    /* Keyboard */
    .keyboard-area {
      background: white; border-top-left-radius: 24px; border-top-right-radius: 24px;
      padding: 16px 12px 12px;
      padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
      box-shadow: 0 -4px 24px rgba(0,0,0,0.06);
    }
    .numpad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      max-width: 380px; margin: 0 auto;
    }
    .num-btn {
      background: white; border: 1.5px solid #f0f0f4; height: 50px; border-radius: 12px;
      font-size: 22px; font-weight: 600; color: #111;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04); cursor: pointer; transition: all 0.1s;
      &:active { background: #f0f4ff; transform: scale(0.95); border-color: #0d5dd7; }
    }
    .zero-btn { grid-column: 1 / -1; }
  `]
})
export class TestSessionComponent implements OnInit, OnDestroy {
  mode = 'add';
  appSettings: AppSettings = {
    showCorrect: true,
    showWrong: true,
    showTimer: true,
    showNextQuestion: true,
    vibrateFeedback: true,
    displayType: 'vertical',
    numpadLayout: 'standard'
  };
  totalTime = 300;
  timeLeft = 300;
  timer: any;

  correct = 0;
  wrong = 0;

  numChain: number[] = [];
  chainIndex = 0;
  userInput = '';
  flashCorrect = false;
  flashWrong = false;
  isSubmitting = false;

  chunks: { correct: number; wrong: number }[] = Array.from({length: 10}, () => ({correct: 0, wrong: 0}));

  opLabels: Record<string, string> = {
    add: 'PENJUMLAHAN', subtract: 'PENGURANGAN',
    multiply: 'PERKALIAN', divide: 'PEMBAGIAN'
  };
  opSymbols: Record<string, string> = {
    add: '+', subtract: '−', multiply: '×', divide: '÷'
  };

  constructor(private router: Router) {
    addIcons({ closeOutline, documentTextOutline });
  }

  get opLabel() { return this.opLabels[this.mode] || 'PENJUMLAHAN'; }
  get opSymbol() { return this.opSymbols[this.mode] || '+'; }
  get currentNum1() { return this.numChain[this.chainIndex] ?? 0; }
  get currentNum2() { return this.numChain[this.chainIndex + 1] ?? 0; }

  /** Numpad key order based on layout setting */
  get numpadKeys(): number[] {
    if (this.appSettings.numpadLayout === 'reverse') {
      return [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    }
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  }

  get timeDisplay() {
    return {
      min: Math.floor(this.timeLeft / 60).toString().padStart(2, '0'),
      sec: (this.timeLeft % 60).toString().padStart(2, '0')
    };
  }

  private hasInitialized = false;

  ionViewWillEnter() {
    if (this.hasInitialized) {
      this.initTest();
    }
  }

  ngOnInit() {
    this.initTest();
    this.hasInitialized = true;
  }

  initTest() {
    const nav = this.router.getCurrentNavigation();
    let state = (nav?.extras?.state || window.history.state || {}) as NavState;
    this.mode = state.mode || 'add';
    
    // Reset state for new test
    if (this.timer) clearInterval(this.timer);
    this.correct = 0;
    this.wrong = 0;
    this.chunks = Array.from({length: 10}, () => ({correct: 0, wrong: 0}));
    this.userInput = '';

    if (state.duration && state.duration > 0) {
      this.totalTime = state.duration;
      this.timeLeft = state.duration;
    } else {
      this.totalTime = 300;
      this.timeLeft = 300;
    }

    // Load and apply all settings from localStorage
    try {
      const s = localStorage.getItem('kraepelin_settings');
      if (s) {
        const parsed = JSON.parse(s);
        this.appSettings = { ...this.appSettings, ...parsed };
        if (!state.duration) {
          this.totalTime = this.appSettings.duration || 300;
          this.timeLeft = this.totalTime;
        }
      }
    } catch {}

    this.generateChain(60);
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) this.timeLeft--;
      else this.endTest();
    }, 1000);
  }

  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }

  generateChain(length: number) {
    this.numChain = [];
    for (let i = 0; i < length; i++) this.numChain.push(Math.floor(Math.random() * 9) + 1);
    this.chainIndex = 0;
  }

  computeCorrectAnswer(): number {
    const a = this.currentNum1, b = this.currentNum2;
    let result = 0;
    switch (this.mode) {
      case 'add':      result = a + b; break;
      case 'subtract': result = Math.abs(a - b); break;
      case 'multiply': result = a * b; break;
      case 'divide':   result = b !== 0 ? Math.floor(a / b) : 0; break;
      default:         result = a + b;
    }
    return result % 10; // Kraepelin: last digit only
  }

  pressKey(num: number) {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.userInput = num.toString();
    
    // Memberikan delay sebentar agar angka muncul dulu sebelum ganti soal
    setTimeout(() => {
      this.submitAnswer();
      this.isSubmitting = false;
    }, 150); 
  }

  submitAnswer() {
    if (!this.userInput) return;
    const ans = parseInt(this.userInput, 10);
    const correct = this.computeCorrectAnswer();

    const elapsed = this.totalTime - this.timeLeft;
    const chunkIndex = Math.min(9, Math.floor((elapsed / this.totalTime) * 10));

    if (ans === correct) { 
      this.correct++; 
      this.chunks[chunkIndex].correct++;
      this.doFlash('correct'); 
    } else { 
      this.wrong++; 
      this.chunks[chunkIndex].wrong++;
      this.doFlash('wrong'); 
    }

    this.chainIndex++;
    if (this.chainIndex + 5 >= this.numChain.length) {
      for (let i = 0; i < 20; i++) this.numChain.push(Math.floor(Math.random() * 9) + 1);
    }
    this.userInput = '';
  }

  doFlash(type: 'correct' | 'wrong') {
    if (type === 'correct') { this.flashCorrect = true; setTimeout(() => this.flashCorrect = false, 180); }
    else { this.flashWrong = true; setTimeout(() => this.flashWrong = false, 180); }
  }

  confirmEnd() { this.endTest(); }

  endTest() {
    if (this.timer) clearInterval(this.timer);
    const durationUsed = this.totalTime - this.timeLeft;
    const score = this.correct;

    const result = {
      id: Date.now().toString(),
      mode: this.mode,
      correct: this.correct,
      wrong: this.wrong,
      duration: durationUsed,
      score,
      timestamp: new Date().toISOString(),
      chunks: this.chunks
    };
    const existing = JSON.parse(localStorage.getItem('kraepelin_tests') || '[]');
    existing.unshift(result);
    localStorage.setItem('kraepelin_tests', JSON.stringify(existing));

    this.router.navigate(['/hasil-tes'], { state: { result } });
  }
}
