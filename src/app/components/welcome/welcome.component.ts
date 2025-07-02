import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <div class="container">
      <mat-card class="welcome-card mat-elevation-z8">
        <mat-card-content>
          <div class="welcome-content">
            <div class="brand-section">
              <div class="logo">
                <mat-icon class="wheel-icon">casino</mat-icon>
              </div>
              <h1 class="mat-headline-1 brand-title">Spin & Win</h1>
              <p class="mat-body-1 brand-subtitle">Test your luck with our spinning wheel game!</p>
            </div>

            <div class="cta-section">
              <button
                mat-raised-button
                color="primary"
                class="get-started-btn"
                routerLink="/game"
                (click)="onGetStarted()"
              >
                <mat-icon>play_arrow</mat-icon>
                Get Started
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .welcome-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    .welcome-content {
      padding: 1rem;
    }

    .brand-section {
      margin-bottom: 3rem;
    }

    .logo {
      margin-bottom: 2rem;
    }

    .wheel-icon {
      font-size: 4rem !important;
      width: 4rem !important;
      height: 4rem !important;
      color: #9c27b0;
      animation: rotate 3s linear infinite;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .brand-title {
      font-size: 3rem !important;
      font-weight: 700 !important;
      color: #9c27b0 !important;
      text-shadow: none !important;
      margin-bottom: 1rem !important;
    }

    .brand-subtitle {
      font-size: 1.2rem;
      color: #666 !important;
      opacity: 1 !important;
      margin-bottom: 2rem;
    }

    .get-started-btn {
      font-size: 1.3rem !important;
      padding: 1rem 3rem !important;
      border-radius: 50px !important;
      height: auto !important;
      min-width: 200px !important;
    }

    .get-started-btn mat-icon {
      margin-right: 8px;
      color: white;
    }

    .get-started-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(156, 39, 176, 0.3) !important;
    }

    @media (max-width: 768px) {
      .brand-title {
        font-size: 2.5rem !important;
      }

      .brand-subtitle {
        font-size: 1.1rem;
      }

      .wheel-icon {
        font-size: 3rem !important;
        width: 3rem !important;
        height: 3rem !important;
      }

      .get-started-btn {
        font-size: 1.1rem !important;
        padding: 0.8rem 2rem !important;
        min-width: 180px !important;
      }
    }
  `]
})
export class WelcomeComponent {
  constructor(private gameStateService: GameService) {}

  /**
   * Handle the "Get Started" button click
   * Reset game state when starting a new game
   */
  public onGetStarted(): void {
    this.gameStateService.resetGame();
  }
}
