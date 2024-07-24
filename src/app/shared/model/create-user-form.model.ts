import {FormControl} from '@angular/forms';

export interface CreateUserForm {
  country: FormControl<string | null>;
  username: FormControl<string | null>;
  birthday: FormControl<Date | null | string>;
}
