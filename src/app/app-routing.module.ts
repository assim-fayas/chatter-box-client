import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path:'',loadChildren:()=>import('../app/modules/user/user.module').then(m=>m.UserModule)},
{path:'admin',loadChildren:()=>import('../app/modules/admin/admin.module').then(m=>m.AdminModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
