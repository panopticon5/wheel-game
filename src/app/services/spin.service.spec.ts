import { TestBed } from '@angular/core/testing';
import { SpinService } from './spin.service';
import { WheelSegment } from '../types/wheel.types';

describe('Spin Service', () => {
  let service: SpinService;

  const MOCK_SEGMENT: WheelSegment = {
    id: 3,
    label: 'Price C',
    color: '#45B7D1'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinService]
    });

    service = TestBed.inject(SpinService);

    // Mock Math.random to return a consistent value for testing
    spyOn(Math, 'random').and.returnValue(0.5);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateTargetAngle method', () => {
    it('should calculate the correct target angle for a segment', () => {
      // 45° segments (8 segments in a circle)
      expect(service.calculateTargetAngle(1, 45)).toBe(0);    // First segment
      expect(service.calculateTargetAngle(3, 45)).toBe(90);   // Third segment
      expect(service.calculateTargetAngle(8, 45)).toBe(315);  // Last segment
    });
  });

  describe('calculateFullRotations method', () => {
    it('should return a number between min and max rotations', () => {
      const rotations = service.calculateFullRotations(3, 5);
      expect(rotations).toBeGreaterThanOrEqual(3);
      expect(rotations).toBeLessThanOrEqual(5);
    });

    it('should use default values when none provided', () => {
      const rotations = service.calculateFullRotations();
      // With Math.random() mocked to return 0.5, result should be 4 (3 + 0.5 * (5-3))
      expect(rotations).toBe(4);
    });

    it('should handle custom ranges', () => {
      const rotations = service.calculateFullRotations(5, 10);
      // 5 + 0.5 * (10-5) = 7.5
      expect(rotations).toBe(7.5);
    });
  });

  describe('calculateTotalRotation method', () => {
    it('should calculate the correct total rotation', () => {
      // 2 full rotations (720°) plus adjustment for target angle 45°
      const rotation = service.calculateTotalRotation(0, 2, 45);
      // 720 + (360 - 45) = 1035
      expect(rotation).toBe(1035);
    });

    it('should account for current rotation', () => {
      // 90° current + 1 full rotation (360°) plus adjustment for target angle 45°
      const rotation = service.calculateTotalRotation(90, 1, 45);
      // 90 + 360 + (360 - 45) = 765
      expect(rotation).toBe(765);
    });
  });

  describe('calculateSpin method', () => {
    it('should return all spin parameters', () => {
      const result = service.calculateSpin(MOCK_SEGMENT, 45, 0);

      expect(result).toEqual({
        targetAngle: 90,       // (3-1) * 45 = 90
        fullRotations: 4,      // 3 + 0.5 * (5-3) = 4 (mocked random)
        totalRotation: 4 * 360 + (360 - 90) // 1440 + 270 = 1710
      });
    });

    it('should handle different current rotations', () => {
      const result = service.calculateSpin(MOCK_SEGMENT, 45, 180);

      expect(result).toEqual({
        targetAngle: 90,       // (3-1) * 45 = 90
        fullRotations: 4,      // 3 + 0.5 * (5-3) = 4 (mocked random)
        totalRotation: 180 + (4 * 360) + (360 - 90) // 180 + 1440 + 270 = 1890
      });
    });

    describe('edge cases', () => {
      it('should handle first segment (ID: 1)', () => {
        const firstSegment = { ...MOCK_SEGMENT, id: 1 };
        const result = service.calculateSpin(firstSegment, 45, 0);
        expect(result.targetAngle).toBe(0);
      });

      it('should handle zero current rotation', () => {
        const result = service.calculateSpin(MOCK_SEGMENT, 45, 0);
        expect(result.totalRotation).toBe(4 * 360 + 270); // 4 full rotations + (360-90)
      });
    });
  });
});
