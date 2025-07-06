import { Injectable } from '@angular/core';
import { Spin, WheelSegment } from '../types/wheel.types';
import { WheelConfig } from '../constants/wheel.constants';

@Injectable({
  providedIn: 'root'
})
export class SpinService {
  /**
   * Calculate the target angle for a given segment
   * @param segmentId - The ID of the target segment
   * @param segmentAngle - The angle of each segment in degrees
   * @returns The target angle in degrees
   */
  public calculateTargetAngle(segmentId: number, segmentAngle: number): number {
    return (segmentId - 1) * segmentAngle;
  }

  /**
   * Calculate the number of full rotations for the spin animation
   * @param minRotations - Minimum number of full rotations (default: 3)
   * @param maxRotations - Maximum number of full rotations (default: 5)
   * @returns A random number of full rotations between min and max
   */
  public calculateFullRotations(minRotations: number = 3, maxRotations: number = 5): number {
    return minRotations + Math.random() * (maxRotations - minRotations);
  }

  /**
   * Calculate the total rotation for the wheel
   * @param currentRotation - Current rotation of the wheel in degrees
   * @param fullRotations - Number of full rotations to perform
   * @param targetAngle - Target angle to land on in degrees
   * @returns The total rotation in degrees
   */
  public calculateTotalRotation(
    currentRotation: number,
    fullRotations: number,
    targetAngle: number
  ): number {
    return (
      currentRotation +
      (fullRotations * WheelConfig.FULL_CIRCLE_DEGREES) +
      (WheelConfig.FULL_CIRCLE_DEGREES - targetAngle)
    );
  }

  /**
   * Calculate all spin parameters in one call
   * @param segment - The target segment to land on
   * @param segmentAngle - The angle of each segment in degrees
   * @param currentRotation - Current rotation of the wheel in degrees
   * @returns An object containing all spin parameters
   */
  public calculateSpin(
    segment: WheelSegment,
    segmentAngle: number,
    currentRotation: number
  ): Spin {
    const targetAngle = this.calculateTargetAngle(segment.id, segmentAngle);
    const fullRotations = this.calculateFullRotations();
    const totalRotation = this.calculateTotalRotation(
      currentRotation,
      fullRotations,
      targetAngle
    );

    return {
      targetAngle,
      fullRotations,
      totalRotation
    };
  }
}
