import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { DbResponse } from '../../model/dbResponse';
import { urlParser } from '../../utility/helperFunctions/urlparser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
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
