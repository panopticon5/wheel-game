import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { GameService } from '../../services/game.service';
import { provideRouter, Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Welcome Component', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService', ['resetGame']);

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

    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [
        provideRouter([]),
        { provide: GameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onGetStarted method', () => {
    it('should call GameService.resetGame', () => {
      component.onGetStarted();
      expect(mockGameService.resetGame).toHaveBeenCalledTimes(1);
    });
  });
});
