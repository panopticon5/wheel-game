import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { WheelSegment } from '../../types/wheel.types';
import { of } from 'rxjs';

describe('Game Component', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const MOCK_WHEEL_SEGMENTS: WheelSegment[] = [
    { id: 1, label: 'Prize A', color: '#FF6B6B' },
    { id: 2, label: 'Prize B', color: '#4ECDC4' },
    { id: 3, label: 'Prize C', color: '#45B7D1' },
    { id: 4, label: 'Prize D', color: '#96CEB4' },
    { id: 5, label: 'Prize E', color: '#FFEAA7' },
    { id: 6, label: 'Prize F', color: '#DDA0DD' },
    { id: 7, label: 'Prize G', color: '#98D8C8' },
    { id: 8, label: 'Prize H', color: '#F7DC6F' }
  ];

  beforeEach(async () => {
    // Create spy objects for dependencies
    mockGameService = jasmine.createSpyObj('GameService', [
      'getWheelSegments',
      'selectRandomSegment',
      'selectPredeterminedSegment'
    ], {
      selectedSegment$: of(null)
    });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Configure the testing module
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;

    // Set up mock service responses
    mockGameService.getWheelSegments.and.returnValue(MOCK_WHEEL_SEGMENTS);
    mockGameService.selectRandomSegment.and.returnValue(MOCK_WHEEL_SEGMENTS[0]); // Default random segment for predictability
    mockGameService.selectPredeterminedSegment.and.returnValue(MOCK_WHEEL_SEGMENTS[2]); // Segment with ID 3
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize segments on ngOnInit', () => {
    fixture.detectChanges(); // Calls ngOnInit
    expect(mockGameService.getWheelSegments).toHaveBeenCalled();
    expect(component.segments).toEqual(MOCK_WHEEL_SEGMENTS);
  });

  describe('spinRandom method', () => {
    it('should call selectRandomSegment on GameService and perform spin', fakeAsync(() => {
      fixture.detectChanges(); // Call ngOnInit
      const mockRandomSegment = MOCK_WHEEL_SEGMENTS[4];
      mockGameService.selectRandomSegment.and.returnValue(mockRandomSegment);
      spyOn(component as any, '_performSpin').and.callThrough(); // Spy on the private method

      component.spinRandom();

      expect(mockGameService.selectRandomSegment).toHaveBeenCalled();
      expect((component as any)._performSpin).toHaveBeenCalledWith(mockRandomSegment);
      expect(component.isSpinning).toBeTrue();

      tick(3000); // Advance time by 3 seconds
      expect(component.isSpinning).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/results']);
    }));

    describe('when it is already spinning', () => {
      it('should not spin', () => {
        fixture.detectChanges();
        component.isSpinning = true;
        component.spinRandom();

        expect(component.currentRotation).toEqual(0);
      });
    });
  });

  describe('spinPredetermined method', () => {
    it('should call selectPredeterminedSegment on GameService and perform spin', fakeAsync(() => {
      fixture.detectChanges(); // Call ngOnInit
      const mockPredeterminedSegment = MOCK_WHEEL_SEGMENTS[2]; // Segment with ID 3
      mockGameService.selectPredeterminedSegment.and.returnValue(mockPredeterminedSegment);
      spyOn(component as any, '_performSpin').and.callThrough(); // Spy on the private method

      component.spinPredetermined();

      expect(mockGameService.selectPredeterminedSegment).toHaveBeenCalled();
      expect((component as any)._performSpin).toHaveBeenCalledWith(mockPredeterminedSegment);
      expect(component.isSpinning).toBeTrue();

      tick(3000); // Advance time by 3 seconds
      expect(component.isSpinning).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/results']);
    }));

    describe('when it is already spinning', () => {
      it('should not spin', () => {
        fixture.detectChanges();
        component.isSpinning = true;

        component.spinPredetermined();

        expect(component.currentRotation).toEqual(0);
      });
    })

  });
});
