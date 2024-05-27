import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loadingSpinner/loading-spinner';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';
import { UserListingComponent } from './user-listing/user-listing.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
    ChatComponent,
    UserListingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
   
  ],
  exports:[
    LoginComponent, RegisterComponent,LoadingSpinnerComponent,NavbarComponent,ChatComponent,UserListingComponent
  ]
})
export class SharedModule { }
