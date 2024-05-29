import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { RegisterComponent } from '../shared/register/register.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { authGuardGuard } from 'src/app/guards/auth-guard.guard';
import { ChatComponent } from '../shared/chat/chat.component';
import { GroupListingComponent } from '../shared/group-listing/group-listing.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';

const routes: Routes = [
  {path:"",component:UserHomeComponent,canActivate:[authGuardGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"user-home",component:UserHomeComponent,canActivate:[authGuardGuard]},
  {path:"chatViewUser/:senderId/:receverId",component:ChatComponent,canActivate:[authGuardGuard]},
  {path:'groupChatListingUser',component:GroupListingComponent},
  {path:'groupChatviewUser/:senderId/:groupId/:groupName/:currentUserName',component:GroupChatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
