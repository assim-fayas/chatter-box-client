import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthResponse } from '../../model/authResponse';
import { AuthService } from 'src/app/service/auth.service';
import { urlParser } from '../../utility/helperFunctions/urlparser';
import { ArtistAuthService } from 'src/app/service/artist-auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Group } from '../../model/groupModel';
import { ChatServiceService } from 'src/app/service/chat-service.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {
constructor(private chatService:ChatServiceService){

}
  userServce:UserService=inject(UserService)
  authService:AuthService=inject(AuthService)
  artistAuthService:ArtistAuthService=inject(ArtistAuthService)
  // chatService:ChatServiceService=inject(ChatServiceService)
  router:Router=inject(Router)

users!:AuthResponse[]
currentUserId!:string
isArtist:boolean=false
chatSection:boolean=true

isModalVisible: boolean = false;
groupName: string = '';
selectedUserIds: string[] = [];

  ngOnInit(): void {
  //identifying the role of the user.
  const currentUrl = window.location.href;
  this.isArtist=urlParser(currentUrl)



if(this.isArtist){
  this.artistAuthService.artist.subscribe((artist)=>{
    this.currentUserId=artist?.id as string
    this.isArtist=artist?.isArtist as boolean
      })
}else{
  this.authService.user.subscribe((user)=>{
    this.currentUserId=user?.id as string
    this.isArtist=user?.isArtist as boolean
      })
}


  this.userServce.listAllUser().subscribe({
    next: (respons) => {
      if (Array.isArray(respons)) {
        this.users = respons.filter((user: AuthResponse) => user._id !== this.currentUserId);
        console.log(this.users, "userrr");
      } 
    },
    error: (error) => {
      console.log(error);
    }
  });




}



onChatClicked(chatReceiverId:string){

  if(this.isArtist){
    this.router.navigate(['artist/chatViewArtist',this.currentUserId,chatReceiverId])
  }else{
    this.router.navigate(['/chatViewUser',this.currentUserId,chatReceiverId])
  }


}

navigateToGRoupListing(){
  this.chatSection=false
  if(this.isArtist){
    
    this.router.navigate(['artist/groupChatListingArtist'])
  }else{
    this.router.navigate(['/groupChatListingUser'])
  }
}



}
