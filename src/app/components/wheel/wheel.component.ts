import {Component, Input} from '@angular/core';
import {WheelSegment} from '../../types/wheel.types';
import { WheelConfig } from '../../constants/wheel.constants';

@Component({
  selector: 'wheel',
  standalone: true,
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.scss'
})
export class WheelComponent  {
  @Input()
  public segments: WheelSegment[] = [];

  @Input()
  public currentRotation: number = WheelConfig.DEFAULT_ROTATION;

  @Input()
  public isSpinning: boolean = false;

  public segmentAngle: number = WheelConfig.SEGMENT_ANGLE;
}
