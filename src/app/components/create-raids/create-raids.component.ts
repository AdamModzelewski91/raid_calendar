import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-raids',
  templateUrl: './create-raids.component.html',
  styleUrls: ['./create-raids.component.scss']
})
export class CreateRaidsComponent implements OnInit {
  public myRaids!: FormGroup;
  public daysOfWeek = [ 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela', 'Poniedziałek', 'Wtorek'];
  public hoursOfDay = ['Cały',12,13,14,15,16,17,18,19,20,21,22];

  constructor(private fb: FormBuilder) { }  

  ngOnInit(): void {
    this.myRaids = this.fb.group({
      week: this.fb.array([]),
      days: this.fb.array([]),    
      hours: this.fb.array([]),    
      roles: this.fb.array([
        this.fb.control('dps', Validators.required),
        this.fb.control('sup', Validators.required),
        this.fb.control('gunlancer', Validators.required),
      ]),
      raids: this.fb.array([
        this.fb.group({
          name: this.fb.control('Valtan'),         
          difficults: this.fb.array([
            this.fb.control('Normal', Validators.required),
            this.fb.control('Hard', Validators.required),
            this.fb.control('None', Validators.required),
          ])
        }),
        this.fb.group({
          name: this.fb.control('Vykas'),
          difficults: this.fb.array([
            this.fb.control('Normal', Validators.required),
            this.fb.control('Hard', Validators.required),
            this.fb.control('None', Validators.required),
          ])
        })
      ]),    
    })
  }  

  raids(): FormArray{
    return this.myRaids.get('raids') as FormArray
  }

  roles(): FormArray{
    return this.myRaids.get('roles') as FormArray
  }

  raidDifficults(raidIndex: number): FormArray{
    return this.raids()
      .at(raidIndex)
      .get('difficults') as FormArray
  }

  days(): FormArray{
    return this.myRaids.get('days') as FormArray
  }

  hours(): FormArray{
    return this.myRaids.get('hours') as FormArray
  }

  addRaidingDays(day: string){
    this.days().push(this.fb.control(day))
  }

  addRaidingHours(hours: string | number){
    this.hours().push(this.fb.control(hours))
  }
 
  newRaid(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', Validators.required),
      difficults: this.fb.array([
        this.fb.control('', Validators.required),
      ])
    })
  }

  newRole(): FormControl{
    return this.fb.control('', Validators.required)
  }

  addNewRaid() {
    this.raids().push(this.newRaid())
  }
  
  removeRaid(index: number) {
    this.raids().removeAt(index);  
  }

  newDificulties(): FormControl{
    return this.fb.control('', Validators.required)
  }

  changeRoleCount(sign: boolean){
    const roleCount = this.roles().length
    if(roleCount < 6 && sign) {
      this.roles().push(this.newRole())
    } else if (roleCount > 1 && !sign) {
      this.roles().removeAt(roleCount - 1)
    }
  }

  changeDifficultCount(sign: boolean, raidIndex: number) { 
    let difficultNum: number = this.raidDifficults(raidIndex).length 
    if (difficultNum < 6 && sign) {
      difficultNum++;
      this.raidDifficults(raidIndex).push(this.newDificulties());
    } else if (difficultNum > 1 && !sign) {
      difficultNum--;     
      this.raidDifficults(raidIndex).removeAt(difficultNum);
    }

  }

  saveRaidGroup() {
    console.log(this.myRaids.value)
  }
}
