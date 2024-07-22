import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-form-button',
  standalone: true,
  imports: [],
  templateUrl: './add-form-button.component.html',
  styleUrl: './add-form-button.component.scss'
})
export class AddFormButton {
  @Output()
  public readonly addFormClicked: EventEmitter<void> = new EventEmitter<void>();
}
