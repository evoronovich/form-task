import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {IsValidDirective} from '../../../../shared/directives/is-valid.directive';
import {AsyncPipe, NgForOf} from '@angular/common';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {AutocompleteComponent} from '../../../../shared/components/autocomplete/autocomplete.component';
import {CreateUserForm} from '../../../../shared/model/create-user-form.model';
import {Country, countries} from '../../../../shared/enum/country';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [ReactiveFormsModule, IsValidDirective, AsyncPipe, NgbTypeahead, AutocompleteComponent],
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input()
  public userForm!: FormGroup<CreateUserForm>;
  @Input()
  public formIndex!: number;
  @Output()
  public removeForm: EventEmitter<number> = new EventEmitter<number>();
  protected readonly countries: Country[] = countries;
}
