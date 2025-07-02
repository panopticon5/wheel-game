import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService, WheelSegment } from '../../services/game.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="results-content" *ngIf="selectedSegment; else noResult">
        <div class="result-display">
          <div class="trophy">🏆</div>
          <h1 class="results-title">Congratulations!</h1>
          <p class="results-subtitle">You landed on:</p>

          <div
            class="winning-segment"
            [style.background-color]="selectedSegment.color"
          >
            <span class="segment-name">{{ selectedSegment.label }}</span>
          </div>

          <div class="segment-details">
            <p class="segment-id">Segment #{{ selectedSegment.id }}</p>
          </div>
        </div>

        <div class="actions">
          <a
            routerLink="/welcome"
            class="btn btn-primary"
            (click)="restartGame()"
          >
            Play Again
          </a>
          <a
            routerLink="/game"
            class="btn btn-secondary"
          >
            Spin Again
          </a>
        </div>
      </div>

      <!-- Fallback template if no result is available -->
      <ng-template #noResult>
        <div class="no-result">
          <h2>No Result Available</h2>
          <p>It looks like you haven't spun the wheel yet.</p>
          <a routerLink="/game" class="btn btn-primary">Go to Game</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .results-content {
      text-align: center;
      color: white;
      max-width: 500px;
    }

    .result-display {
      margin-bottom: 3rem;
    }

    .trophy {
      font-size: 4rem;
      margin-bottom: 1rem;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-20px);
      }
      60% {
        transform: translateY(-10px);
      }
    }

    .results-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .results-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 2rem;
    }

    .winning-segment {
      display: inline-block;
      padding: 1.5rem 3rem;
      border-radius: 12px;
      margin-bottom: 1rem;
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
      border: 3px solid white;
    }

    .segment-name {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
      text-shadow: 1px 1px 2px rgba(255,255,255,0.7);
    }

    .segment-details {
      margin-bottom: 2rem;
    }

    .segment-id {
      font-size: 1rem;
      opacity: 0.8;
      font-style: italic;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .no-result {
      text-align: center;
      color: white;
    }

    .no-result h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .no-result p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .results-title {
        font-size: 2rem;
      }

      .winning-segment {
        padding: 1rem 2rem;
      }

      .segment-name {
        font-size: 1.5rem;
      }

      .trophy {
        font-size: 3rem;
      }

      .actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class ResultsComponent implements OnInit {
  selectedSegment: WheelSegment | null = null;

  constructor(
    private gameStateService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the selected segment from the game state
    this.selectedSegment = this.gameStateService.getSelectedSegment();

    // If no segment is selected, redirect to welcome page
    if (!this.selectedSegment) {
      this.router.navigate(['/welcome']);
    }
  }

  /**
   * Handle restart game button click
   * Reset the game state and navigate to welcome page
   */
  restartGame(): void {
    this.gameStateService.resetGame();
  }
}
