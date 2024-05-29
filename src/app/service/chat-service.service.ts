import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject, catchError, map, throwError } from 'rxjs';
import { PrivateMessage } from '../modules/model/privateMessage';
import { HttpClient } from '@angular/common/http';
import{environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService implements OnInit {
  constructor(private socket:Socket,private http:HttpClient) {
    this.socket.connect()
   }

private api=environment.api
ngOnInit(): void {
  
}

sendMessage(message:PrivateMessage){
  // this.recevePrivateMessage=message.reciverId
this.socket.emit('privateChat',message)
}

getMessage(recevierId:string) {
  console.log("service called");
  console.log(recevierId,"recever id");
  
  const messagesSubject = new Subject<PrivateMessage>()

   this.socket.on(recevierId,(message:PrivateMessage)=>{
    messagesSubject.next(message)

  })
  return messagesSubject.asObservable()

}


fetchAllPrivateChats(senderId:string,receverId:string){
  return this.http.get<any>(`${this.api}/fetchAllPrivatechats/${senderId}/${receverId}`).pipe(map(res=>{
    return res
  }),
  catchError((error)=>{
    return throwError(()=>error)
  })

)
}



}
