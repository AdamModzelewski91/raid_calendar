import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  private usersActivity: any[] = [];
  public dayOfActivity: string = '20.07-26.07';
  public weeklyActivity: any;
  public weeklyCalendar: any;
  public days = [ 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela', 'Poniedziałek', 'Wtorek'];
  public hours = ['Cały',12,13,14,15,16,17,18,19,20,21];
    constructor() {
    this.weeklyActivity = [
      {     
      role: [
        {id: 'role_dps', name: 'role', value: 'dps'},
        {id: 'argos_sup', name: 'role', value: 'sup'},
        {id: 'argos_gunlancer', name: 'role', value: 'gunlancer'},        
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

  ngOnInit(): void {
    this.generateCalendar();
    this.usersActivity = JSON.parse(localStorage.getItem('calendar') || '[]') ;
  }

  generateCalendar() {    
    this.weeklyCalendar = this.days.map(day => {
      return this.hours.map(hour => day+ '_' + hour);       
    })
  }

  getDayName(days: any[]) {    
    const onlyName = days.map(day => day.split('_'));  
    return onlyName.reduce((acc, arr)=> arr[0]);
  }

  sendSurvey(form: NgForm) {  
    const raidDaysArray = Object.entries(form.value);
    const filtredRaidDays = raidDaysArray.filter(data => data[1] !== '')
    this.usersActivity.push({name: form.value.nick, date: this.dayOfActivity, raids: filtredRaidDays});
    localStorage.setItem('calendar', JSON.stringify(this.usersActivity))  
  }
}
