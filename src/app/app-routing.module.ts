import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs.component').then(m => m.TabsComponent),
    children: [
      {
        path: '',
        redirectTo: 'beranda',
        pathMatch: 'full'
      },
      {
        path: 'beranda',
        loadComponent: () => import('./pages/beranda.component').then(m => m.BerandaComponent)
      },
      {
        path: 'riwayat',
        loadComponent: () => import('./pages/riwayat.component').then(m => m.RiwayatComponent)
      },
      {
        path: 'panduan',
        loadComponent: () => import('./pages/panduan.component').then(m => m.PanduanComponent)
      },
      {
        path: 'setelan',
        loadComponent: () => import('./pages/setelan.component').then(m => m.SetelanComponent)
      }
    ]
  },
  {
    path: 'test-session',
    loadComponent: () => import('./pages/test-session.component').then(m => m.TestSessionComponent)
  },
  {
    path: 'hasil-tes',
    loadComponent: () => import('./pages/hasil-tes.component').then(m => m.HasilTesComponent)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
