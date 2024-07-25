import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateUserContainerComponent} from './create-user-container.component';
import {UserCardComponent} from './user-card/user-card.component';
import {AddUserButton} from './add-user/add-user-button.component';
import {UserActionsComponent} from './user-actions/user-actions.component';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {marbles} from 'rxjs-marbles/jest';
import SpyInstance = jest.SpyInstance;
import {DataService} from '../../../services/api/data.service';
import {AutocompleteComponent} from '../../../shared/components/autocomplete/autocomplete.component';
import {IsValidDirective} from '../../../shared/directives/is-valid.directive';
import {CreateFormService} from '../../../services/create-form.service';

describe('CreateUserContainerComponent', () => {
  let component: CreateUserContainerComponent;
  let fixture: ComponentFixture<CreateUserContainerComponent>;
  let toggleFormArraySpy: SpyInstance;
  let submitFormsSpy: SpyInstance;
  let dataService: DataService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        CreateUserContainerComponent,
        UserCardComponent,
        AddUserButton,
        UserActionsComponent,
        AutocompleteComponent,
        IsValidDirective,
        ReactiveFormsModule
      ],
      providers: [
        {provide: CreateFormService, useValue: {createUserForm: () => new FormGroup({})}},
        {provide: DataService, useValue: {submitForms: () => of(null)}},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserContainerComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    toggleFormArraySpy = jest.spyOn(component.createUserFormArray, 'toggleFormArray');
    submitFormsSpy = jest.spyOn(dataService, 'submitForms');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with one form', () => {
    expect(component.createUserFormArray.length).toBe(1);
  });

  it('should add a new form when addNewForm is called', () => {
    const initialLength = component.createUserFormArray.length;
    component.addNewForm();
    expect(component.createUserFormArray.length).toBe(initialLength + 1);
  });

  it('should remove a form when removeForm is called', () => {
    component.addNewForm();
    const initialLength = component.createUserFormArray.length;
    component.removeForm(0);
    expect(component.createUserFormArray.length).toBe(initialLength - 1);
  });

  it('should start countdown timer and disable form when startTimer is called', () => {
    component.startTimer();
    expect(toggleFormArraySpy).toHaveBeenCalledWith(false);
  });

  it('should cancel timer and enable form when cancelTimer is called', () => {
    component.cancelTimer();
    expect(toggleFormArraySpy).toHaveBeenCalledWith(true);
  });

  it('should update invalidFormsCount on statusChanges of createUserFormArray', () => {
    jest.spyOn(component.createUserFormArray.statusChanges, 'pipe').mockReturnValue(of({}));
    component.ngOnInit();
    expect(component.invalidFormsCount).toBeDefined();
  });

  it('should display add-user-button component with correct formsCount', () => {
    const addButton = fixture.debugElement.query(By.css('add-user-button')).componentInstance;
    expect(addButton.formsCount).toBe(component.createUserFormArray.length);
  });

  it(
    'should start the timer and emit countdown values correctly',
    marbles((m) => {
      const expectedMarbles = 'a 999ms b 999ms c 999ms d 999ms e 999ms (f|)';
      const expectedValues = {a: 5, b: 4, c: 3, d: 2, e: 1, f: 0};

      component.startTimer();

      m.expect(component.countdown$!).toBeObservable(expectedMarbles, expectedValues);
      m.flush();
      expect(toggleFormArraySpy).toHaveBeenCalledWith(false);
      expect(submitFormsSpy).toHaveBeenCalled();
    })
  );

  it(
    'should cancel the timer when cancelClicked$ emits',
    marbles((m) => {
      const expectedMarbles = 'a 999ms b 999ms |';
      const expectedValues = {a: 5, b: 4, c: null};

      const cancelMarbles = '2s c';

      jest.spyOn(component.createUserFormArray, 'toggleFormArray');

      component.startTimer();

      m.hot(cancelMarbles).subscribe(() => component.cancelTimer());

      m.expect(component.countdown$!).toBeObservable(expectedMarbles, expectedValues);
      m.flush();
      expect(submitFormsSpy).not.toHaveBeenCalled();
    })
  );
});
