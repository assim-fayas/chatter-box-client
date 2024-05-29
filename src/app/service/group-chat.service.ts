import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { Group } from '../modules/model/groupModel';
import { Subject, catchError, map, throwError } from 'rxjs';
import { GroupChatResponse } from '../modules/model/groupChat';

@Injectable({
  providedIn: 'root'
})
export class GroupChatService {


  constructor(private socket:Socket,private http:HttpClient) {
    this.socket.connect()
   }

   private api=environment.api
ngOnInit(): void {
  
}

sendGroupMessage(groupMessage:any){

  this.socket.emit('groupChat',groupMessage)
}


getGroupMessage(groupid:string){
  const groupMessagesSubject = new Subject<any>()
  // let groupid
  // this.socket.on("groupId",(groupid:string)=>{
  //   groupid=groupid
  // })
  if(groupid){
this.socket.on(groupid,(message:any)=>{
  groupMessagesSubject.next(message)
})
  }
  return groupMessagesSubject.asObservable()

}


fetchAllGroupMessage(groupId: string) {
  return this.http.get<GroupChatResponse>(`${this.api}/fetchAllGroupChat/${groupId}`).pipe(
    map(res => res),
    catchError(error => throwError(() => error))
  );
}

}
