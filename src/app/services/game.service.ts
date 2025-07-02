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
  private readonly _wheelSegments: WheelSegment[] = [
    { id: 1, label: 'Prize A', color: '#FF6B6B' },
    { id: 2, label: 'Prize B', color: '#4ECDC4' },
    { id: 3, label: 'Prize C', color: '#45B7D1' },
    { id: 4, label: 'Prize D', color: '#96CEB4' },
    { id: 5, label: 'Prize E', color: '#FFEAA7' },
    { id: 6, label: 'Prize F', color: '#DDA0DD' },
    { id: 7, label: 'Prize G', color: '#98D8C8' },
    { id: 8, label: 'Prize H', color: '#F7DC6F' }
  ];

  private readonly _predeterminedSegmentId = 3;
  private readonly selectedSegmentSubject = new BehaviorSubject<WheelSegment | null>(null);

  public selectedSegment$ = this.selectedSegmentSubject.asObservable();

  /**
   * Get all wheel segments
   */
  public getWheelSegments(): WheelSegment[] {
    return this._wheelSegments;
  }

  /**
   * Get the currently selected segment
   */
  public getSelectedSegment(): WheelSegment | null {
    return this.selectedSegmentSubject.value;
  }

  /**
   * Select a random segment from the wheel
   */
  public selectRandomSegment(): WheelSegment {
    const randomIndex = Math.floor(Math.random() * this._wheelSegments.length);
    const selectedSegment = this._wheelSegments[randomIndex];
    this.selectedSegmentSubject.next(selectedSegment);
    return selectedSegment;
  }

  /**
   * Select the predetermined segment (always segment #3)
   */
  public selectPredeterminedSegment(): WheelSegment {
    const predeterminedSegment = this._wheelSegments.find(
      segment => segment.id === this._predeterminedSegmentId
    )!;
    this.selectedSegmentSubject.next(predeterminedSegment);
    return predeterminedSegment;
  }

  // /**
  //  * Calculate the rotation angle needed to land on a specific segment
  //  */
  // public calculateRotationAngle(targetSegment: WheelSegment, currentRotation: number): number {
  //   // Calculate target rotation
  //   // Each segment is 45 degrees apart (360/8)
  //   // Segment 1 is at 0°, segment 2 at 45°, etc.
  //   const targetAngle = (targetSegment.id - 1) * this._segmentAngle;
  //
  //   // Add multiple full rotations for visual effect (3-5 full spins)
  //   const fullRotations = 3 + Math.random() * 2; // 3-5 rotations
  //   const totalRotation = currentRotation + (fullRotations * 360) + (360 - targetAngle);
  //   return  totalRotation;
  // }

  /**
   * Reset the game state
   */
  public resetGame(): void {
    this.selectedSegmentSubject.next(null);
  }
}
