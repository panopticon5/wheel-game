import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { ResultsComponent } from './results.component';
import { GameService } from '../../services/game.service';
import { WheelSegment } from '../../types/wheel.types';
import { of } from 'rxjs';

describe('Results Component', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  // Define a mock selected segment for consistent testing
  const MOCK_SELECTED_SEGMENT: WheelSegment = { id: 1, label: 'Price A', color: '#FF6B6B' };

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService', ['selectedSegment', 'resetGame']);

    // Create the spy object for Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl'], ['url']);

    // Manually define the 'events' property on the mockRouter
    Object.defineProperty(mockRouter, 'events', {
      value: of()
    });

    mockActivatedRoute = {
      snapshot: {},
      paramMap: of({}),
      queryParamMap: of({})
    };

    // Set a default return value for selectedSegment getter
    Object.defineProperty(mockGameService, 'selectedSegment', {
      get: () => MOCK_SELECTED_SEGMENT
    });

    await TestBed.configureTestingModule({
      imports: [ResultsComponent],
      providers: [
        provideRouter([]),
        { provide: GameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set selectedSegment from GameService and not navigate to welcome page', () => {
      fixture.detectChanges();

      expect(component.selectedSegment).toEqual(MOCK_SELECTED_SEGMENT);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    describe('when selectedSegment is null', () => {
      it('should redirect to /welcome', () => {
        Object.defineProperty(mockGameService, 'selectedSegment', {
          get: () => null
        });

        fixture.detectChanges();

        expect(component.selectedSegment).toBeNull();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
      });
    });
  });

  describe('restartGame method', () => {
    it('should call GameService.resetGame', () => {
      fixture.detectChanges();
      component.restartGame();
      expect(mockGameService.resetGame).toHaveBeenCalledTimes(1);
    });
  });
});
