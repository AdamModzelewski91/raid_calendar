import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  private usersActivity: any[] = [];
  public dayOfActivity: string = '20.07-26.07';
  public weeklyActivity: any;
  public weeklyCalendar: any = [];
  public days = [ 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela', 'Poniedziałek', 'Wtorek'];
  public hours = ['Cały',12,13,14,15,16,17,18,19,20,21];
  constructor(private formService: FormService) {
    
   }

  ngOnInit(): void {
    this.generateCalendar();
    this.usersActivity = this.formService.getUsersActivity();
    this.weeklyActivity = this.formService.weeklyActivity;
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
    const filtredRaidDays = raidDaysArray.filter(data => data[0] !== 'nick' && data[1] !== '')
    this.usersActivity.push({name: form.value.nick, date: this.dayOfActivity, raids: filtredRaidDays});
    localStorage.setItem('calendar', JSON.stringify(this.usersActivity))  
  }
}
