import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import{HttpClient} from '@angular/common/http'
import { BehaviorSubject, Subject, catchError, map, tap, throwError } from 'rxjs';
import { AuthResponse } from '../modules/model/authResponse';
import { User } from '../modules/model/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 constructor(private http:HttpClient,private router:Router) { }
private api:string=environment.api
private tokenExpiretimer:any

user=new BehaviorSubject<User|null>(null)



// register user
registration(firstName:string,lastName:string,email:string,password:string,isArtist:boolean){
  return this.http.post<AuthResponse>(`${this.api}/register`,{firstName,lastName,email,password,isArtist:isArtist}).pipe(tap(response=>{
  this.handleCreateUser(response)
    return response
  }),
 catchError((error)=>{
  return throwError(()=>error)
 }),


)

}


//login user
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
const userJson = localStorage.getItem('user');
const userData = userJson ? JSON.parse(userJson) : null
if(!userData){
  return 
}
const loggedUser=new User(userData.email,userData._id,userData.firstName,userData.isArtist,userData._token,userData.expiresIn)

if(loggedUser.token){
this.user.next(loggedUser)
const expiresDate = new Date(userData.expiresIn);
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
  this.user.next(null)
  this.router.navigate(['/login'])
  localStorage.removeItem('user')
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
 const user= new User(response.email,response._id,response.firstName,response.isArtist,response.token,expiresIn)
 this.user.next(user);
 localStorage.setItem('user',JSON.stringify(user))

 this.autoLogout(+response.expiresIn *1000)
 console.log(+response.expiresIn *1000,"timerrrrr");
 
}




}
