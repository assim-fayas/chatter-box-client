import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbResponse } from 'src/app/modules/model/dbResponse';
import { urlParser } from 'src/app/modules/utility/helperFunctions/urlparser';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent {
  router:Router=inject(Router)
  activeRoute:ActivatedRoute=inject(ActivatedRoute)
  userService:UserService=inject(UserService)
  
  isArtist:boolean=false
  senderId!:string
  receverId!:string
  receverUser!:DbResponse
  ngOnInit(): void {
      //identifying the role of the user.
      const currentUrl = window.location.href;
      this.isArtist=urlParser(currentUrl)
    this.activeRoute.paramMap.subscribe((params)=>{
      this.receverId=params.get('receverId') as string
     this.senderId=params.get('senderId') as string
    })
  
    if(this.receverId){
  this.userService.singleUser(this.receverId).subscribe({
    next:(response)=>{
      this.receverUser=response
    },
    error:(error)=>{
      console.log(error);
      
    }
  })
    }
  }
  
  
  navigateToChatListing(){
    if( this.isArtist){
      this.router.navigate(['/artist/user-home'])
    }else{
      this.router.navigate(['user-home'])
    }
  
  }
  
}
