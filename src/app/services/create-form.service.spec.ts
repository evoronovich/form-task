import {TestBed} from '@angular/core/testing';
import {FormControl, FormGroup} from '@angular/forms';
import {of} from 'rxjs';
import {CreateFormService} from './create-form.service';
import {DataService} from './api/data.service';

class MockDataService {
  checkUsername = jest.fn()
}

describe('CreateFormService', () => {
  let service: CreateFormService;
  let mockDataService: MockDataService;

  beforeEach(() => {
    mockDataService = new MockDataService();

    TestBed.configureTestingModule({
      providers: [
        CreateFormService,
        {provide: DataService, useValue: mockDataService}
      ]
    });

    service = TestBed.inject(CreateFormService);
  });

  it('should create a FormGroup with the correct controls and validators', () => {
    const formGroup = service.createUserForm();

    // Check form group structure
    expect(formGroup instanceof FormGroup).toBe(true);

    // Check controls
    const controls = formGroup.controls;
    expect(controls['country']).toBeInstanceOf(FormControl);
    expect(controls['username']).toBeInstanceOf(FormControl);
    expect(controls['birthday']).toBeInstanceOf(FormControl);

    // Check validators
    expect(controls['country'].validator).toBeTruthy();
    expect(controls['username'].validator).toBeTruthy();
    expect(controls['birthday'].validator).toBeTruthy();

    // Check async validators
    expect(controls['username'].asyncValidator).toBeTruthy();
  });

  it('should apply synchronous validators correctly', () => {
    const formGroup = service.createUserForm();

    // Set invalid values to test synchronous validators
    formGroup.controls['country'].setValue(null);
    formGroup.controls['username'].setValue(null);
    formGroup.controls['birthday'].setValue(null);

    expect(formGroup.controls['country'].invalid).toBe(true);
    expect(formGroup.controls['username'].invalid).toBe(true);
    expect(formGroup.controls['birthday'].invalid).toBe(true);
  });

  it('should call async usernameValidator and handle valid input', (done) => {
    // Simulate async validator success
    jest.spyOn(mockDataService, 'checkUsername').mockReturnValue(of({isAvailable: true}));

    const formGroup = service.createUserForm();
    const usernameControl = formGroup.controls['username'];

    usernameControl.setValue('validUsername');
    usernameControl.updateValueAndValidity();

    usernameControl.statusChanges.subscribe(status => {
      expect(status).toBe('VALID');
      done();
    });
  });

  it('should handle async usernameValidator errors', (done) => {
    // Simulate async validator failure
    jest.spyOn(mockDataService, 'checkUsername').mockReturnValue(of({isAvailable: false}));

    const formGroup = service.createUserForm();
    const usernameControl = formGroup.controls['username'];

    usernameControl.setValue('invalidUsername');
    usernameControl.updateValueAndValidity();

    usernameControl.statusChanges.subscribe(status => {
      expect(status).toBe('INVALID');
      done();
    });
  });
});
