import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameService, WheelSegment } from '../../services/game.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatCardContent,
    MatProgressSpinner,
    MatButton
  ]
})
export class GameComponent implements OnInit, OnDestroy {
  public segments: WheelSegment[] = [];
  public segmentAngle: number = 45; // 360 / 8 segments
  public currentRotation: number = 0;
  public isSpinning: boolean = false;

  private _spinTimeout?: number;

  constructor(
    private gameStateService: GameService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.segments = this.gameStateService.getWheelSegments();
  }

  public ngOnDestroy(): void {
    if (this._spinTimeout) {
      clearTimeout(this._spinTimeout);
    }
  }

  /**
   * Perform a random spin - lands on a random segment
   */
  public spinRandom(): void {
    const selectedSegment = this.gameStateService.selectRandomSegment();
    this._performSpin(selectedSegment);
  }

  /**
   * Perform a predetermined spin - always lands on segment #3
   */
  public spinPredetermined(): void {
    const selectedSegment = this.gameStateService.selectPredeterminedSegment();
    this._performSpin(selectedSegment);
  }

  /**
   * Execute the spinning animation and navigate to results
   */
  private _performSpin(targetSegment: WheelSegment): void {
    if (this.isSpinning) return;

    this.isSpinning = true;

    // Calculate target rotation
    // Each segment is 45 degrees apart (360/8)
    // Segment 1 is at 0°, segment 2 at 45°, etc.
    const targetAngle = (targetSegment.id - 1) * this.segmentAngle;

    // Add multiple full rotations for visual effect (3-5 full spins)
    const fullRotations = 3 + Math.random() * 2; // 3-5 rotations
    const totalRotation = this.currentRotation + (fullRotations * 360) + (360 - targetAngle);

    this.currentRotation = totalRotation;

    // Set the selected segment in the service
    this.gameStateService.selectedSegment$ = of(targetSegment);

    // Navigate to results after spin completes
    this._spinTimeout = window.setTimeout(() => {
      this.isSpinning = false;
      this.router.navigate(['/results']);
    }, 3000); // 3 second spin duration
  }
}
