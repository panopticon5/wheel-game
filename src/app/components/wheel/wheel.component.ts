import {Component, Input} from '@angular/core';
import {WheelSegment} from '../../types/wheel.types';

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
  public currentRotation: number = 0;

  @Input()
  public isSpinning: boolean = false;

  public segmentAngle: number = 45; // 360 / 8
}
