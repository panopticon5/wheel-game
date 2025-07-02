import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatIconModule]
})
export class WelcomeComponent {
  constructor(private _gameService: GameService) {}

  /**
   * Handle the "Get Started" button click
   * Reset game state when starting a new game
   */
  public onGetStarted(): void {
    this._gameService.resetGame();
  }
}
