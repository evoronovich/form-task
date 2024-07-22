import {Component, forwardRef, signal} from '@angular/core';
import {ControlValueAccessor, FormArray, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CreateUserForm} from '../../../model/create-user-form';

@Component({
  selector: 'app-user-form-actions',
  standalone: true,
  templateUrl: './user-form-actions.component.html',
  styleUrl: './user-form-actions.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserFormActionsComponent),
      multi: true
    }
  ]
})
export class UserFormActionsComponent implements ControlValueAccessor {
  public value!: number;

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
