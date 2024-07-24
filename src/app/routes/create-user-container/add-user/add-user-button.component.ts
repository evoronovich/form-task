import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'add-user-button',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-user-button.component.html',
  styleUrl: './add-user-button.component.scss'
})
export class AddUserButton {
  @Input()
  formsCount!: number;
  @Output()
  public readonly addFormClicked: EventEmitter<void> = new EventEmitter<void>();
}
