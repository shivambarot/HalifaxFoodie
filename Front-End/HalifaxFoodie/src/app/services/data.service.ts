import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedRest: string = ""
  selectedRestCode: string = "" 
  userData: any
  UserRole: string

  restList: any [] = [{name: "The Bicycle Thief",code:"1"},{name: "McKelvies Restaurant",code:"2"},{name: "2 Doors Down Food",code:"3"}]
  constructor() { }

  setLoggedinUser(obj: any){
    this.userData = obj
    if(this.userData.role == "R" ){
      this.selectedRestCode = this.userData.restCode 
      this.selectedRest = this.restList.filter(o=>{return o.code == this.userData.restCode})[0].name
    }

  }
}
