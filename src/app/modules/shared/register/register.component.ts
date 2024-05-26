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


authService:AuthService=inject(AuthService)



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
  const formValues=this.registrationForm.value
this.authService.registration(formValues.firstName,formValues.lastName,formValues.email,formValues.password).subscribe({
  next:(res)=>{
    this.registrationForm.reset()
console.log(res);
}})
 }




}


}
