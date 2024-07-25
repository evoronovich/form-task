import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './routes/users/users.component';

const routes: Routes = [
  {path: '', redirectTo: '/create-user', pathMatch: 'full'},
  {path: 'create-user', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
