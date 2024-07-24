import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-user-form-actions',
  standalone: true,
  templateUrl: './user-form-actions.component.html',
  styleUrl: './user-form-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserFormActionsComponent),
      multi: true
    }
  ]
})
export class UserFormActionsComponent implements ControlValueAccessor {
  @Input()
  public countdown: number | null = null;
  @Output()
  public submitButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public cancelButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  public value!: number;

  private onChange: (value: number | null) => void = () => {
  };
  private onTouched: () => void = () => {
  };

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
