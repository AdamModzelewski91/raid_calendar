import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public weeklyActivity: any[];

  constructor() {
    this.weeklyActivity = [
      {     
      role: [
        {id: 'role_dps', name: 'role', value: 'dps'},
        {id: 'role_sup', name: 'role', value: 'sup'},
        {id: 'role_gunlancer', name: 'role', value: 'gunlancer'},        
      ]
    },
      {
      name: "Argos",
      role: [
        {id: 'argos_p3', name: 'argos', value: 'P3'},
        {id: 'argos_nie', name: 'argos', value: 'nie'},              
      ]
    },
      {
      name: "Valtan",
      role: [
        {id: 'valtan_normal', name: 'valtan', value: 'normal'},
        {id: 'valtan_hard', name: 'valtan', value: 'hard'},              
        {id: 'valtan_nie', name: 'valtan', value: 'nie'},              
      ]
    },
      {
      name: "Vykas",
      role: [
        {id: 'vykas_normal', name: 'vykas', value: 'normal'},
        {id: 'vykas_hard', name: 'vykas', value: 'hard'},              
        {id: 'vykas_nie', name: 'vykas', value: 'nie'},               
      ]
    },
  ]
   }

  getUsersActivity(){
    return JSON.parse(localStorage.getItem('calendar')|| '[]')
  }
}
