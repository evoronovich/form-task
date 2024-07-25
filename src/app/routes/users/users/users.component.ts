import { Component } from '@angular/core';
import {CreateUserContainerComponent} from '../create-user-container/create-user-container.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CreateUserContainerComponent
  ],
  template: '<app-create-user-container/>',
})
export class UsersComponent {

}
