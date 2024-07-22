import {Component, OnInit} from '@angular/core';
import {AddFormButton} from './add-user-form/add-form-button.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserFormActionsComponent} from './user-form-actions/user-form-actions.component';
import {FormArray, FormGroup} from '@angular/forms';
import {CreateFormService} from '../../services/create-form.service';

@Component({
  selector: 'app-create-user-container',
  standalone: true,
  imports: [AddFormButton, UserFormComponent, UserFormActionsComponent],
  templateUrl: './create-user-container.component.html',
  styleUrl: './create-user-container.component.scss'
})
export class CreateUserContainerComponent implements OnInit{
  public createUserFormArray = new FormArray<FormGroup>([]);

  constructor(private createFormService: CreateFormService) {
  }

  public ngOnInit(): void {
    this.addNewForm();
  }
  public addNewForm(): void {
    this.createUserFormArray.push(this.createFormService.createUserForm());
  }
  public removeForm(formIndex: number): void {
    this.createUserFormArray.removeAt(formIndex);
  }
}
