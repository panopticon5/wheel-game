import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: 'game',
    loadComponent: () => import('./components/game/game.component').then(m => m.GameComponent)
  },
  {
    path: 'results',
    loadComponent: () => import('./components/results/results.component').then(m => m.ResultsComponent)
  },
  { path: '**', redirectTo: '/welcome' }
];
