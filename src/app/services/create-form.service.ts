import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateUserForm} from '../model/create-user-form.model';
import {
  dateLessThanTodayValidator,
  userFormValidators,
  usernameValidator
} from '../shared/validators/user-form-validators';
import {DataService} from './api/data.service';

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {

  constructor(private usernameService: DataService) {
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
