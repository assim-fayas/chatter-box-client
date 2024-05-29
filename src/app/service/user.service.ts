import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../modules/model/authResponse';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Group } from '../modules/model/groupModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private  http:HttpClient=inject(HttpClient)

  private api:string=environment.api


listAllUser(){
  return this.http.get<AuthResponse>(`${this.api}/listUser`).pipe(map(res=>{
    return res
  }),
  catchError((error)=>{
    return throwError(()=>error)
  })
)
} 


      singleUser(id:string){
        return this.http.get<AuthResponse>(`${this.api}/sigleUser/${id}`).pipe(map(res=>{
          return res
        }),
        catchError((error)=>{
          return throwError(()=>error)    
        })
      )
      }

      createGroup(group: Group){
        return this.http.post<Group>(`${this.api}/createGroup`, group).pipe(map(res => {
         return res
      }), 
          catchError(error => throwError(() => error)) 
        );
      }

      fetchAllGroups(){
        return this.http.get<any>(`${this.api}/fetchAllgroups`).pipe(map(res => {
          return res
       }), 
           catchError(error => throwError(() => error)) 
         );
      }
      

}








