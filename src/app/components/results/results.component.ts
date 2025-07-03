import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import {WheelSegment} from '../../types/wheel.types';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

@Component({
  selector: 'results',
  standalone: true,
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  imports: [RouterLink, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle]
})
export class ResultsComponent implements OnInit {
  public selectedSegment: WheelSegment | null = null;

  constructor(
    private _gameService: GameService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    // Get the selected segment from the game state
    this.selectedSegment = this._gameService.selectedSegment;

    // If no segment is selected, redirect to welcome page
    if (!this.selectedSegment) {
      this._router.navigate(['/welcome']);
    }
  }

  /**
   * Handle restart game button click
   * Reset the game state and navigate to welcome page
   */
  public restartGame(): void {
    this._gameService.resetGame();
  }
}
