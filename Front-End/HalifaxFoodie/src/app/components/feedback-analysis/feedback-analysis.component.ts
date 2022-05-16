import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-feedback-analysis',
  templateUrl: './feedback-analysis.component.html',
  styleUrls: ['./feedback-analysis.component.css']
})
export class FeedbackAnalysisComponent implements OnInit {
  feedbackList: any = []  
  restList: any[] = [{name:"The Bicycle Thief", code: 1}, {name:"McKelvies Restaurant", code: 2}, {name:"2 Doors Down Food", code: 3}]
  FeedbackForm!: FormGroup;

  constructor(private util: UtilityService,private httpservice: HttpService, private formBuilder: FormBuilder, public dataservice: DataService, private router: Router) { }

  ngOnInit(): void {
    this.util.isLoader = false

    var value = ""
    if(this.dataservice.userData.role == 'R'){
      value = this.dataservice.userData.restCode
    } 
    this.FeedbackForm = this.formBuilder.group({
      rest: [value, [Validators.required]],
    });

    if(this.dataservice.userData.role == 'R'){
      this.Search()
    } 

  }

  Search(){
    this.util.isLoader = true

    this.httpservice.getServiceCall("/feedback/feedbackAnalysis/" + this.FeedbackForm.value.rest)
      .subscribe((result: any)=>{
        this.util.isLoader = false
        console.log(result)
        if(result.success){
          this.feedbackList = result.data
        }
      },(error)=>{
        this.util.isLoader = false

        console.log(error)
      })
  }
}
