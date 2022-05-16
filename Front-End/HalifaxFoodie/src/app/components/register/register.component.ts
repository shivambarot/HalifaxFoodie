import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  CreadentialFormGroup: FormGroup;
  DetailsFormGroup: FormGroup;
  firebaseRes: any

  constructor(private util: UtilityService, private router: Router, private _formBuilder: FormBuilder, private httpservice: HttpService, private firebaseservice: FirebaseService) { }

  ngOnInit(): void {
    this.util.isLoader = false

    this.CreadentialFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.DetailsFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      Q1: ['', Validators.required],
      Q2: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  callFireBase(stepper: MatStepper){
    if(this.CreadentialFormGroup.invalid || this.firebaseRes){
      return
    }
    this.util.isLoader = true

    this.firebaseservice.register(this.CreadentialFormGroup.value)
    .then(res => {
      this.util.isLoader = false

      this.firebaseRes = res.user.uid
      if(this.firebaseRes){
      stepper.next()
      }
      else{
        alert(res.message)
      }
    }, err => {
      this.util.isLoader = false

      console.log(err);
    })    
  }

  saveDetails(){
    if(this.DetailsFormGroup.invalid){
      return
    }
    let req = {
      userId: this.firebaseRes,
      firstName: this.DetailsFormGroup.value.firstName,
      lastName: this.DetailsFormGroup.value.lastName,
      email: this.CreadentialFormGroup.value.email,
      address: this.DetailsFormGroup.value.address,
      role: "C",
      Q1: this.DetailsFormGroup.value.Q1,
      Q2: this.DetailsFormGroup.value.Q2
    }
    this.util.isLoader = true

    this.httpservice.postServiceCall("/user/register",req)
    .subscribe((result: any)=>{
      this.util.isLoader = false

      console.log(result)
      if(result.success){
        alert("You have successfully registered")
        this.router.navigateByUrl("/signin")
      }
    },(error: any)=>{
      this.util.isLoader = false

      console.log(error)
      alert("Something went wrong")
    })
  }

}
