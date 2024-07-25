import { Component } from '@angular/core';
import {CreateUserContainerComponent} from './create-user-container/create-user-container.component';

@Component({
  selector: 'users',
  standalone: true,
  imports: [
    CreateUserContainerComponent
  ],
  template: '<create-user-container/>',
})
export class UsersComponent {

}
