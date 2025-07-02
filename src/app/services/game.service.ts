import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WheelSegment {
  id: number;
  label: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // Predefined wheel segments with colors
  private readonly wheelSegments: WheelSegment[] = [
    { id: 1, label: 'Prize A', color: '#FF6B6B' },
    { id: 2, label: 'Prize B', color: '#4ECDC4' },
    { id: 3, label: 'Prize C', color: '#45B7D1' },
    { id: 4, label: 'Prize D', color: '#96CEB4' },
    { id: 5, label: 'Prize E', color: '#FFEAA7' },
    { id: 6, label: 'Prize F', color: '#DDA0DD' },
    { id: 7, label: 'Prize G', color: '#98D8C8' },
    { id: 8, label: 'Prize H', color: '#F7DC6F' }
  ];

  // The predetermined segment (segment #3 as specified in requirements)
  private readonly predeterminedSegmentId = 3;

  // Current selected segment
  private selectedSegmentSubject = new BehaviorSubject<WheelSegment | null>(null);
  public selectedSegment$ = this.selectedSegmentSubject.asObservable();

  constructor() {}

  /**
   * Get all wheel segments
   */
  getWheelSegments(): WheelSegment[] {
    return this.wheelSegments;
  }

  /**
   * Get the currently selected segment
   */
  getSelectedSegment(): WheelSegment | null {
    return this.selectedSegmentSubject.value;
  }

  /**
   * Select a random segment from the wheel
   */
  selectRandomSegment(): WheelSegment {
    const randomIndex = Math.floor(Math.random() * this.wheelSegments.length);
    const selectedSegment = this.wheelSegments[randomIndex];
    this.selectedSegmentSubject.next(selectedSegment);
    return selectedSegment;
  }

  /**
   * Select the predetermined segment (always segment #3)
   */
  selectPredeterminedSegment(): WheelSegment {
    const predeterminedSegment = this.wheelSegments.find(
      segment => segment.id === this.predeterminedSegmentId
    )!;
    this.selectedSegmentSubject.next(predeterminedSegment);
    return predeterminedSegment;
  }

  /**
   * Calculate the rotation angle needed to land on a specific segment
   */
  calculateRotationAngle(targetSegment: WheelSegment): number {
    const segmentAngle = 360 / this.wheelSegments.length;
    const targetIndex = this.wheelSegments.findIndex(s => s.id === targetSegment.id);

    // Calculate base angle for the target segment (center of segment)
    const baseAngle = targetIndex * segmentAngle + (segmentAngle / 2);

    // Add multiple full rotations for visual effect (3-5 full spins)
    const fullRotations = 3 + Math.random() * 2;
    const totalRotation = (fullRotations * 360) + (360 - baseAngle);

    return totalRotation;
  }

  /**
   * Reset the game state
   */
  resetGame(): void {
    this.selectedSegmentSubject.next(null);
  }
}
