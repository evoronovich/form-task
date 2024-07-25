import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserCardComponent} from './user-card.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {AutocompleteComponent} from '../../../../shared/components/autocomplete/autocomplete.component';
import {IsValidDirective} from '../../../../shared/directives/is-valid.directive';
import {countries} from '../../../../shared/enum/country';


describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let formBuilder: FormBuilder;
  let mockFormGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent, AutocompleteComponent, IsValidDirective, ReactiveFormsModule],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    mockFormGroup = formBuilder.group({
      country: [''],
      username: [''],
      birthday: [''],
    });

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    component.userForm = mockFormGroup;
    component.formIndex = 1; // Example index
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removeForm event when the close button is clicked', () => {
    jest.spyOn(component.removeForm, 'emit');
    const button = fixture.debugElement.query(By.css('.btn-close'));
    button.triggerEventHandler('click', null);
    expect(component.removeForm.emit).toHaveBeenCalledWith(component.formIndex);
  });

  it('should have correct form field names in the template', () => {
    const countryLabel = fixture.debugElement.query(By.css('label[for="country1"]'));
    const usernameLabel = fixture.debugElement.query(By.css('label[for="username1"]'));
    const birthdayLabel = fixture.debugElement.query(By.css('label[for="birthday1"]'));

    expect(countryLabel.nativeElement.textContent).toBe('Country');
    expect(usernameLabel.nativeElement.textContent).toBe('Username');
    expect(birthdayLabel.nativeElement.textContent).toBe('Birthday');
  });

  it('should bind the form controls to the template', () => {
    component.userForm.patchValue({
      country: 'Ukraine',
      username: 'john_doe',
      birthday: '2000-01-01'
    });
    fixture.detectChanges();

    const countryInput = fixture.debugElement.query(By.css('app-autocomplete')).componentInstance;
    const usernameInput = fixture.debugElement.queryAll(By.css('input[type="text"]'))[1].nativeElement;
    const birthdayInput = fixture.debugElement.query(By.css('input[type="date"]')).nativeElement;

    expect(countryInput.autocompleteFormControl.value).toBe('Ukraine');
    expect(usernameInput.value).toBe('john_doe');
    expect(birthdayInput.value).toBe('2000-01-01');
  });

  it('should display autocomplete component with correct options', () => {
    const autocompleteComponent = fixture.debugElement.query(By.css('app-autocomplete')).componentInstance;
    expect(autocompleteComponent.options).toBe(countries);
  });
});
