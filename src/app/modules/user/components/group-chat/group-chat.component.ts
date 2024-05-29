import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupMessage } from 'src/app/modules/model/groupChat';
import { GroupChatService } from 'src/app/service/group-chat.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
  router:Router=inject(Router)
  activeRoute:ActivatedRoute=inject(ActivatedRoute)
groupChat:GroupChatService=inject(GroupChatService)
senderId!:string
currentUserName!:string
groupId!:string
groupName!:string
groupMessage!:GroupMessage[]

ngOnInit(): void {
  this.activeRoute.paramMap.subscribe((params)=>{
   this.senderId=params.get('senderId') as string
   this.groupId=params.get('groupId') as string
   this.groupName=params.get('groupName')as string
   this.currentUserName=params.get('currentUserName') as string
  })


this.groupChat.fetchAllGroupMessage(this.groupId).subscribe({
  next:(res)=>{
    console.log(res.messages);
    this.groupMessage=res.messages
    
  },
  error:(error)=>{
    console.log(error);
    
  }
})



this.groupChat.getGroupMessage(this.groupId).subscribe({
  next:(res)=>{

    

const data:GroupMessage={
  text: res.message,
  sender:res.sender,
  timestamp: res.timestamp,
  _id:res.sender
}


const chats=this.groupMessage

chats.push(data)
this.groupMessage=chats


console.log(res," group msg from sockett");
  }
})




}

  onSendMEssage(messageInput:any){
    const groupMessage={
groupName:this.groupName,
groupId:this.groupId,
message:messageInput,
sender:this.senderId,
timestamp: Date.now(),

    }
    console.log("messageInput",messageInput);
    this.groupChat.sendGroupMessage(groupMessage)
  }



}
