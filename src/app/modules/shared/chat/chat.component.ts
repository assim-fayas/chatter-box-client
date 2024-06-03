import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { DbResponse } from '../../model/dbResponse';
import { urlParser } from '../../utility/helperFunctions/urlparser';
import { ChatServiceService } from 'src/app/service/chat-service.service';
import { PrivateMessage } from '../../model/privateMessage';
import {CloudinaryModule} from '@cloudinary/ng';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
router:Router=inject(Router)
activeRoute:ActivatedRoute=inject(ActivatedRoute)
userService:UserService=inject(UserService)
chatService:ChatServiceService=inject(ChatServiceService)

isArtist:boolean=false
senderId!:string
receverId!:string
receverUser!:DbResponse
privateChatMessages!:any
img!: CloudinaryImage;

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
  
  //fetch all the private message from user
this.chatService.fetchAllPrivateChats(this.senderId,this.receverId).subscribe(
  {
  next:(response)=>{
this.privateChatMessages=response[0].messages
console.log("privete messages",response[0].messages);

  

  },
  error:(err)=>{
    console.log(err);
    
  }
}
)



  //fetch the private message from user
  this.chatService.getMessage(this.receverId).subscribe(
    {
    next:(res)=>{
      console.log("status of the main state", this.privateChatMessages);
      
      console.log(res,"from sockett");

const value=this.privateChatMessages
value.push(res)
      this.privateChatMessages=value
    },
    error:(err)=>{
      console.log(err);
      
    }
  }
)


const cld = new Cloudinary({
  cloud: {
    cloudName: 'demo'
  }
});

}

onSendMEssage(message:string){
const messageTOSend:PrivateMessage={
  text:message,
  senderId:this.senderId,
  reciverId:this.receverId
}

this.chatService.sendMessage(messageTOSend)
const value=this.privateChatMessages
value.push(messageTOSend)
this.privateChatMessages=value



// this.privateChatMessages=this.privateChatMessages[ ,message]

}




navigateToChatListing(){
  if( this.isArtist){
    this.router.navigate(['/artist/artist-home'])
  }else{
    this.router.navigate(['user-home'])
  }

}

}
