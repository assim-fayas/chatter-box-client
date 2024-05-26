import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../utility/formValidations/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

registrationForm!:FormGroup

ngOnInit() {
  this.registrationForm=new FormGroup({
    firstName:new FormControl(null,[Validators.required,Validators.minLength(4)]),
    lastName:new FormControl(null,[Validators.required,Validators.minLength(4)]),
    email:new FormControl(null,[Validators.required,CustomValidators.emailPatternvalidator]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(12),CustomValidators.noSpaceAllowed,CustomValidators.atLeastOneSpecialCharValidator]),
  })
}

onRegistrationFormSubmit(){
//  if(!this.registrationForm.valid){
//   console.log("please fill all the rewuired fields");
  
//  }else{

//  }

console.log(this.registrationForm );


}


}
