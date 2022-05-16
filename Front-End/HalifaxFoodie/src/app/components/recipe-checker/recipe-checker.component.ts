import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-recipe-checker',
  templateUrl: './recipe-checker.component.html',
  styleUrls: ['./recipe-checker.component.css']
})
export class RecipeCheckerComponent implements OnInit {
  foodList: any[] = []
  constructor(private util: UtilityService, private httpservice: HttpService, private formBuilder: FormBuilder, private dataservice: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getDish()
  }

  getDish(){
    this.util.isLoader = true

    this.httpservice.getServiceCall("/recipe/getRecipeByRestaurant/" + this.dataservice.selectedRestCode)
    .subscribe((result: any)=>{
      this.util.isLoader = false

      console.log(result)
      if(result.success){
        this.foodList = result.data
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
