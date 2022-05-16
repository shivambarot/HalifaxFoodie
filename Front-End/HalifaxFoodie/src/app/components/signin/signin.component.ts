import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  CreadentialFormGroup: FormGroup;
  SecurityFormGroup: FormGroup;
  firebaseRes: any
  token:any
  userData: any
  constructor(private util: UtilityService, private dataservice: DataService, private router: Router, private _formBuilder: FormBuilder, private httpservice: HttpService, private firebaseservice: FirebaseService) { }

  ngOnInit(): void {
    this.util.isLoader = false

    this.CreadentialFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.SecurityFormGroup = this._formBuilder.group({
      Q1: ['', Validators.required],
      Q2: ['', Validators.required],
    });

  }

  callFireBase(stepper: MatStepper){
    if(this.CreadentialFormGroup.invalid ){
      return
    }
    this.util.isLoader = true

    this.firebaseservice.signin(this.CreadentialFormGroup.value)
    .then(res => {
      this.firebaseRes = res.user.uid
      if(this.firebaseRes){
        this.httpservice.getServiceCall("/user/getUserData/"+this.firebaseRes)
        .subscribe((result: any)=>{
          this.util.isLoader = false

          console.log(result)
          if(result.success){
            this.userData = result.data
            stepper.next()
          }
        },(error)=>{
          this.util.isLoader = false

          console.log(error)
          alert('Something went wrong')
        })        
        }
        else{
          this.util.isLoader = false

          alert(res.message)
        }
      }, err => {
      console.log(err);
      this.util.isLoader = false

    })    
  }

  validateSecQ(){
    if(this.SecurityFormGroup.invalid){
      return
    }

      var Q1 = this.SecurityFormGroup.value.Q1
      var Q2 = this.SecurityFormGroup.value.Q2


    if(Q1 == this.userData.Q1 && Q2 == this.userData.Q2){
      if(this.userData.role != "A" && this.userData.role != "C" ){
        this.userData.restCode = this.userData.role
        this.userData.role = "R"
      }
  
      this.dataservice.setLoggedinUser( this.userData)
      localStorage.setItem("userData", JSON.stringify(this.userData))
      this.router.navigateByUrl("/main")
    }
    else{
      alert("Incorrect Answers. Please try again!")
    }
  }


  

}
