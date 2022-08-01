import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-create-raids',
  templateUrl: './create-raids.component.html',
  styleUrls: ['./create-raids.component.scss']
})
export class CreateRaidsComponent implements OnInit {
  public myRaids!: FormGroup;
  public daysOfWeek = [ 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela', 'Poniedziałek', 'Wtorek'];
  public hoursOfDay = ['Cały',12,13,14,15,16,17,18,19,20,21,22];
  
  constructor(private fb: FormBuilder, private formService: FormService) { }  

  ngOnInit(): void {
    this.myRaids = this.fb.group({
      week: this.fb.group({
        start: this.fb.control(null, Validators.required),
        end: this.fb.control(null, Validators.required),
      }),
      information: this.fb.control(''),
      days: this.fb.array([]),    
      hours: this.fb.array([]),    
      roles: this.fb.array([
        this.fb.control('', Validators.required),

      ]),
      raids: this.fb.array([
        this.fb.group({
          name: this.fb.control('New Raid'),         
          difficults: this.fb.array([
            this.fb.control('Normal', Validators.required),
          ])
        })
      ]),    
    })

    this.reloadSavedRaid()    
  }  

  reloadSavedRaid(): void{
    let savedRaid = this.formService.getUsersActivity();
    if (!Array.isArray(savedRaid)) {    
      this.week().setValue(new Object(savedRaid.week));
      this.information().setValue(new Object(savedRaid.information));
      
      savedRaid.hours.forEach((hour: any) => {
        this.addRaidingHours(hour);
      })

      savedRaid.days.forEach((day: string) => {
        this.addRaidingDays(day);
      })   

      this.roles().removeAt(0);
      savedRaid.roles.forEach((role: string) => {
        this.roles().push(this.fb.control(role, Validators.required))
      })

      this.raids().removeAt(0);
      savedRaid.raids.forEach((raid: any) => {      
        this.raids().push(
          this.newRaid(raid.name, raid.difficults)
        )
      })    
    }
  }

  week(): FormGroup{
    return this.myRaids.get('week') as FormGroup;
  }

  raids(): FormArray{
    return this.myRaids.get('raids') as FormArray;
  }

  roles(): FormArray{
    return this.myRaids.get('roles') as FormArray;
  }

  information(): FormControl{
    return this.myRaids.get('information') as FormControl;
  }

  raidDifficults(raidIndex: number): FormArray{
    return this.raids()
      .at(raidIndex)
      .get('difficults') as FormArray
  }

  days(): FormArray{
    return this.myRaids.get('days') as FormArray;
  }

  hours(): FormArray{
    return this.myRaids.get('hours') as FormArray;
  }

  getSelectedValue(select: string) {
    if (select === 'day') {
      return this.days().value;   
    } else if(select === 'hours'){
      return this.hours().value; 
    }
  }

  checkMultiplication(val: string | number, select: string): number{
    const checkArray = this.getSelectedValue(select);   
    return checkArray.findIndex((item: any) => item === val)
  }

  checkSelection(val: string | number, select: string): boolean{
    const checkArray = this.getSelectedValue(select);
    const index = checkArray.findIndex((item: any) => item === val)
    if (index === -1) {
      return false;
    } 
    return true;
  }

  addRaidingDays(day: string): void{
    let dayIndex = this.checkMultiplication(day, 'day');
    if (dayIndex === -1) {      
      this.days().push(this.fb.control(day));
      this.days().setValue(this.sortByReference(this.days().value, this.daysOfWeek));
    } else {
      this.days().removeAt(dayIndex);
    }
  }

  addRaidingHours(hours: string | number): void{    
    let hourIndex = this.checkMultiplication(hours, 'hours');
    if (hourIndex === -1) {
      this.hours().push(this.fb.control(hours));
      this.hours().setValue(this.sortByReference(this.hours().value, this.hoursOfDay));
    } else {
      this.hours().removeAt(hourIndex);
    }
  }

  sortByReference(unsorted: any[], ref: any[]){
    const newArr: any[] = [];
    ref.forEach(value => {
      unsorted.forEach((hour:any) => {
        if(value === hour) {
          newArr.push(value);
        }
      })
    })
    return newArr;   
  }
 
  newRaid(name: string = '', diffs: any[]): FormGroup {
    let newDiffs: any[] = [];
    diffs.map((diff: any) => {
      newDiffs.push( this.fb.control(diff, Validators.required))
    })

    return this.fb.group({
      name: this.fb.control(name, Validators.required),
      difficults: this.fb.array(newDiffs)
    })
  } 

  newRole(): FormControl{
    return this.fb.control('', Validators.required)
  }

  addNewRaid(): void {
    this.raids().push(this.newRaid('', ['Normal']))
  }
  
  removeRaid(index: number): void {
    this.raids().removeAt(index);  
  }

  newDificulties(): FormControl{
    return this.fb.control('', Validators.required)
  }

  changeRoleCount(sign: boolean): void{
    const roleCount = this.roles().length
    if(roleCount < 6 && sign) {
      this.roles().push(this.newRole())
    } else if (roleCount > 1 && !sign) {
      this.roles().removeAt(roleCount - 1)
    }
  }

  changeDifficultCount(sign: boolean, raidIndex: number): void { 
    let difficultNum: number = this.raidDifficults(raidIndex).length;
    if (difficultNum < 6 && sign) {
      difficultNum++;
      this.raidDifficults(raidIndex).push(this.newDificulties());
    } else if (difficultNum > 1 && !sign) {
      difficultNum--;     
      this.raidDifficults(raidIndex).removeAt(difficultNum);
    }
  }

  saveRaidGroup(): void {
    localStorage.setItem('calendar', JSON.stringify(this.myRaids.value));
  }
}
