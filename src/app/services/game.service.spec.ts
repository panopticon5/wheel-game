import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { WheelSegment } from '../types/wheel.types';
import { take } from 'rxjs/operators';

describe('Game Service', () => {
  let service: GameService;

  const DUMMY_WHEEL_SEGMENTS: WheelSegment[] = [
    { id: 1, label: 'Prize A', color: '#FF6B6B' },
    { id: 2, label: 'Prize B', color: '#4ECDC4' },
    { id: 3, label: 'Prize C', color: '#45B7D1' },
    { id: 4, label: 'Prize D', color: '#96CEB4' },
    { id: 5, label: 'Prize E', color: '#FFEAA7' },
    { id: 6, label: 'Prize F', color: '#DDA0DD' },
    { id: 7, label: 'Prize G', color: '#98D8C8' },
    { id: 8, label: 'Prize H', color: '#F7DC6F' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getWheelSegments method', () => {
    it('should return all predefined wheel segments', () => {
      const segments = service.getWheelSegments();
      expect(segments).toEqual(DUMMY_WHEEL_SEGMENTS);
      expect(segments.length).toBe(8);
    });
  });

  describe('selectedSegment method and selectedSegment$', () => {
    it('should initially have null as the selected segment', (done) => {
      expect(service.selectedSegment).toBeNull();
      service.selectedSegment$.pipe(take(1)).subscribe(segment => {
        expect(segment).toBeNull();
        done();
      });
    });

    describe('when the selected segment is selected', () => {
      it('should update selectedSegment and emit the new value through selectedSegment$', (done) => {
        service.selectRandomSegment();

        service.selectedSegment$.pipe(take(1)).subscribe(segment => {
          // We can't predict random, so we just check it's not null and is one of the segments
          expect(service.selectedSegment).not.toBeNull();
          expect(DUMMY_WHEEL_SEGMENTS).toContain(service.selectedSegment!);
          done();
        });
      });
    })


  });

  describe('selectRandomSegment method', () => {
    it('should select a random segment and update the selectedSegment', () => {
      // Spy on Math.random to control the random outcome for testing predictability
      spyOn(Math, 'random').and.returnValue(0.4); // This will select the 4th element (index 3)
      const selected = service.selectRandomSegment()
      const expectedSegment = DUMMY_WHEEL_SEGMENTS[3]; // Index 3 for 0.4 * 8 = 3

      expect(selected).toEqual(expectedSegment);
      expect(service.selectedSegment).toEqual(expectedSegment);
    });

    it('should select another random segment with a different Math.random value', () => {
      spyOn(Math, 'random').and.returnValue(0.01); // This will select the 1st element (index 0)

      const selected = service.selectRandomSegment();
      const expectedSegment = DUMMY_WHEEL_SEGMENTS[0]; // Index 0 for 0.01 * 8 = 0.08

      expect(selected).toEqual(expectedSegment);
      expect(service.selectedSegment).toEqual(expectedSegment);
    });

    it('should emit the selected segment via selectedSegment$', (done) => {
      spyOn(Math, 'random').and.returnValue(0.7); // This will select the 6th element (index 5)
      const expectedSegment = DUMMY_WHEEL_SEGMENTS[5];
      service.selectRandomSegment();
      service.selectedSegment$.pipe(take(1)).subscribe(segment => {
        expect(segment).toEqual(expectedSegment);
        done();
      });
    });
  });

  describe('selectPredeterminedSegment method', () => {
    const PREDETERMINED_SEGMENT_ID = 3;
    const EXPECTED_PREDETERMINED_SEGMENT = DUMMY_WHEEL_SEGMENTS.find(
      (segment: WheelSegment) => segment.id === PREDETERMINED_SEGMENT_ID
    )!;

    it('should select the predetermined segment (ID 3) and update selectedSegment', () => {
      const selected = service.selectPredeterminedSegment();
      expect(selected).toEqual(EXPECTED_PREDETERMINED_SEGMENT);
      expect(service.selectedSegment).toEqual(EXPECTED_PREDETERMINED_SEGMENT);
    });

    it('should emit the predetermined segment via selectedSegment$', (done) => {
      const selected = service.selectPredeterminedSegment();
      service.selectedSegment$.pipe(take(1)).subscribe(segment => {
        expect(segment).toEqual(EXPECTED_PREDETERMINED_SEGMENT);
        done();
      });
      service.selectPredeterminedSegment();
    });
  });

  describe('resetGame', () => {
    it('should set the selected segment to null', () => {
      // First, select a segment
      service.selectRandomSegment();
      expect(service.selectedSegment).not.toBeNull();

      // Then, reset the game
      service.resetGame();
      expect(service.selectedSegment).toBeNull();
    });

    describe('when game is reset', () => {
      it('should emit null through selectedSegment$', (done) => {
        // First, ensure a segment is selected
        service.selectRandomSegment();
        service.resetGame();
        // Now, subscribe and reset
        service.selectedSegment$.pipe(take(1)).subscribe(segment => {
          expect(segment).toBeNull();
          done();
        });

      });
    })

  });
});
