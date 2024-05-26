import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path:'',loadChildren:()=>import('../app/modules/user/user.module').then(m=>m.UserModule)},
{path:'artist',loadChildren:()=>import('../app/modules/artist/artist.module').then(m=>m.ArtistModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
