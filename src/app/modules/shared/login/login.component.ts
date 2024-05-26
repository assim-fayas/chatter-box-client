import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../utility/formValidations/validators';
import { AuthService } from '../../../service/auth.service';
import { NavigationEnd, Router,Event } from '@angular/router';
import { urlParser } from '../../utility/helperFunctions/urlparser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



loginForm!:FormGroup
isArtist:boolean=false
authService:AuthService=inject(AuthService)
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
    const  formdata=this.loginForm.value
    this.authService.login(formdata.email,formdata.password).subscribe({
      next:(response)=>{
       console.log(response);
       if(this.isArtist){
       this.router.navigate(['artist/artist-home'])
       }else{
        this.router.navigate(['user-home'])
       }

      }
    })

  }

}

}
