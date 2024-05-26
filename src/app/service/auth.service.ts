import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import{HttpClient} from '@angular/common/http'
import { catchError, map, throwError } from 'rxjs';
import { AuthResponse } from '../modules/model/authResponse';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
private api:string=environment.api

registration(firstName:string,lastName:string,email:string,password:string,isArtist:boolean){
  return this.http.post<AuthResponse>(`${this.api}/register`,{firstName,lastName,email,password,isArtist:isArtist}).pipe(map(response=>{
    return response
  }),
 catchError((error)=>{
  return throwError(()=>error)
 })
)}


login(email:string,password:string){
  return this.http.post(`${this.api}/login`,{email,password}).pipe(map(response=>{
    return response
  }),
catchError((error)=>{
  return throwError(()=>error)
}))

}




}
