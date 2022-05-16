import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-restraunt',
  templateUrl: './restraunt.component.html',
  styleUrls: ['./restraunt.component.css']
})
export class RestrauntComponent implements OnInit {

  restList: any = []
  constructor(private util: UtilityService,private httpservice: HttpService, private dataservice: DataService, private router : Router) { }

  ngOnInit(): void {
    this.util.isLoader = false

  }

  getrest(){
    this.httpservice.getServiceCall("")
    .subscribe((result: any)=>{
      console.log(result)
      if(result.success){
        this.restList = result.data
      }
    }, (error)=>{
      console.log(error)
      alert("Something went wrong!")
    })
  }

  openRest(rest : any, restCode: any){
    this.dataservice.selectedRest = rest
    this.dataservice.selectedRestCode = restCode
    this.router.navigateByUrl("/main/orders")
  }

  feedback(rest : any, restCode: any){
    this.dataservice.selectedRest = rest
    this.dataservice.selectedRestCode = restCode
    this.router.navigateByUrl("/main/feedback")

  }
}
