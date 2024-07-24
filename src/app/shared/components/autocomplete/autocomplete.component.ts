import {Component, forwardRef, Input, OnDestroy} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Country} from '../../enum/country';
import {IsValidDirective} from '../../directives/is-valid.directive';
import {Observable, Subscription} from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    IsValidDirective,
    NgbTypeahead
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements ControlValueAccessor, OnDestroy {
  @Input()
  public options: string[] = []
  @Input()
  public name!: string;
  @Input()
  public id!: string;
  @Input()
  private subscription: Subscription = new Subscription();

  onTouch: Function = () => {
  };
  autocompleteFormControl = new FormControl<string>('');

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: Country | null): void {
    this.autocompleteFormControl.setValue(value, {emitEvent: false});
  }

  registerOnChange(fn: any): void {
    this.subscription.add(this.autocompleteFormControl.valueChanges
      .subscribe(fn));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.autocompleteFormControl.disable() : this.autocompleteFormControl.enable();
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term === '' ? []
        : this.options.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1))
    );
}
