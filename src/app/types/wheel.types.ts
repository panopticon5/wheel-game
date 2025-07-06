export interface WheelSegment {
  id: number;
  label: string;
  color: string;
}

export interface Spin {
  targetAngle: number;
  fullRotations: number;
  totalRotation: number;
}
