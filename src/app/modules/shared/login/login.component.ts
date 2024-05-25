import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../utility/formValidations/validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup

  ngOnInit(){
   this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required,CustomValidators.emailPatternvalidator]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6),CustomValidators.noSpaceAllowed,CustomValidators.atLeastOneSpecialCharValidator])
    });
  
  }

  onLoginFormSubmitted(){
    // if(!this.loginForm.valid){
    //   console.log("please compleate the form");
    //   return
    // }else{
    
console.log(this.loginForm);
// 
  // }

}
}
