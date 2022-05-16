import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL: string = "https://hfbackend-qzcrbvfi4q-ue.a.run.app/api"
  //URL: string = "http://localhost:5000/api"
  constructor(private http: HttpClient) { }

  getServiceCall(path: string){
    return this.http.get(this.URL + path);
  }

  postServiceCall(path: string, data:any ){
    return this.http.post(this.URL + path, data);
  }


}
