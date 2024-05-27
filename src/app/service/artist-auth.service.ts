import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import{HttpClient} from '@angular/common/http'
import { BehaviorSubject,  catchError,  tap, throwError } from 'rxjs';
import { AuthResponse } from '../modules/model/authResponse';
import { User } from '../modules/model/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ArtistAuthService {
  constructor(private http:HttpClient,private router:Router) { }
  private api:string=environment.artistApi
  private tokenExpiretimer:any

  artist=new BehaviorSubject<User|null>(null)


// register artist
artistRegistration(firstName:string,lastName:string,email:string,password:string,isArtist:boolean){
  return this.http.post<AuthResponse>(`${this.api}/register`,{firstName,lastName,email,password,isArtist:isArtist}).pipe(tap(response=>{
  this.handleCreateUser(response)
    return response
  }),
 catchError((error)=>{
  return throwError(()=>error)
 }),


)

}


//login artist
login(email:string,password:string){
  return this.http.post<AuthResponse>(`${this.api}/login`,{email,password}).pipe(tap(response=>{
    this.handleCreateUser(response)
  }),
catchError((error)=>{
  return throwError(()=>error)
}),
)

}


autoLogin(){
const userJson = localStorage.getItem('artist');
const artistData = userJson ? JSON.parse(userJson) : null
if(!artistData){
  return 
}
const loggedUser=new User(artistData.email,artistData._id,artistData.firstName,artistData.isArtist,artistData._token,artistData.expiresIn)

if(loggedUser.token){
this.artist.next(loggedUser)
const expiresDate = new Date(artistData.expiresIn);
const timerValue=expiresDate.getTime() - new Date().getTime()
console.log("timer cvalueee" ,timerValue);

this.autoLogout(timerValue)
}
}

autoLogout(expireTime:number){
  
  this.tokenExpiretimer=setTimeout(()=>{
 this.logout()
    },expireTime)
 }


 logout(){
  this.artist.next(null)
  this.router.navigate(['artist/login'])
  localStorage.removeItem('artist')
  if(this.tokenExpiretimer){
    clearTimeout(this.tokenExpiretimer)
  }
  this.tokenExpiretimer=null;
}




//helper function
private handleCreateUser(response:AuthResponse){
  //time stamp
  const expiresInTs=new Date().getTime()+ +response.expiresIn*1000
  //convert to date time value
  const expiresIn=new Date(expiresInTs)
 const artist= new User(response.email,response._id,response.firstName,response.isArtist,response.token,expiresIn)
 this.artist.next(artist);
 localStorage.setItem('artist',JSON.stringify(artist))

 this.autoLogout(+response.expiresIn *1000)

 
}




}
