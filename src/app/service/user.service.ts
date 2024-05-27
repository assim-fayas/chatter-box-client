import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../modules/model/authResponse';
import { catchError, map, throwError } from 'rxjs';

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

}








