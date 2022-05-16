import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  isLoader: boolean = false
  constructor() { }
}
