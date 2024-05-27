import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from '../../model/user';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  authService:AuthService=inject(AuthService)

  isLoggedIn:boolean=false
  private userSubject!:Subscription

  ngOnInit(): void {
  this.userSubject=  this.authService.user.subscribe((user:User|null)=>{

      console.log(user,"uuuuuuuuuuuuuuuuuu");
      
this.isLoggedIn= user ? true : false


console.log("Status",this.isLoggedIn);

    })
  }




onLogout(){
  this.authService.logout()
}


  ngOnDestroy(){
    this.userSubject.unsubscribe()
  }
}
