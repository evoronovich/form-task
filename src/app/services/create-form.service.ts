import {inject, Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  countryValidator,
  dateLessThanTodayValidator,
  usernameValidator
} from '../shared/validators/user-form-validators';
import {DataService} from './api/data.service';
import {CreateUserForm} from '../shared/model/create-user-form.model';

@Injectable()
export class CreateFormService {
  private usernameService: DataService = inject(DataService);

  public createUserForm(): FormGroup<CreateUserForm> {
    return new FormGroup<CreateUserForm>({
      country: new FormControl(null, {
        validators: [
          Validators.required,
          countryValidator()
        ]
      }),
      username: new FormControl(null, {
        validators: [
          Validators.required,
        ],
        asyncValidators: [
          usernameValidator(this.usernameService)
        ]
      }),
      birthday: new FormControl(null, {
        validators: [
          Validators.required,
          dateLessThanTodayValidator()
        ]
      })
    })
  }
}
