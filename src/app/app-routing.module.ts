import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateUserContainerComponent} from './routes/create-user-container/create-user-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/create-user', pathMatch: 'full' },
  { path: 'create-user', component: CreateUserContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
