import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  showSplash = true;
  fadeOutSplash = false;
  useFallback = false;

  constructor() {}

  ngOnInit() {
    // Tahan splash screen selama 3.2 detik agar animasi epik bisa selesai
    setTimeout(() => {
      this.fadeOutSplash = true;
      // Hapus dari layar setelah animasi 3D selesai (1 detik)
      setTimeout(() => {
        this.showSplash = false;
      }, 1000);
    }, 3200);
  }

  // Jika logo.png tidak ditemukan, tampilkan logo inisial "K" cadangan
  onImgError(event: any) {
    event.target.style.display = 'none';
    this.useFallback = true;
  }
}
