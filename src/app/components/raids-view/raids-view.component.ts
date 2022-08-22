import { Component, OnInit} from '@angular/core';
import { FormService } from 'src/app/service/form.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-raids-view',
  templateUrl: './raids-view.component.html',
  styleUrls: ['./raids-view.component.scss']
})

export class RaidsViewComponent implements OnInit {
  raidActivity!: any;
  activePlayers!: any;
  searchDays :any = [];
  searchHours :any = [];
  startFilter: any = [];
  filtred: any[] = [];
  globFiltring: any[] = [];

  listOfRaids: any = [];
  players: any = [];

  dummy = 0;
  
  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.formService.getUsersActivity().subscribe(raidData => { 
      this.generateRaidsView(raidData);
    });

    this.formService.getPlayers().subscribe(player => {
      this.populatePlayers(player);
    });
  }

  populatePlayers(players: [any]) {
    this.activePlayers = players;

    players.map(player => {
      this.listOfRaids.map((raid: any) => {
        player.selectedRaid.filter((playerRaid: any) => {
          if (playerRaid.raidName === raid.raidName && playerRaid.raidDiff === raid.raidDiff){
            let days = player.raidDays.filter((day: any) => day.hours.length > 0);

            raid.lobby[0].players.push({
              player: player.player,
              role: player.role,
              raidDays: days,
            });
          }
        });
      });
    });
  }
  
  generateRaidsView(raidData: any){         
    this.raidActivity = raidData;

    let listOfPlayers = raidData.raids.map((raid: any) => {
      return raid.difficults.map((diff: any) => {
        return {
          raidName: raid.name,
          raidDiff: diff,
          lobby: [
            {
              placeName: 'Lobby', placeNumber: 0, players:[],
            },
            {
              placeName: 'Raid', placeNumber: 1, raidTime: '', players: [],
            },
          ],
        };
      });
    });
    this.listOfRaids = listOfPlayers.reduce((acu: any, next: any) => [...acu, ...next]);
    
    this.searchDays = this.generateRaidArrays(this.listOfRaids);
    this.searchHours = this.generateRaidArrays(this.listOfRaids);
    this.filtred = this.generateRaidArrays(this.listOfRaids);
    this.startFilter = this.generateFlagFilter(this.listOfRaids);
  }

  generateRaidArrays(listOfRaids: any){
    const raidCount = listOfRaids.length;
    const genArray = [];
    for (let i = 0; i < raidCount; i++) {
      genArray.push([]);
    }
    return genArray;
  }

  generateFlagFilter(listOfRaids: any){
    const raidCount = listOfRaids.length;
    const genArray = [];
    for (let i = 0; i < raidCount; i++) {
      genArray.push(false);
    }
    return genArray;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.filterPlayersByHours( event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.filterPlayersByHours( event.currentIndex);
    }
  }

  addNewRaid(globIndex: number) {    
    const returnRaid = this.listOfRaids[globIndex].lobby.reduce((acc: any, next: any) =>{
      return next.placeNumber - acc.placeNumber > 1 ? acc : next; 
    })
    const actualRaidNum = returnRaid.placeNumber + 1;
    this.listOfRaids[globIndex].lobby.push({      
      placeName: 'Raid', placeNumber: actualRaidNum, players: [], 
    })
    this.listOfRaids[globIndex].lobby.sort(this.sortRaids);
  }

  sortRaids(a: any, b: any){    
    return a.placeNumber - b.placeNumber;
  }

  removeRaid(globIndex: number, raidIndex: number) {
    this.listOfRaids[globIndex].lobby.splice(raidIndex, 1);
  }

  searchInDays(day: any, globalIndex: number): void{    
    const index = this.searchDays[globalIndex].findIndex((item: string) => item === day);
    if(index === -1) {
      this.searchDays[globalIndex].push(day);
    } else {
      this.searchDays[globalIndex].splice(index, 1);
    }   
    this.filterPlayersByDays(globalIndex);
  }

  searchInHours(hour: any, globalIndex: number): void{
    const index = this.searchHours[globalIndex].findIndex((item: string) => item === hour);
    if(index === -1) {
      this.searchHours[globalIndex].push(hour);
    } else {
      this.searchHours[globalIndex].splice(index, 1);
    }    
     this.filterPlayersByHours(globalIndex);
  }

  filterPlayersByDays( globalIndex: number): void {
    let players;
    if (this.startFilter[globalIndex] && this.searchHours[globalIndex].length === 0 && this.searchDays[globalIndex].length === 0) {
      players = this.filtred[globalIndex];
    } else {
      players = this.listOfRaids[globalIndex].lobby[0].players;
    }

    this.filtred[globalIndex] = players.filter((player: any) => {
      return this.searchDays[globalIndex].find((day: string) => {      
        return player.raidDays.find((p:any) => p.day === day);     
      })
    }) 

    if (this.searchDays[globalIndex].length === 0) {
      this.filtred[globalIndex] = this.listOfRaids[globalIndex].lobby[0].players;
    }
    
    this.setFilterFlag(globalIndex);
  }

  filterPlayersByHours(globalIndex: number): void {
    let players;
    if (this.startFilter[globalIndex] && this.searchHours[globalIndex].length === 0 && this.searchDays[globalIndex].length === 0) {
      this.filterPlayersByDays(globalIndex);
      players = this.filtred[globalIndex];
    } else {
      players = this.listOfRaids[globalIndex].lobby[0].players;
    }
    
    if (this.searchHours[globalIndex].length > 0 ) {    
      this.filtred[globalIndex] = players.filter((player: any) => {
        return this.searchHours[globalIndex].find((hour: any) => { 
          return this.searchDays[globalIndex].find((day: string) => {
            return player.raidDays.find((p: any) => {           
              if (p.day === day ) {
                return p.hours.find((i: any) => {
                  if (i === hour) {
                    return i;
                  }
                  return null;
                }); 
              }
            });
          });
        });
      });
    } else {
      this.filterPlayersByDays(globalIndex);
    }

    this.setFilterFlag(globalIndex);
  }  

  setFilterFlag(globalIndex: number) {    
    if (this.searchHours[globalIndex].length > 0 || this.searchDays[globalIndex].length > 0) {
      this.startFilter[globalIndex] = true
    } else {
      this.startFilter[globalIndex] = false;
    }
    // for pipe to detect change
    this.dummy++;
  } 

}


