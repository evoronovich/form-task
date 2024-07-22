import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateUserForm} from '../model/create-user-form';
import {
  dateLessThanTodayValidator,
  userFormValidators,
  usernameValidator
} from '../shared/validators/user-form-validators';
import {UsernameService} from './username.service';

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {

  constructor(private usernameService: UsernameService) {
  }

  public createUserForm(): FormGroup<CreateUserForm> {
    return new FormGroup<CreateUserForm>({
      country: new FormControl(null, {
        validators: [
          Validators.required,
          userFormValidators()
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
