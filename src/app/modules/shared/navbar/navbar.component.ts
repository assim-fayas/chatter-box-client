import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {  Subscription } from 'rxjs';
import { ArtistAuthService } from 'src/app/service/artist-auth.service';
import { urlParser } from '../../utility/helperFunctions/urlparser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authService:AuthService=inject(AuthService)
  artistAuthService:ArtistAuthService=inject(ArtistAuthService)
  isArtist:boolean=false


  ngOnInit(): void {
   //identifying the role of the user.
   const currentUrl = window.location.href;
   this.isArtist=urlParser(currentUrl)
  }




onLogout(){
if(this.isArtist){
this.artistAuthService.logout()
}else{
  this.authService.logout()
}


}


  
}
