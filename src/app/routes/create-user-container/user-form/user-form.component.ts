import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CreateUserForm} from '../../../model/create-user-form';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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
}
