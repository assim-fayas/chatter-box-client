import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { RegisterComponent } from '../shared/register/register.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { authGuardGuard } from 'src/app/guards/auth-guard.guard';

const routes: Routes = [

  {path:"user-home",component:UserHomeComponent,canActivate:[authGuardGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
