import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {dateLessThanTodayValidator, countryValidator, usernameValidator} from './user-form-validators';
import {DataService} from '../../services/api/data.service';
import {Country} from '../enum/country';


const mockDataService = {
  checkUsername: jest.fn(),
} as unknown as DataService;

describe('Validators', () => {
  describe('countryValidator', () => {
    it('should return null if control value is empty', () => {
      const control = {value: ''} as AbstractControl;
      const validator = countryValidator();
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should return null if control value is a valid country', () => {
      const control = {value: Country.Ukraine} as AbstractControl;
      const validator = countryValidator();
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should return an error object if control value is an invalid country', () => {
      const control = {value: 'InvalidCountry'} as AbstractControl;
      const validator = countryValidator();
      const result = validator(control);
      expect(result).toEqual({countryErr: true});
    });
  });

  describe('usernameValidator', () => {
    it('should return null if control value is empty', () => {
      const control = {value: ''} as AbstractControl;
      const validator = usernameValidator(mockDataService);
      (validator(control) as Observable<ValidationErrors | null>).subscribe(result => {
        expect(result).toBeNull();
      });
    });

    it('should return an error if username is taken', () => {
      (mockDataService.checkUsername as jest.Mock).mockReturnValue(of({isAvailable: false}));
      const control = {value: 'takenUsername'} as AbstractControl;
      const validator = usernameValidator(mockDataService);
      (validator(control) as Observable<ValidationErrors | null>).subscribe(result => {
        expect(result).toEqual({usernameTaken: true});
      });
    });

    it('should return null if username is available', () => {
      (mockDataService.checkUsername as jest.Mock).mockReturnValue(of({isAvailable: true}));
      const control = {value: 'availableUsername'} as AbstractControl;
      const validator = usernameValidator(mockDataService);
      (validator(control) as Observable<ValidationErrors | null>).subscribe(result => {
        expect(result).toBeNull();
      });
    });
  });

  describe('dateLessThanTodayValidator', () => {
    it('should return null if control value is empty', () => {
      const control = {value: ''} as AbstractControl;
      const validator = dateLessThanTodayValidator();
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should return an error if date is not less than today', () => {
      const control = {value: new Date().toISOString()} as AbstractControl;
      const validator = dateLessThanTodayValidator();
      const result = validator(control);
      expect(result).toEqual({dateLessThanToday: {value: control.value}});
    });

    it('should return null if date is less than today', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1); // set to yesterday
      const control = {value: pastDate.toISOString()} as AbstractControl;
      const validator = dateLessThanTodayValidator();
      const result = validator(control);
      expect(result).toBeNull();
    });
  });
});
