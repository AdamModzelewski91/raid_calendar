import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public raidActivity: any;
  public weeklyCalendar: any = [];
  public userActivity: any;

  constructor(private formService: FormService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.raidActivity = this.formService.getUsersActivity();
    // this.generateCalendar();
    this.userActivity = this.fb.group({
      player: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required),
      selectedRaid: this.fb.array([]),
      raidDays: this.fb.array([])
    });
    this.genSelectedRaid();
    this.genSelectedDaysHours();
  }
  
  selectedRaid(): FormArray {
    return this.userActivity.get('selectedRaid') as FormArray
  }

  raidDays(): FormArray{
    return this.userActivity.get('raidDays') as FormArray;
  } 

  hours(): FormArray {
    return this.userActivity.get('hours') as FormArray;
  }

  days(): FormControl {
    return this.userActivity.get('days') as FormControl;
  }

  generateCurrentWeek(date: any) {
    return date.day+'/'+date.month+'/'+date.year
  }

  genSelectedRaid() {
    this.raidActivity.raids.forEach((raid: any) => {
      this.selectedRaid().push(this.fb.group({
        raidName: this.fb.control(raid.name),
        raidDiff: this.fb.control('', Validators.required)
      }))
    })
  }

  genSelectedDaysHours() {
    this.raidActivity.days.forEach((day: any) => {
      this.raidDays().push(this.fb.group({
        day: this.fb.control(day),
        hours: this.fb.array([])
      }))
    })
  }

  checkRaidingHours(index: number, hour: string | number) {    
    const checkHour = this.raidDays().value[index].hours.findIndex((h:any) => h === hour)
    if (checkHour === -1) {
      this.raidDays().value[index].hours.push(hour)
    } else {
      this.raidDays().value[index].hours.splice(checkHour, 1)
    }
  }

  sendSurvey() {     
    console.log(this.userActivity)

  }
}
