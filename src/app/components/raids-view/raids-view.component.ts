import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormService } from 'src/app/service/form.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-raids-view',
  templateUrl: './raids-view.component.html',
  styleUrls: ['./raids-view.component.scss']
})

export class RaidsViewComponent implements OnInit {
  usersActivity!: any;
  weeklyActivity!: any;
  searchDays :any = [];
  searchHours :any = [];
  startFilter: boolean = false;

  listOfPlayers: any = [];
  
  constructor(private formService: FormService) {
    this.listOfPlayers = [{
      raidName: 'Argos',
      raidDiff: 'P3',
      lobby: [
        {
        placeName: 'Lobby', placeNumber: 0, players: [
          {originalPlace: 'Lobby', player: 'Caliver', role: 'dps', raidDays: [
            {day: 'Poniedziałek', hours: [12,13,14,16]},
            {day: 'Środa', hours: [13,15,16]},
            {day: 'Piątek', hours: [18,21,22]},
          ]},
          {originalPlace: 'Lobby', player: 'EnterQu', role: 'dps', raidDays: [
            {day: 'Wtorek', hours: [14,15,19,20]},
            {day: 'Czwartek', hours: [14,15,17]},
          ]},
        ]
      },
        {
        placeName: 'Raid', placeNumber: 1, raidTime: '', players: []
      },  
    ]
      },

    ]    
    
  }

  ngOnInit(): void {
    this.usersActivity = this.formService.getUsersActivity()
    this.weeklyActivity = this.formService.getPlayers();
    
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addNewRaid(globIndex: number) {    
    const returnRaid = this.listOfPlayers[globIndex].lobby.reduce((acc: any, next: any) =>{
      if (next.placeNumber - acc.placeNumber > 1) {
        return acc 
      }  
      return next
    })
    const actualRaidNum = returnRaid.placeNumber + 1
    this.listOfPlayers[globIndex].lobby.push({      
      placeName: 'Raid', placeNumber: actualRaidNum, players: []     
    })
    this.listOfPlayers[globIndex].lobby.sort(this.sortRaids)
  }

  sortRaids(a: any, b: any){    
    return a.placeNumber - b.placeNumber
  }

  removeRaid(globIndex: number, raidIndex: number) {
    this.listOfPlayers[globIndex].lobby.splice(raidIndex, 1)
  }

  searchInDays(day: any, globalIndex: number): void{
    const index = this.searchDays.findIndex((item: string) => item === day)
    if(index === -1) {
      this.searchDays.push(day);
    } else {
      this.searchDays.splice(index, 1);
    }   
    this.filterPlayersByDays(globalIndex)
  }

  searchInHours(hour: any, globalIndex: number): void{
    const index = this.searchHours.findIndex((item: string) => item === hour)
    if(index === -1) {
      this.searchHours.push(hour);
    } else {
      this.searchHours.splice(index, 1);
    }    
  }

  filterPlayersByDays( globalIndex: number) {
    const players = this.listOfPlayers[globalIndex].lobby[0].players
    const filtred = players.filter((player: any) => {
      return this.searchDays.find((day: string) => {        
        return player.raidDays.find((p:any) => p.day === day)       
      })
    }) 
    if (filtred.length > 0 || this.searchDays.length === 0) {
      this.startFilter = false;
    } else {
      this.startFilter = true;
    }
  }
  

}


/*           {originalPlace: 'Lobby', player: 'Caliver', role: 'dps', raidDays: [
            {day: 'Monday', hours: [12,13,14,16]},
            {day: 'Wendsday', hours: [13,15,16]},
            {day: 'Friday', hours: [18,21,22]}, */