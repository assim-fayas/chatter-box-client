import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { RegisterComponent } from '../shared/register/register.component';
import { ArtistHomeComponent } from './components/artist-home/artist-home.component';


const routes: Routes = [
  {path:"artist-home",component:ArtistHomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
