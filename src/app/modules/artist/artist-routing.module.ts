import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { RegisterComponent } from '../shared/register/register.component';
import { ArtistHomeComponent } from './components/artist-home/artist-home.component';
import { artistAuthGuard } from 'src/app/guards/artist-auth.guard';
import { ChatComponent } from '../shared/chat/chat.component';


const routes: Routes = [
  {path:"",component:ArtistHomeComponent,canActivate:[artistAuthGuard]},
  {path:"artist-home",component:ArtistHomeComponent,canActivate:[artistAuthGuard]},
 {path:"chatViewArtist/:senderId/:receverId",component:ChatComponent,canActivate:[artistAuthGuard]},
 {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
