import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserChatComponent } from './components/user-chat/user-chat.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';




@NgModule({
  declarations: [
  UserHomeComponent,
  UserChatComponent,
  GroupChatComponent

  
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
