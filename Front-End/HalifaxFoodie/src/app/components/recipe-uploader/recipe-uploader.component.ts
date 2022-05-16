import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-recipe-uploader',
  templateUrl: './recipe-uploader.component.html',
  styleUrls: ['./recipe-uploader.component.css']
})
export class RecipeUploaderComponent implements OnInit {
  restName: string
  restCode: string
  FeedbackForm!: FormGroup;

  constructor(private util: UtilityService, private httpservice: HttpService, private formBuilder: FormBuilder, private dataservice: DataService, private router: Router) { }

  ngOnInit(): void {
    this.util.isLoader = false
    this.restName = this.dataservice.selectedRest
    this.restCode = this.dataservice.selectedRestCode
    this.FeedbackForm = this.formBuilder.group({
      food: ['', [Validators.required]],
      recipe: ['', [Validators.required]],
    });

  }

  submit(){
    let req = {
      restCode: this.restCode,
      food: this.FeedbackForm.value.food,
      recipe: this.FeedbackForm.value.recipe
    }
    if(this.FeedbackForm.invalid){
      return
    }
    this.util.isLoader = true
    
    this.httpservice.postServiceCall("/recipe/uploadRecipe",req)
    .subscribe((result: any)=>{
      this.util.isLoader = false

      console.log(result)
      if(result.success){
        alert("Recipe Successfully Submitted. Please check the similarity score after sometime.")
        this.router.navigateByUrl('/main/restraunt')
      }
      else{
        
      }
    }, (error: any)=>{
      this.util.isLoader = false

      console.log(error)
      alert("Something went wrong!")
    })

  }
}
