import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CreateUserForm} from '../../../model/create-user-form.model';
import {IsValidDirective} from '../../../shared/directives/is-valid.directive';
import {countries} from '../../../shared/enum/country';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {AutocompleteComponent} from '../../../shared/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, IsValidDirective, NgForOf, NgIf, AsyncPipe, NgbTypeahead, AutocompleteComponent],
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input()
  public userForm!: FormGroup<CreateUserForm>;
  @Input()
  public formIndex!: number;
  @Output()
  public removeForm: EventEmitter<number> = new EventEmitter<number>();
  protected readonly countries = countries;
}
