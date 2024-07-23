import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Country} from '../enum/country';
import {Observable, of, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {DataService} from '../../services/api/data.service';

export function userFormValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    if (!Object.values(Country).includes(control.value)) {
      return {countryErr: true}
    }
    return null;
  };
}
export function usernameValidator(dataService: DataService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return timer(300).pipe(
      switchMap(() => dataService.checkUsername(control.value)),
      map(response => (!response.isAvailable ? {'usernameTaken': true} : null)),
    );
  };
}


export function dateLessThanTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const today = new Date();
    if (!value) {
      return null;
    }
    const inputDate = new Date(value);
    if (inputDate >= today) {
      return { 'dateLessThanToday': { value: control.value } };
    }
    return null;
  };
}
