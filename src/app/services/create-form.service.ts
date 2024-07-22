import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface CreateUserForm {
  country: FormControl<string | null>;
  username: FormControl<string | null>;
  birthday: FormControl<Date | null>;
}
@Injectable({
  providedIn: 'root'
})
export class CreateFormService {

  constructor() { }

  public createUserForm(): FormGroup<CreateUserForm> {
    return new FormGroup<CreateUserForm>({
      country: new FormControl(null, {validators: [Validators.required]}),
      username: new FormControl(null, {validators: [Validators.required]}),
      birthday: new FormControl(null, {validators: [Validators.required]})
    })
  }
}
