import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CreateUserForm} from '../../../model/create-user-form';
import {IsValidDirective} from '../../../shared/directives/is-valid.directive';
import {Country} from '../../../shared/enum/country';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, IsValidDirective, NgForOf, NgIf, AsyncPipe],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input()
  public userForm!: FormGroup<CreateUserForm>;
  @Input()
  public formIndex!: number;
  @Output()
  public removeForm: EventEmitter<number> = new EventEmitter<number>();


  public filteredSuggestions = this.userForm?.get('country')?.valueChanges.pipe(
    filter(v => !!v),
    map(v => Object.values(Country).filter(c => c.includes(v ?? '')))
  );

  public listGroupItemPicked(country: string) {
    this.userForm.get('country')?.setValue(country);
  }
}
