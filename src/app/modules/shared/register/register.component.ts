import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../utility/formValidations/validators';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { urlParser } from '../../utility/helperFunctions/urlparser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  
registrationForm!:FormGroup
isArtist:boolean=false
isLoading:boolean=false


authService:AuthService=inject(AuthService)
router:Router=inject(Router)



ngOnInit() {
  //identifying the role of the user.
  const currentUrl = window.location.href;
  this.isArtist=urlParser(currentUrl)

  this.registrationForm=new FormGroup({
    firstName:new FormControl(null,[Validators.required,Validators.minLength(4)]),
    lastName:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,CustomValidators.emailPatternvalidator]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(12),CustomValidators.noSpaceAllowed,CustomValidators.atLeastOneSpecialCharValidator]),
  })
}


onRegistrationFormSubmit(){
 if(!this.registrationForm.valid){
  console.log("please fill all the rewuired fields");
  
 }else{
  this.isLoading=true
  const formValues=this.registrationForm.value
this.authService.registration(formValues.firstName,formValues.lastName,formValues.email,formValues.password,this.isArtist).subscribe({
  next:(res)=>{
    this.registrationForm.reset()
    this.isLoading=false
console.log(res);
if(this.isArtist){
  this.router.navigate(['artist/artist-home'])
  }else{
   this.router.navigate(['user-home'])
  }
},
error:(error)=>{
  this.isLoading=false
  console.log(error);
  
}})
 }
}


}
