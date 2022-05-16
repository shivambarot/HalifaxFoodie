import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  AddRestFormGroup: FormGroup;

  constructor(private router: Router, private _formBuilder: FormBuilder, private httpservice: HttpService) { }

  ngOnInit(): void {
    this.AddRestFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      serviceOpt: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
    });

  }

  Add(){
    if(this.AddRestFormGroup.invalid){
      return
    }

    let req={
      name: this.AddRestFormGroup.value.name,
      serviceOpt: this.AddRestFormGroup.value.serviceOpt,
      location:this.AddRestFormGroup.value.location,
      address: this.AddRestFormGroup.value.address,

    }
    this.httpservice.postServiceCall("",req)
      .subscribe((result: any)=>{
        console.log(result)
        if(result.success){
          alert("Restaurant Add Successfully")
          this.AddRestFormGroup.reset()
        }
      }, (error)=>{
        console.log(error)
        alert("Something went wrong!")
      })
  }
}
