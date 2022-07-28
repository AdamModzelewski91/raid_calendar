import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
  constructor() {}  

  getUsersActivity(){
    return JSON.parse(localStorage.getItem('calendar')|| '[]')
  }

  getPlayers(){
    return JSON.parse(localStorage.getItem('player')|| '[]')
  }


}
