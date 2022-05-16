import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  openChat: boolean= false
  userChats$;
  constructor(private util : UtilityService, private httpservice: HttpService, public dataservice: DataService, private router: Router, public cs: ChatService) { }

  ngOnInit(): void {
    if(this.dataservice && !this.dataservice.userData ){
      try {
        var userdata = localStorage.getItem("userData")
        if(userdata){
        this.dataservice.setLoggedinUser( JSON.parse(userdata))
        }
        else{
          this.router.navigateByUrl("/signin")
        }
      } catch (error) {
        this.router.navigateByUrl("/signin")
      }
    }
  }

  logout(){
    this.util.isLoader = true
    this.httpservice.getServiceCall("/user/logout/" + this.dataservice.userData.userId)
      .subscribe((result: any)=>{
        this.util.isLoader = false
        this.dataservice.userData = null
        localStorage.removeItem("userData")
    
        this.router.navigateByUrl("/signin")
      },(error)=>{
        this.util.isLoader = false
        console.log(error)
      })
  }
  createChat(){
    this.cs.create();
  }

  getChat(){
    const source = this.cs.get('z0zpkyl0MhRL3hrfr8gQ');
    console.log(source)
    var chat$ = this.cs.joinUsers(source);
  }

}
