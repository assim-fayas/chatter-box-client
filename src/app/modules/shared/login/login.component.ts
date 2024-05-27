import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../utility/formValidations/validators';
import { AuthService } from '../../../service/auth.service';
import { NavigationEnd, Router,Event } from '@angular/router';
import { urlParser } from '../../utility/helperFunctions/urlparser';
import { ArtistAuthService } from 'src/app/service/artist-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



loginForm!:FormGroup
isArtist:boolean=false
isLoading:boolean=false
authService:AuthService=inject(AuthService)
artistAuthService:ArtistAuthService=inject(ArtistAuthService)
router:Router=inject(Router)



  ngOnInit(){
  //identifying the role of the user.
 const currentUrl = window.location.href;
 this.isArtist=urlParser(currentUrl)

 // login form initialization
   this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required,CustomValidators.emailPatternvalidator]),
      password: new FormControl(null,[Validators.required])
    });
  
  }


  //login form submission
  onLoginFormSubmitted(){
    if(!this.loginForm.valid){
      console.log("please compleate the form");
      return
    }else{
      this.isLoading=true
      const  formdata=this.loginForm.value
      if(this.isArtist){
        this.artistAuthService.login(formdata.email,formdata.password).subscribe({
          next:(response)=>{
            this.isLoading=false
           console.log(response);
          
           this.router.navigate(['artist/artist-home'])
          
    
          },
          error:(error)=>{
            console.log(error);
            
            this.isLoading=false
          }
        })
      }else{
        this.authService.login(formdata.email,formdata.password).subscribe({
          next:(response)=>{
            this.isLoading=false
           console.log(response);
            this.router.navigate(['user-home'])
          },
          error:(error)=>{
            this.isLoading=false
          }
        })

      }
  
   
  }}

}
