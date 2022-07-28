import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public userActivity: any;
  public weeklyCalendar: any = [];

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.userActivity = this.formService.getUsersActivity();
    this.generateCalendar();     
  }
 
  generateCurrentWeek(date: any) {
    return date.day+'/'+date.month+'/'+date.year
  }

  generateCalendar() {    
    this.weeklyCalendar = this.userActivity.days.map((day: any) => {
      return this.userActivity.hours.map((hour: any) => day+ '_' + hour);       
    })
  }

  getDayName(days: any[]) {    
    const onlyName = days.map(day => day.split('_'));  
    return onlyName.reduce((acc, arr)=> arr[0]);
  }

  sendSurvey(form: NgForm) {     
    const raidDaysArray = Object.entries(form.value);
    const filtredRaidDays = raidDaysArray.filter(data => data[0] !== 'nick' && data[1] !== '')
    const newVal = {name: form.value.nick, date: this.userActivity.week, raids: filtredRaidDays}
    localStorage.setItem('player', JSON.stringify(newVal))  
  }
}
